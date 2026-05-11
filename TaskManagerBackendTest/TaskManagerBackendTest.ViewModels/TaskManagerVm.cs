using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackendTest.Enum;

namespace TaskManagerBackendTest.ViewModels
{
    public class TaskManagerVm
    {
        public int? Id { get; set; }
        [StringLength(30, MinimumLength = 3)]
        [RegularExpression(@"[a-zA-Z ]+$", ErrorMessage = "Name only contain letters and spaces.")]
        public string Name { get; set; }
        public EStatus? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DueDate { get; set; }
        [StringLength(200, MinimumLength = 10)]
        [RegularExpression(@"[a-zA-Z ]+$", ErrorMessage = "Description only contain letters and spaces.")]
        public string? Description { get; set; }

    }
}
