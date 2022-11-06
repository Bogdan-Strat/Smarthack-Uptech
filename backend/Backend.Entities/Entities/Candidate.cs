using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Candidate : IEntity
    {
        public Candidate()
        {
            Interviews = new HashSet<Interview>();
        }

        public Guid CandidateToken { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid JobId { get; set; }
        public bool? IsPassed { get; set; }

        public virtual Job Job { get; set; } = null!;
        public virtual Cv? Cv { get; set; }
        public virtual FeedbackFromCandidate? FeedbackFromCandidate { get; set; }
        public virtual ICollection<Interview> Interviews { get; set; }
    }
}
