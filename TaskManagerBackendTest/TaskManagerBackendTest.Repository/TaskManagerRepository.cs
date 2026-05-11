using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackendTest.Enum;
using TaskManagerBackendTest.Services;
using TaskManagerBackendTest.ViewModels;
using TaskManagerBackendTest.ViewModels.param;
using TaskManagerBackendTest.ViewModels.result;
using TaskManagerTest.Models;
using X.PagedList;
using X.PagedList.Extensions;

namespace TaskManagerBackendTest.Repository
{
    public class TaskManagerRepository : ITaskManager
    {
        private readonly ApplicationDbContext context;
        public TaskManagerRepository(ApplicationDbContext _context)
        {
            context = _context;
       
        }
        public async Task<ApiResultVm> Add(TaskManagerVm model)
        {
            try
            {
                TaskManager Task = new TaskManager
                {
                    Name = model.Name,
                    Description = model.Description,
                    Status = model.Status,
                    CreatedOn = DateTime.Now,
                    CreatedBy = model.CreatedBy,
                    DueDate = model.DueDate
                };
                context.TaskManagers.Add(Task);
                var result = await context.SaveChangesAsync() > 0;
                if (result)
                {
                    ApiResultVm resultView = new ApiResultVm
                    {
                        IsSuccess = true,
                        Message = "Task added successfully."
                    };
                    return resultView;
                }
                else
                {
                    ApiResultVm resultView = new ApiResultVm
                    {
                        IsSuccess = false,
                        Message = "Failed to add task."
                    };
                    return resultView;
                }
            }
            catch (Exception ex)
            {
                ApiResultVm resultView = new ApiResultVm
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
                return resultView;
            }
        }
        public async Task<ApiResultVm> Update(TaskManagerVm model)
        {
            try
            {
                TaskManager task = new TaskManager
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                    Status = model.Status,
                    CreatedOn = DateTime.Now,
                    CreatedBy = model.CreatedBy,
                    DueDate = model.DueDate
                };
                context.TaskManagers.Update(task);
                var result = await context.SaveChangesAsync() > 0;
                if (result)
                {
                    ApiResultVm resultView = new ApiResultVm
                    {
                        IsSuccess = true,
                        Message = "Task has been updated successfully."
                    };
                    return resultView;
                }
                else
                {
                    ApiResultVm resultView = new ApiResultVm
                    {
                        IsSuccess = false,
                        Message = "Task not updated."
                    };
                    return resultView;
                }
            }
            catch (Exception ex)
            {
                ApiResultVm resultView = new ApiResultVm
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
                return resultView;
            }
        }
        public async Task<ApiResultVm> Delete(int id)
        {
            try
            {
                var task = context.TaskManagers.Find(id);
                context.TaskManagers.Remove(task);
                var result = await context.SaveChangesAsync() > 0;
                if (result)
                {
                    ApiResultVm resultView = new ApiResultVm
                    {
                        IsSuccess = true,
                        Message = "Task has been deleted successfully."
                    };
                    return resultView;
                }
                else
                {
                    ApiResultVm resultView = new ApiResultVm
                    {
                        IsSuccess = false,
                        Message = "Task not deleted."
                    };
                    return resultView;
                }
            }
            catch (Exception ex)
            {
                ApiResultVm resultView = new ApiResultVm
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
                return resultView;
            }
        }
        public RTaskManagerList GetAll(PSearch model)
        {
            IPagedList<TaskManager> TaskManager;

            if (model.SearchTerm == null || model.SearchTerm == "")
            {
                TaskManager = context.TaskManagers.ToPagedList(model.PageNo, model.PageSize);

            }
            else
            {
                TaskManager = context.TaskManagers
                    .Where(e => e.Name.Contains(model.SearchTerm))
                    .ToPagedList(model.PageNo, model.PageSize);
            }
            RTaskManagerList listVm = new RTaskManagerList();
            if (TaskManager != null)
            {
                List<TaskManagerVm> lst = new List<TaskManagerVm>();
                foreach (var task in TaskManager)
                {
                    TaskManagerVm vm = new TaskManagerVm
                    {
                        Id = task.Id,
                        Name = task.Name,
                        Description = task.Description,
                        Status = task.Status,
                        CreatedBy = task.CreatedBy,
                        DueDate = task.DueDate
                    };
                    lst.Add(vm);

                }
                RPaging paging = new RPaging
                {
                    PageCount = TaskManager.PageCount,
                    PageSize = TaskManager.PageSize,
                    PageNo = TaskManager.PageNumber,
                    TotalItemCount = TaskManager.TotalItemCount,
                    HasPreviousPage = TaskManager.HasPreviousPage,
                    HasNextPage = TaskManager.HasNextPage,
                    IsFirstPage = TaskManager.IsFirstPage,
                    IsLastPage = TaskManager.IsLastPage,
                    FirstItemOnPage = TaskManager.FirstItemOnPage,
                    LastItemOnPage = TaskManager.LastItemOnPage,
                };
                listVm.Result = new ApiResultVm
                {
                    IsSuccess = true,
                    Message = "Tasks retrieved successfully."
                };
                listVm.Data = lst;
                listVm.Paging = paging;

            }
            return listVm;
        }
        public async Task<List<TaskManagerVm>> GetByTaskCompleted()
        {
            var result = await context.TaskManagers.Where(e => e.Status == EStatus.Completed).ToListAsync();
            List<TaskManagerVm> lst = new List<TaskManagerVm>();
            foreach (var item in result)
            {
                TaskManagerVm task = new TaskManagerVm
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Status = item.Status,
                    CreatedBy = item.CreatedBy,
                    DueDate = item.DueDate
                };
                lst.Add(task);
            }
            return lst;
        }
    }
}
