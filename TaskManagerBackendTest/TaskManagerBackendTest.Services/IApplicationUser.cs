using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackendTest.ViewModels.param;
using TaskManagerBackendTest.ViewModels.result;

namespace TaskManagerBackendTest.Services
{
    public interface IApplicationUser
    {
        public Task<RAuthenticateVm> Authenticate(PAuthenticateVm model);
    }
}
