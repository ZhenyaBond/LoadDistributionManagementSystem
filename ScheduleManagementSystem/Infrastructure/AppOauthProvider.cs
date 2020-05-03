using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using ScheduleManagementSystem.DAL;
using ScheduleManagementSystem.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using ScheduleManagementSystem.Helpers.Encryptors;

namespace ScheduleManagementSystem.Infrastructure
{
    public class AppOauthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _clientId;

        public AppOauthProvider(string publicClientId)
        {
            _clientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var username = context.UserName;
            var password = context.Password;
            tLoginInfo user;

            using (var ctx = new dbContext())
            {
                var encryptor = new Sha256Encryptor();
                var repository = new UsersRepository(ctx, encryptor);

                user = repository.GetByUsernameAndPassword(username, password);
            }

            if (user == null)
            {
                context.SetError("invalid_credentials", "Invalid user name or password.");
                return;
            }

            var claims = new List<Claim> {new Claim(ClaimTypes.Name, username)};

            var oauthClaimIdentity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
            var cookieClaimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationType);

            var properties = CreateProperties(username);
            var ticket = new AuthenticationTicket(oauthClaimIdentity, properties);

            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookieClaimsIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);

        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _clientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string> {{"username", userName}};

            return new AuthenticationProperties(data);
        }
    }
}