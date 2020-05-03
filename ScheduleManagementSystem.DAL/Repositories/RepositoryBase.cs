using System.Data.Entity;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class RepositoryBase<T> : IRepository<T> where T : class
    {
        protected const int WebAdminId = -1;
        protected const int IsitPulpitId = 1;

        protected readonly dbContext Context;
        protected readonly DbSet<T> DbSet;

        public RepositoryBase(dbContext context)
        {
            Context = context;
            DbSet = context.Set<T>();
        }

        public void Add(T entryToAdd)
        {
            DbSet.Add(entryToAdd);
            Context.Entry(entryToAdd).State = EntityState.Added;
        }

        public virtual void Update(T entryToUpdate)
        {
            DbSet.Attach(entryToUpdate);
            Context.Entry(entryToUpdate).State = EntityState.Modified;
        }

        public void Save() => Context.SaveChanges();

        public void Delete(T entryToDelete)
        {
            DbSet.Remove(entryToDelete);
            Context.Entry(entryToDelete).State = EntityState.Deleted;
        }
    }
}
