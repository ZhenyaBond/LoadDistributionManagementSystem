using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/teachers")]
    public class TeachersController : ApiController
    {
        private readonly ITeachersRepository _teachersRepository;
        private readonly ILoadRepository _loadRepository;
        public TeachersController(ITeachersRepository teachersRepository, ILoadRepository loadRepository)
        {
            _teachersRepository = teachersRepository;
            _loadRepository = loadRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var teachers = _teachersRepository.GetAll();
            return Ok(teachers);
        }

        [HttpGet]
        [Authorize]
        [Route("GetVariables")]
        public IHttpActionResult GetVariables([FromUri]int teacherId)
        {
            var plannedWorkload = _teachersRepository.GetPlannedWorkload(teacherId);
            var actualWorkload = _loadRepository.GetTeacherWorkload(teacherId);

            return Ok(new {PlannedValue = plannedWorkload, ActualValue = actualWorkload ?? 0});
        }

        [HttpGet]
        [Authorize]
        [Route("GetActualWorkload")]
        public IHttpActionResult GetActualWorkload([FromUri]int teacherId)
        {
            var actualWorkload = _loadRepository.GetTeacherWorkload(teacherId);

            return Ok(actualWorkload ?? 0);
        }

        [HttpGet]
        [Authorize]
        [Route("createhistory")]
        public IHttpActionResult CreateHistory()
        {
            Task.Run(() => _teachersRepository.CreateHistory());
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetStaticDefaults")]
        public IHttpActionResult GetStaticDefaults()
        {
            var normas = _teachersRepository.GetNormasDefaults();
            var degrees = _teachersRepository.GetDegreesDefaults();
            var titles = _teachersRepository.GetTitlesDefaults();
            var positions = _teachersRepository.GetPositionsDefaults();

            return Ok( new {normas, degrees, titles, positions});
        }

        [HttpGet]
        [Route("GetTeacherName")]
        public IHttpActionResult GetTeacherName([FromUri] int id)
        {
            string teacherName = _teachersRepository.GetTeacherName(id);

            return Ok(teacherName);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Post([FromBody] TeacherDto dtoModel)
        {
            var teacher = _teachersRepository.Create(dtoModel.FullName, dtoModel.DegreeId,
                dtoModel.NormaId, dtoModel.PositionId, dtoModel.TitleId);

            _teachersRepository.Save();

            return Ok(teacher);
        }

        [HttpPost]
        [Authorize]
        [Route("Update")]
        public IHttpActionResult Update([FromBody] TeacherDto dtoModel)
        {
            var teacher = _teachersRepository.TryGetById(dtoModel.TeacherId);

            if (teacher == null)
            {
                return new NotFoundResult(Request);
            }

            _teachersRepository.Update(teacher, dtoModel.FullName, dtoModel.DegreeId,
                dtoModel.NormaId, dtoModel.PositionId, dtoModel.TitleId);

            _teachersRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var teacher = _teachersRepository.TryGetById(modelId);

            if (teacher == null)
            {
                return new NotFoundResult(Request);
            }

            _teachersRepository.Remove(teacher);

            _teachersRepository.Save();

            return Ok();
        }
    }
}
