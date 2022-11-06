using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Interviews.Models
{
    public class CandidateInterviewModel
    {
        public Guid InterviewId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? InterviewLink { get; set; }
        public bool? IsPassed { get; set; }
        public Guid CandidateToken { get; set; }
    }
}
