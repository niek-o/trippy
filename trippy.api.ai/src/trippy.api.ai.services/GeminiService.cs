using System.Text.Json;
using Google.GenAI;
using Google.GenAI.Types;
using Microsoft.Extensions.Options;
using trippy.api.ai.contracts;
using trippy.api.ai.contracts.Dtos;
using trippy.api.ai.services.Configuration;
using Type = Google.GenAI.Types.Type;

namespace trippy.api.ai.services;

public class GeminiService(IOptions<GeminiConfiguration> options) : IGeminiService
{
    private readonly GeminiConfiguration _configuration = options.Value;

    public async Task<string> AskGemini(RouteSuggestionsRequestDto request)
    {
        var client = new Client(apiKey: _configuration.ApiKey);

        var prompt = string.Format("""
                                   You are planning a roadtrip with the attached information.
                                   Include start and end points in the final response.

                                   Trip data:
                                   {0}

                                   Give only names that I can query.
                                   """, JsonSerializer.Serialize(request));

        var response = await client.Models.GenerateContentAsync(
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: new GenerateContentConfig
            {
                ResponseMimeType = "application/json",
                ResponseSchema = new Schema
                {
                    Type = Type.Object,
                    Properties = new Dictionary<string, Schema>
                    {
                        ["stops"] = new()
                        {
                            Type = Type.Array,
                            Items = new Schema
                            {
                                Type = Type.Object,
                                Properties = new Dictionary<string, Schema>
                                {
                                    ["searchResult"] = new() { Type = Type.String }
                                }
                            }
                        }
                    }
                }
            }
        );

        return response.Candidates[0].Content.Parts[0].Text;
    }
}