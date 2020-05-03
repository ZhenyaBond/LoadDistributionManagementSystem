using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Web.Http;
using System.Web.Http.Results;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/normpositions")]
    public class NormPositionsController : ApiController
    {
        private readonly INormPositionsRepository _normpositionsRepository;
        public NormPositionsController(INormPositionsRepository normpositionsRepository)
        {
            _normpositionsRepository = normpositionsRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var normpositions = _normpositionsRepository.GetAll();
            return Ok(normpositions);
        }

        [HttpPost]
        [Authorize]
        [Route("Update")]
        public IHttpActionResult Update([FromBody] NormPositionDto dtoModel)
        {
            var normposition = _normpositionsRepository.TryGetById(dtoModel.NormPositionId);

            if (normposition == null)
            {
                return new NotFoundResult(Request);
            }

            _normpositionsRepository.Update(normposition, dtoModel.Hour);

            _normpositionsRepository.Save();

            return Ok();
        }
    }
}
