using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Candidates
{
    public class CandidateInfoModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string JobId { get; set; }
        public IFormFile Cv { get; set; } 

    }
}
