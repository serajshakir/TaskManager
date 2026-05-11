using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerBackendTest.ViewModels.result
{
    public class RAuthenticateVm
    {
        public ApiResultVm Result { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }
    }
}
