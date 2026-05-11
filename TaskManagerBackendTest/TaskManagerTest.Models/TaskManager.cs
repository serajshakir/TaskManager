using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackendTest.Enum;

namespace TaskManagerTest.Models
{
    public class TaskManager
    {
        public int? Id { get; set; }
        [Column(TypeName ="nvarchar(100)")]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }
        public EStatus? Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DueDate { get; set; }
        [StringLength(200)]
        public string? Description { get; set; }

    }
}
