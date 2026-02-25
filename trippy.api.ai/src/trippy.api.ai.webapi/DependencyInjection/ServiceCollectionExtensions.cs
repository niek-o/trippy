using trippy.api.ai.webapi.ExceptionHandlers;

namespace trippy.api.ai.webapi.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterTrippyWebApiHandlers(this IServiceCollection services)
    {
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();

        return services;
    }
}