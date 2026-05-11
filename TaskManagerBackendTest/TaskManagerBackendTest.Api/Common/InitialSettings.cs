using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagerBackendTest.ViewModels.common;

namespace TaskManagerBackendTest.Api.Common
{
    public static class InitialSettings
    {
    public static void SetJwt(WebApplicationBuilder builder)
        {
            IConfiguration configuration = builder.Configuration;

            var jwtSettings = configuration.GetSection("JwtSettings");
            builder.Services.Configure<JwtSettingsVm>(jwtSettings);

            var jwtData = jwtSettings.Get<JwtSettingsVm>();
            var key = Encoding.ASCII.GetBytes(jwtData.Key);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }
            ).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidAudience = jwtData.Audience,
                    ValidIssuer = jwtData.Issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = false,
                    ClockSkew = TimeSpan.Zero,

                };
            });
        }
}
}

