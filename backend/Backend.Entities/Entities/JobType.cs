using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class JobType : IEntity
    {
        public JobType()
        {
            Jobs = new HashSet<Job>();
        }

        public int JobTypeId { get; set; }
        public string JobType1 { get; set; } = null!;

        public virtual ICollection<Job> Jobs { get; set; }
    }
}
