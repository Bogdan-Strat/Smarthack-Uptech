using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Recruiter : IEntity
    {
        public Recruiter()
        {
            InterviewXrecruiters = new HashSet<InterviewXrecruiter>();
            Jobs = new HashSet<Job>();
        }

        public Guid RecruiterId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid CompanyId { get; set; }
        public int RoleId { get; set; }
        public byte[] Password { get; set; } = null!;
        public Guid Salt { get; set; }
        public bool IsLoggedFirstTime { get; set; }

        public virtual Company Company { get; set; } = null!;
        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<InterviewXrecruiter> InterviewXrecruiters { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
    }
}
