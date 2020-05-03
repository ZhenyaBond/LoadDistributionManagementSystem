using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Helpers.Encryptors.Interfaces;
using System;
using System.Linq;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class UsersRepository : RepositoryBase<tLoginInfo>, IUsersRepository
    {
        private readonly ISha256Encryptor _sha256Encryptor;
        public UsersRepository(dbContext context, ISha256Encryptor encryptor) : base(context)
        {
            _sha256Encryptor = encryptor;
        }

        public tLoginInfo Create(string username, byte[] password)
        {
            var newUser = new tLoginInfo
            {
                UserPassword = password,
                UserName = username,
                CreatedByID = -100,
                CreatedDate = DateTime.Now,
                RoleID = 1
            };

            Add(newUser);

            return newUser;
        }

        public tLoginInfo GetByUsernameAndPassword(string username, string password)
        {
            var hash = _sha256Encryptor.ComputeHash(password);

            var users = DbSet.Where(li => li.UserName == username).ToList();

            var user = users.FirstOrDefault(u => u.UserPassword.SequenceEqual(hash));

            return user;
        }

        public tLoginInfo[] GetAll()
        {
            return DbSet.ToArray();
        }
    }
}
