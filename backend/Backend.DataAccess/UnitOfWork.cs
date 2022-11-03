using Backend.Common;
using Backend.Entities;

namespace Backend.DataAccess
{
    public class UnitOfWork
    {
        private readonly test_boilerplateContext Context;

        public UnitOfWork(test_boilerplateContext context)
        {
            Context = context;
        }

        private IRepository<User> users;
        public IRepository<User> Users => users ?? (users = new BaseRepository<User>(Context));



        public void SaveChanges()
        {
            Context.SaveChanges();
        }
    }
}
