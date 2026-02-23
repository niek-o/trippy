using Microsoft.AspNetCore.Mvc;
using trippy.api.ai.contracts;
using trippy.api.ai.contracts.Dtos;

namespace trippy.api.ai.webapi.endpoints;

public static class RouteSuggestionEndpoints
{
    public static void MapRouteSuggestionEndpoints(this IEndpointRouteBuilder routeBuilder)
    {
        var group = routeBuilder.MapGroup("/api/v1.0");
        
        group.MapPost("/suggest-route",
            async ([FromServices] IGeminiService service, RouteSuggestionsRequestDto requestBody) =>
            await service.AskGemini(requestBody));
    }
}