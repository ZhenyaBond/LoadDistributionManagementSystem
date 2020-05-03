using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/subjectteachers")]
    public class SubjectTeachersController : ApiController
    {

        private readonly ISubjectTeachersRepository _subjectteachersRepository;
        public SubjectTeachersController(ISubjectTeachersRepository subjectteachersRepository)
        {
            _subjectteachersRepository = subjectteachersRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var subjectteacher = _subjectteachersRepository.GetAll();
            return Ok(subjectteacher);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Post([FromBody] SubjectTeacherDto dtoModel)
        {
            var stream = _subjectteachersRepository.Create(dtoModel.SubjectID, dtoModel.TeacherID, dtoModel.StreamID);

            _subjectteachersRepository.Save();

            return Ok(stream);
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var subjectteacher = _subjectteachersRepository.TryGetById(modelId);

            if (subjectteacher == null)
            {
                return new NotFoundResult(Request);
            }

            _subjectteachersRepository.Remove(subjectteacher);

            _subjectteachersRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetStaticDefaults")]
        public IHttpActionResult GetStaticDefaults()
        {
            var subjects = _subjectteachersRepository.GetSubjectsDefaults();
            var streams = _subjectteachersRepository.GetStreamsDefaults();
            var teachers = _subjectteachersRepository.GetTeachersDefaults();

            return Ok(new { subjects, streams, teachers });
        }

    }
}
