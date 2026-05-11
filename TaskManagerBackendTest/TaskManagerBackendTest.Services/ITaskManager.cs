using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackendTest.Enum;
using TaskManagerBackendTest.ViewModels;
using TaskManagerBackendTest.ViewModels.param;
using TaskManagerBackendTest.ViewModels.result;

namespace TaskManagerBackendTest.Services
{
    public interface ITaskManager
    {
        public Task<ApiResultVm> Add(TaskManagerVm model);
        public Task<ApiResultVm> Update (TaskManagerVm model);
        public Task<ApiResultVm> Delete (int id);
        public RTaskManagerList GetAll(PSearch model);
        public Task<List<TaskManagerVm>> GetByTaskCompleted();
    }
}
