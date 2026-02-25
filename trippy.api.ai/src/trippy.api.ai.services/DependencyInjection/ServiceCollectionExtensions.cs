using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using trippy.api.ai.contracts;
using trippy.api.ai.services.Configuration;

namespace trippy.api.ai.services.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddTrippyServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<IGeminiService, GeminiService>();

        services.AddOptions<GeminiConfiguration>().Bind(configuration.GetSection(nameof(GeminiConfiguration)));

        return services;
    }
}