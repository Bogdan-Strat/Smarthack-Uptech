using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Interview : IEntity
    {
        public Interview()
        {
            InterviewXrecruiters = new HashSet<InterviewXrecruiter>();
        }

        public Guid InterviewId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? InterviewLink { get; set; }
        public bool? IsPassed { get; set; }
        public Guid CandidateToken { get; set; }

        public virtual Candidate CandidateTokenNavigation { get; set; } = null!;
        public virtual ICollection<InterviewXrecruiter> InterviewXrecruiters { get; set; }
    }
}
