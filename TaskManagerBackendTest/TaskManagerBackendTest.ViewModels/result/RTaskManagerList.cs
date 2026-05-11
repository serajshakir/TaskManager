using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerTest.Models;

namespace TaskManagerBackendTest.ViewModels.result
{
    public class RTaskManagerList
    {
        public ApiResultVm Result { get; set; }
        public List<TaskManagerVm> Data { get; set; }
        public RPaging Paging { get; set; }
    }
}
