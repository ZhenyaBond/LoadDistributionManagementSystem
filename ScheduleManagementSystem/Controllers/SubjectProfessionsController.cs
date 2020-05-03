using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/subjectprofessions")]
    public class SubjectProfessionsController : ApiController
    {
        private readonly ISubjectProfessionsRepository _subjectprofessionsRepository;
        public SubjectProfessionsController(ISubjectProfessionsRepository subjectproffessionsRepository)
        {
            _subjectprofessionsRepository = subjectproffessionsRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var subjectprofession = _subjectprofessionsRepository.GetAll();
            return Ok(subjectprofession);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Post([FromBody] SubjectProfessionDto dtoModel)
        {
            var stream = _subjectprofessionsRepository.Create(dtoModel.SubjectID, dtoModel.ProfessionID);

            _subjectprofessionsRepository.Save();

            return Ok(stream);
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var subjectteacher = _subjectprofessionsRepository.TryGetById(modelId);

            if (subjectteacher == null)
            {
                return new NotFoundResult(Request);
            }

            _subjectprofessionsRepository.Remove(subjectteacher);

            _subjectprofessionsRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetStaticDefaults")]
        public IHttpActionResult GetStaticDefaults()
        {
            var subjects = _subjectprofessionsRepository.GetSubjectsDefaults();
            var professions = _subjectprofessionsRepository.GetProfessionsDefaults();

            return Ok(new { subjects, professions });
        }
    }
}
