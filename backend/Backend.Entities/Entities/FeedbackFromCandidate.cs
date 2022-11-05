using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class FeedbackFromCandidate : IEntity
    {
        public Guid CandidateToken { get; set; }
        public string Feedback { get; set; } = null!;

        public virtual Candidate CandidateTokenNavigation { get; set; } = null!;
    }
}
