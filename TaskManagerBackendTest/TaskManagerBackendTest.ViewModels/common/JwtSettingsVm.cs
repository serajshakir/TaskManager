using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerBackendTest.ViewModels.common
{
    public class JwtSettingsVm
    {
        public string Key { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public int ValidForMinutes { get; set; }
    }
}
