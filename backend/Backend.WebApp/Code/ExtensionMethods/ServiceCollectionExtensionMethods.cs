using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Backend.Common.DTOs;
using System;
using System.Linq;
using Backend.WebApp.Code.Base;
using Backend.BusinessLogic;
using Backend.BusinessLogic.Base;
using System.Security.Claims;
using Backend.BusinessLogic.Implementation.BuilderOption;
using Backend.BusinessLogic.Implementation.Company;

namespace Backend.WebApp.Code.ExtensionMethods
{
    public static class ServiceCollectionExtensionMethods
    {
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            services.AddScoped<ControllerDependencies>();

            return services;
        }

        public static IServiceCollection AddBackendBusinessLogic(this IServiceCollection services)
        {
            services.AddScoped<ServiceDependencies>();
            services.AddScoped<UserAccountService>();
            services.AddScoped<BuilderOptionService>();
            services.AddScoped<CompanyService>();
            return services;
        }

        public static IServiceCollection AddBackendCurrentUser(this IServiceCollection services)
        {
            services.AddScoped(s =>
            {
                var accessor = s.GetService<IHttpContextAccessor>();
                var httpContext = accessor.HttpContext;
                var claims = httpContext.User.Claims;

                var userIdClaim = claims?.FirstOrDefault(c => c.Type == "Id")?.Value;
                var isParsingSuccessful = Guid.TryParse(userIdClaim, out Guid id);
                var usernameClaim = claims?.FirstOrDefault(c => c.Type == "UserName")?.Value;
                var nameClaim = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
                var emailClaim = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                //var rolesClaim = claims?.Where(c => c.Type == ClaimTypes.Role)?.Select(c => c.Value).ToList();


                return new CurrentUserDto
                {
                    Id = id,
                    IsAuthenticated = httpContext.User.Identity.IsAuthenticated,
                    Name = nameClaim,
                    Email = emailClaim,
                };
            });

            return services;
        }
    }
}
