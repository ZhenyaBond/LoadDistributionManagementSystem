namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface IRepository<in T>
    {
        void Update(T entryToUpdate);
        void Save();
    }
}
