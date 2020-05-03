using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using ScheduleManagementSystem.Infrastructure;
using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;

[assembly: OwinStartup(typeof(ScheduleManagementSystem.Startup))]
namespace ScheduleManagementSystem
{
    public class Startup
    {
        public static OAuthAuthorizationServerOptions OuAuthAuthorizationServerOptions { get; set; }
        public static string PublicClientId { get; set; }

        public void Configuration(IAppBuilder builder)
        {
            builder.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
                LogoutPath = new PathString("/Account/Logout"),
                ExpireTimeSpan = TimeSpan.FromMinutes(5.0)
            });

            PublicClientId = "self";

            OuAuthAuthorizationServerOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new AppOauthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(4.0),
                AllowInsecureHttp = true
            };

            builder.UseOAuthBearerTokens(OuAuthAuthorizationServerOptions);

            HttpConfiguration configuration = new HttpConfiguration();
            WebApiConfig.Register(configuration);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            builder.UseNinjectMiddleware(() => NinjectConfig.CreateKernel.Value);
            builder.UseNinjectWebApi(configuration);
        }
    }
}