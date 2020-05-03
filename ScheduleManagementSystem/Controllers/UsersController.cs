using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Helpers.Encryptors.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly IUsersRepository _usersRepository;
        private readonly ISha256Encryptor _sha256Encryptor;
        public UsersController(IUsersRepository usersRepository, ISha256Encryptor encryptor)
        {
            _usersRepository = usersRepository;
            _sha256Encryptor = encryptor;
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Create([FromBody]UserCreateDto userModel)
        {
            var hash = _sha256Encryptor.ComputeHash(userModel.Password);

            var user = _usersRepository.Create(userModel.UserName, hash);

            _usersRepository.Save();

            return Ok(user);
        }
    }
}
