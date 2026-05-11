using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerBackendTest.ViewModels.param
{
    public class PSearch
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string? SearchTerm { get; set; }
    }
}
