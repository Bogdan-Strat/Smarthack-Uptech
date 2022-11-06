using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Candidates
{
    public class CandidateUserModel
    {
        public Guid CandidateToken { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}
