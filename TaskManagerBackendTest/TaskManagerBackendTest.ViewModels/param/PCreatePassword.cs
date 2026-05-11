using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerBackendTest.ViewModels.param
{
    public class PCreatePassword
    {
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "Password Missmatch")]
        public string ConfirmPassword { get; set; }
    }
}
