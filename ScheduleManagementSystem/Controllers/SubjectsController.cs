using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/subjects")]
    public class SubjectsController : ApiController
    {
        private readonly ISubjectsRepository _subjectsRepository;
        public SubjectsController(ISubjectsRepository subjectsRepository)
        {
            _subjectsRepository = subjectsRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var subjects = _subjectsRepository.GetAll();

            return Ok(subjects);
        }

        [HttpGet]
        [Authorize]
        [Route("loadfromweb")]
        public IHttpActionResult LoadSubjects()
        {
            Task.Run(() => _subjectsRepository.LoadSubjectsFromWeb());

            return Ok();
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Create([FromBody] SubjectDto model)
        {
            var subject = _subjectsRepository.CreateSubject(model.DisciplineName, model.SpecName, model.ExamSem,
                model.CreditSem, model.TotalHour, model.LecturesHour, model.LabHour, model.PracticHour, model.SeminarHour);

            _subjectsRepository.Save();

            return Ok();
        }

        [HttpPost]
        [Authorize]
        [Route("Update")]
        public IHttpActionResult Update([FromBody] SubjectDto model)
        {
            var subject = _subjectsRepository.TryGetBySpec(model.Id);

            if (subject == null)
            {
                return new NotFoundResult(Request);
            }

            _subjectsRepository.Update(subject, model.ExamSem,
                model.CreditSem, model.TotalHour, model.LecturesHour, model.LabHour, model.PracticHour,
                model.SeminarHour, model.IsDeleted);

            _subjectsRepository.Save();

            return Ok(subject);
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var subjectactivity = _subjectsRepository.TryGetBySpec(modelId);

            if (subjectactivity == null)
            {
                return new NotFoundResult(Request);
            }

            _subjectsRepository.Remove(subjectactivity);

            _subjectsRepository.Save();

            return Ok();
        }

    }
}
