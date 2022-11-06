using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Jobs.Models
{
    public class AddJobModel
    {
        public Guid CurrentUserId { get; set; }
        public string JobTitle { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int JobLevelId { get; set; }
        public int JobTypeId { get; set; }
        public int NrOfPositions { get; set; }
    }
}
