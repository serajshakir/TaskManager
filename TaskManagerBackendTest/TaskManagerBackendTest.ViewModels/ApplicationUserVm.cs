using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerBackendTest.ViewModels
{
    public class ApplicationUserVm
    {
        public string? Id { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30, MinimumLength = 3)]
        public string FullName { get; set; }
        public string UserName { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30, MinimumLength = 3)]
        public string Location { get; set; }
        public string Phone { get; set; }
        public string? Isverified { get; set; }
    }
}
