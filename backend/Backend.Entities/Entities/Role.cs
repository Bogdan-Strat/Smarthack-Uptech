using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Role : IEntity
    {
        public Role()
        {
            Recruiters = new HashSet<Recruiter>();
        }

        public int RoleId { get; set; }
        public string Role1 { get; set; } = null!;

        public virtual ICollection<Recruiter> Recruiters { get; set; }
    }
}
