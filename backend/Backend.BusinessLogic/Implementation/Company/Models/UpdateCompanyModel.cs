using Backend.BusinessLogic.BuilderOption.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Company.Models
{
    public class UpdateCompanyModel
    {
        public Guid CurrentUserId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Logo { get; set; } = null!;

        public List<int> BuilderOptionIds { get; set; }
    }
}
