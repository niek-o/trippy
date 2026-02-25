using trippy.api.ai.webapi.endpoints;

namespace trippy.api.ai.webapi.DependencyInjection;

public static class WebApplicationExtensions
{
    public static WebApplication RegisterTrippyWebApiAppServices(this WebApplication app)
    {
        app.MapRouteSuggestionEndpoints();
        app.UseExceptionHandler();
        
        return app;
    }    
}