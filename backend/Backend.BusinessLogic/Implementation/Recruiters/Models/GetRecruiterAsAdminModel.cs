using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Recruiters.Models
{
    public class GetRecruiterAsAdminModel
    {
        public Guid CurrentUserId { get; set; }
        public string RequestedRecruiterEmail { get; set; }
    }
}
