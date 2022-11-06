using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class InterviewXrecruiter : IEntity
    {
        public Guid InterviewId { get; set; }
        public Guid RecruiterId { get; set; }
        public string? FeedbackMessage { get; set; }
        public bool? IsFeedBackPublic { get; set; }

        public virtual Interview Interview { get; set; } = null!;
        public virtual Recruiter Recruiter { get; set; } = null!;
    }
}
