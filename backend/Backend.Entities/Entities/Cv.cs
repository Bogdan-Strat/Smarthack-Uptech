using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Cv : IEntity
    {
        public Guid CandidateToken { get; set; }
        public string Cv1 { get; set; } = null!;
        public bool? IsPassed { get; set; }

        public virtual Candidate CandidateTokenNavigation { get; set; } = null!;
    }
}
