using Backend.BusinessLogic.Base;
using Backend.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Interviews
{
    public class InterviewService : BaseService
    {
        private readonly NewInterviewValidator _newInterviewValidator;
        public InterviewService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            _newInterviewValidator = new NewInterviewValidator(UnitOfWork);
        }

        public async Task AddInterview(NewInterviewModel model)
        {
            ExecuteInTransaction(uow =>
            {
                _newInterviewValidator.Validate(model).ThenThrow();
            });
        }
    }
}
