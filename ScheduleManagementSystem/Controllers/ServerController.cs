using System.Configuration;
using System.Web.Http;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/server")]
    public class ServerController : ApiController
    {
        private readonly ILoadRepository _loadRepository;
        public ServerController(ILoadRepository loadRepository)
        {
            _loadRepository = loadRepository;
        }

        [HttpGet]
        [Authorize]
        [Route("reportUrl")]
        public IHttpActionResult GetReportUrl()
        {
            var reportUrl = ConfigurationManager.AppSettings["ReportUrl"];

            return Ok(new { Url = reportUrl });
        }

        [HttpGet]
        [Authorize]
        [Route("variables")]
        public IHttpActionResult GetVariables()
        {
            var plannedValue = ConfigurationManager.AppSettings["PlannedValue"];
            var actualValue = _loadRepository.GetGlobalWorkload();

            return Ok(new { PlannedValue = plannedValue, ActualValue = actualValue });
        }

        [HttpGet]
        [Authorize]
        [Route("currentvalue")]
        public IHttpActionResult GetCurrentValue()
        {
            var actualValue = _loadRepository.GetGlobalWorkload();

            return Ok(actualValue);
        }

        [HttpPost]
        [Authorize]
        [Route("setvariable")]
        public IHttpActionResult SetVariables([FromBody]VariableDto model)
        {
            Configuration config = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~");
            config.AppSettings.Settings["PlannedValue"].Value = model.Value;
            config.Save();

            ConfigurationManager.RefreshSection("appSettings");

            return Ok();
        }
    }
}
