using System.Text.Json;
using Google.GenAI;
using Google.GenAI.Types;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using trippy.api.ai.contracts;
using trippy.api.ai.contracts.Dtos;
using trippy.api.ai.contracts.Exceptions;
using trippy.api.ai.services.Configuration;
using Type = Google.GenAI.Types.Type;

namespace trippy.api.ai.services;

public class GeminiService(IOptions<GeminiConfiguration> options, ILogger<GeminiService> logger) : IGeminiService
{
    private readonly Client _client = new(apiKey: options.Value.ApiKey);
    private readonly string _model = options.Value.Model;
    private readonly GenerateContentConfig _generateContentConfig = BuildResponseConfig();

    public async Task<RouteSuggestionsResponseDto> AskGemini(RouteSuggestionsRequestDto request,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Generating route request started");

        var prompt = $"""
                      You are planning a roadtrip with the attached information.
                      Exclude start and end points from the final response.

                      Trip data:
                      {JsonSerializer.Serialize(request, new JsonSerializerOptions { WriteIndented = false })}

                      Give only names that I can query.
                      """;

        GenerateContentResponse response;

        try
        {
            logger.LogDebug("Request to Gemini started");
            
            response = await _client.Models.GenerateContentAsync(
                model: _model,
                contents: prompt,
                config: _generateContentConfig,
                cancellationToken: cancellationToken
            );

            logger.LogDebug("Request to Gemini finished");
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Request to Gemini failed with error {Error}", ex.Message);

            throw new GeminiException();
        }

        logger.LogInformation("Generating route request finished");

        return ParseResponse(response);
    }

    private RouteSuggestionsResponseDto ParseResponse(GenerateContentResponse response)
    {
        logger.LogDebug("Parsing route suggestions from Gemini started");

        var candidates = response.Candidates;
        if (candidates is null || candidates.Count == 0)
            throw new NoCandidatesFoundException();

        var content = candidates[0].Content;
        if (content is null)
            throw new NoContentFoundException();

        var parts = content.Parts;
        if (parts is null || parts.Count == 0)
            throw new NoContentPartsFoundException();

        var text = parts[0].Text;
        if (string.IsNullOrWhiteSpace(text))
            throw new NoTextFoundException();

        var res = JsonSerializer.Deserialize<RouteSuggestionsResponseDto>(text) ?? throw new JsonException();

        logger.LogDebug("Parsing route suggestions from Gemini finished. Result: {Count} suggested stops",
            res.RouteSuggestions.Count());

        return res;
    }

    private static GenerateContentConfig BuildResponseConfig()
    {
        return new GenerateContentConfig
        {
            ResponseMimeType = "application/json",
            ResponseSchema = new Schema
            {
                Type = Type.Object,
                Properties = new Dictionary<string, Schema>
                {
                    ["RouteSuggestions"] = new()
                    {
                        Type = Type.Array,
                        Items = new Schema
                        {
                            Type = Type.Object,
                            Properties = new Dictionary<string, Schema>
                            {
                                ["SearchQuery"] = new() { Type = Type.String }
                            }
                        }
                    }
                }
            }
        };
    }
}