using Backend.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Models
{
    public class BuilderOptionModel : IEntity
    {
        public int BuilderOptionId { get; set; }
        public string BuilderOptionMessage { get; set; } = null!;
    }
}
