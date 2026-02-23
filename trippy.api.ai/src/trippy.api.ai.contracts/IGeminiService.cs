using trippy.api.ai.contracts.Dtos;

namespace trippy.api.ai.contracts;

public interface IGeminiService
{
    Task<string> AskGemini(RouteSuggestionsRequestDto request);
}