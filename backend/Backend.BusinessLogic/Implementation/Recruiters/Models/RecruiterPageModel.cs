using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Recruiters.Models
{
    public class RecruiterPageModel
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public bool IsLoggedFirstTime { get; set; }
    }
}
