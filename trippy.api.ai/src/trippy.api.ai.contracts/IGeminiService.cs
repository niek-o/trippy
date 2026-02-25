using trippy.api.ai.contracts.Dtos;

namespace trippy.api.ai.contracts;

public interface IGeminiService
{
    Task<RouteSuggestionsResponseDto> AskGemini(RouteSuggestionsRequestDto request, CancellationToken cancellationToken);
}