using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
     [RoutePrefix("api/streams")]
     public class StreamsController : ApiController
     {
         private readonly IStreamsRepository _streamsRepository;
         public StreamsController(IStreamsRepository streamsRepository)
         {
            _streamsRepository = streamsRepository;
         }

         [HttpGet]
         [Authorize]
         public IHttpActionResult Get()
         {
             var streams = _streamsRepository.GetAll();
             return Ok(streams);
         }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Post([FromBody] StreamDto dtoModel)
        {
            var stream = _streamsRepository.Create(dtoModel.StreamID, dtoModel.ProfessionName,
                dtoModel.StreamSubject, dtoModel.SemesterID);

            _streamsRepository.Save();

            return Ok(stream);
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var stream = _streamsRepository.TryGetById(modelId);

            if (stream == null)
            {
                return new NotFoundResult(Request);
            }

            _streamsRepository.Remove(stream);

            _streamsRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetStaticDefaults")]
        public IHttpActionResult GetStaticDefaults()
        {
            var subjects = _streamsRepository.GetSubjectsDefaults();
            var semesters = _streamsRepository.GetSemestersDefaults();
            var professions = _streamsRepository.GetProfessionsDefaults();

            return Ok(new { subjects, semesters, professions });
        }
    }
}
