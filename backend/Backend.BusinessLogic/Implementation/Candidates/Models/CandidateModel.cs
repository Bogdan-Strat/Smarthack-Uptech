using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Candidates.Models
{
    public class CandidateModel
    {
        public Guid CandidateToken { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid JobId { get; set; }
        public bool? IsPassed { get; set; }

        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string Cv { get; set; }

    }
}
