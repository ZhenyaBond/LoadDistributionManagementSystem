using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/subjectactivities")]
    public class SubjectActivitiesController : ApiController
    {
        private readonly ISubjectActivitiesRepository _subjectactivitiesRepository;
        public SubjectActivitiesController(ISubjectActivitiesRepository subjectactivitiesRepository)
        {
            _subjectactivitiesRepository = subjectactivitiesRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var subjectactivity = _subjectactivitiesRepository.GetAll();
            return Ok(subjectactivity);
        }


        [HttpPost]
        [Authorize]
        public IHttpActionResult Post([FromBody] SubjectActivityDto dtoModel)
        {
            var subjectactivity = _subjectactivitiesRepository.Create(dtoModel.SubjectID, dtoModel.ActivityID, dtoModel.SemesterID,
                dtoModel.ProfessionID, dtoModel.Hour);

            _subjectactivitiesRepository.Save();

            return Ok(subjectactivity);
        }


        [HttpPost]
        [Authorize]
        [Route("Update")]
        public IHttpActionResult Update([FromBody] SubjectActivityDto dtoModel)
        {
            var subjectactivity = _subjectactivitiesRepository.TryGetById(dtoModel.SubjActID);

            if (subjectactivity == null)
            {
                return new NotFoundResult(Request);
            }

            _subjectactivitiesRepository.Update(subjectactivity, dtoModel.SubjectID, dtoModel.ActivityID, dtoModel.SemesterID,
                dtoModel.ProfessionID, dtoModel.Hour);

            _subjectactivitiesRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var subjectactivity = _subjectactivitiesRepository.TryGetById(modelId);

            if (subjectactivity == null)
            {
                return new NotFoundResult(Request);
            }

            _subjectactivitiesRepository.Remove(subjectactivity);

            _subjectactivitiesRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetStaticDefaults")]
        public IHttpActionResult GetStaticDefaults()
        {
            var subjects = _subjectactivitiesRepository.GetSubjectsDefaults();
            var semesters = _subjectactivitiesRepository.GetSemestersDefaults();
            var activities = _subjectactivitiesRepository.GetActivitiesDefaults();
            var professions = _subjectactivitiesRepository.GetProfessionsDefaults();

            return Ok(new { subjects, semesters, activities, professions });
        }
    }
}
