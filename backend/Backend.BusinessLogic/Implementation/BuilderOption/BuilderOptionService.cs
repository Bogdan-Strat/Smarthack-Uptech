using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.BuilderOption.Models;
using Backend.BusinessLogic.Implementation;
using Backend.BusinessLogic.Implementation.UserAccount.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.BuilderOption
{
    public class BuilderOptionService : BaseService
    {
        public BuilderOptionService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public async Task<List<BuilderOptionModel>> GetBuilderOptions()
        {
            var builderOptions = UnitOfWork.BuilderOptions.Get()
                .Select(b => new BuilderOptionModel
                {
                    BuilderOptionId = b.BuilderOptionId,
                    BuilderOptionMessage = b.BuilderOptionMessage
                })
                .ToList();
            
            return builderOptions;
        }
    }
}
