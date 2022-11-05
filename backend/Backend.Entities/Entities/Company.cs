using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Company : IEntity
    {
        public Company()
        {
            Recruiters = new HashSet<Recruiter>();
            BuilderOptions = new HashSet<BuilderOption>();
        }

        public Guid CompanyId { get; set; }
        public string Name { get; set; } = null!;
        public string Logo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool IsDeleted { get; set; }

        public virtual ICollection<Recruiter> Recruiters { get; set; }

        public virtual ICollection<BuilderOption> BuilderOptions { get; set; }
    }
}
