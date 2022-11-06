using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class BuilderOption : IEntity
    {
        public BuilderOption()
        {
            Companies = new HashSet<Company>();
        }

        public int BuilderOptionId { get; set; }
        public string BuilderOptionMessage { get; set; } = null!;

        public virtual ICollection<Company> Companies { get; set; }
    }
}
