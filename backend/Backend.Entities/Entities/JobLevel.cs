using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class JobLevel : IEntity
    {
        public JobLevel()
        {
            Jobs = new HashSet<Job>();
        }

        public int JobLevelId { get; set; }
        public string JobLevel1 { get; set; } = null!;

        public virtual ICollection<Job> Jobs { get; set; }
    }
}
