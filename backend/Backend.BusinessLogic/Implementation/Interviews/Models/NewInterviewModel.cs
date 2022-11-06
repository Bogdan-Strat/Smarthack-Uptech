using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Interviews
{
    public class NewInterviewModel
    {
        public string HRIntiator { get; set; }
        public string Recruiter { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string CandidateEmail { get; set; }
        public string InterviewLink { get; set; }
    }
}
