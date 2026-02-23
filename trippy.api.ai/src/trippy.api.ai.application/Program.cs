using Scalar.AspNetCore;
using trippy.api.ai.services.DependencyInjection;
using trippy.api.ai.webapi.endpoints;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddTrippyServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapRouteSuggestionEndpoints();

await app.RunAsync();