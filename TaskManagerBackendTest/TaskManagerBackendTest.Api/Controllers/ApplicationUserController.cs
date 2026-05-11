using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagerBackendTest.Services;
using TaskManagerBackendTest.ViewModels.param;

namespace TaskManagerBackendTest.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private IApplicationUser repo;
        public ApplicationUserController(IApplicationUser _repo)
        {
            repo = _repo;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Authenticate(PAuthenticateVm model)
        {
            return Ok(await repo.Authenticate(model));
        }
    }
}
