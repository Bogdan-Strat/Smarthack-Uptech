using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Jobs.Models
{
    public class ViewJobModel
    {
        public Guid JobId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string JobLevel { get; set; }
        public string JobType { get; set; }
        public int NrOfPositions { get; set; }
    }
}
