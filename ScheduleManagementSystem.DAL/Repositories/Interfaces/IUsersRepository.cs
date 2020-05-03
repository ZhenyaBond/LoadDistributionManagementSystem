namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface IUsersRepository : IRepository<tLoginInfo>
    {
        tLoginInfo Create(string username, byte[] password);
        tLoginInfo GetByUsernameAndPassword(string username, string password);
        tLoginInfo[] GetAll();
    }
}
