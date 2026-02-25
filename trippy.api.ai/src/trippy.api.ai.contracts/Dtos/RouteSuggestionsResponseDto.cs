namespace trippy.api.ai.contracts.Dtos;

public class RouteSuggestionsResponseDto
{
    public required IEnumerable<RouteSuggestionResponseDto> RouteSuggestions { get; set; }
}