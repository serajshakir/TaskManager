using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackendTest.Models;
using TaskManagerBackendTest.Services;
using TaskManagerBackendTest.ViewModels;
using TaskManagerBackendTest.ViewModels.common;
using TaskManagerBackendTest.ViewModels.param;
using TaskManagerBackendTest.ViewModels.result;

namespace TaskManagerBackendTest.Repository
{
    public class ApplicationUserRepository :IApplicationUser
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly JwtSettingsVm jwtSettings;
        public ApplicationUserRepository(UserManager<ApplicationUser> _userManager, ApplicationDbContext _context,
            IOptions<JwtSettingsVm> _jwtSettings)
        {
            userManager = _userManager;
            context = _context;
            jwtSettings = _jwtSettings.Value;
        }
        public async Task<RAuthenticateVm> Authenticate(PAuthenticateVm model)
        {
            RAuthenticateVm resultVm = new RAuthenticateVm();
            try
            {
                var user = await userManager.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    var check = await userManager.CheckPasswordAsync(user, model.Password);
                    if (check)
                    {
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var key = Encoding.ASCII.GetBytes(jwtSettings.Key);

                        var tokenDiscriptor = new SecurityTokenDescriptor
                        {
                            Audience = jwtSettings.Audience,
                            Issuer = jwtSettings.Issuer,
                            Expires = DateTime.Now.AddMinutes(jwtSettings.ValidForMinutes),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                            Subject = new ClaimsIdentity(new Claim[]
                            {
                                new Claim(JwtRegisteredClaimNames.Sub, "UserAuthentication"),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
                                new Claim("id", user.Id),
                                new Claim("UserName", user.UserName),
                                new Claim("fullName", user.FullName),
                                new Claim(ClaimTypes.Role, "Administrator")

                            })
                        };
                        var token = tokenHandler.CreateToken(tokenDiscriptor);
                        resultVm.UserName = user.UserName;
                        resultVm.FullName = user.FullName;
                        resultVm.Id = user.Id;
                        resultVm.Token = tokenHandler.WriteToken(token);
                        resultVm.Result = new ApiResultVm { IsSuccess = true, Message = "Success." };
                    }
                    else
                    {
                        resultVm.Result = new ApiResultVm
                        {
                            IsSuccess = false,
                            Message = "User or Password are invalid."
                        };
                    }
                }
                else
                {
                    resultVm.Result = new ApiResultVm
                    {
                        IsSuccess = false,
                        Message = "User or Password are invalid."
                    };
                }

            }
            catch (Exception ex)
            {
                resultVm.Result = new ApiResultVm { IsSuccess = false, Message = ex.Message };
            }
            return resultVm;
        }
    }
}
