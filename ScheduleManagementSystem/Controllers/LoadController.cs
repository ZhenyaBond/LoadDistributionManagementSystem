using System;
using System.Linq;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using System.Web.Http;
using System.Web.Http.Results;
using ScheduleManagementSystem.Models;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/load")]
    public class LoadController : ApiController
    {
        private readonly ILoadRepository _loadRepository;
        public LoadController(ILoadRepository loadRepository)
        {
            _loadRepository = loadRepository;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var loadTable = _loadRepository.GetLoadTable();

            return Ok(loadTable);
        }

        [HttpGet]
        [Authorize]
        [Route("teacherworkload")]
        public IHttpActionResult GetTeacherWorkload([FromUri] int teacherId)
        {
            var workload = _loadRepository.GetForTeacher(teacherId);

            var dtos = workload.Select(wld => new LoadDto
            {
                Activity = wld.tActivity.ActivityNameRu, DistribId = wld.DistribID, Group = wld.tGroup?.GroupName,
                Hour = wld.Hour, Profession = wld.tProfession.ProfessionFullName,
                Semester = wld.tSemester.SemesterNameRu, SubGroup = wld.tSubGroup?.SubGroupName,
                Subject = wld.tSubject.SubjectFullName, TeacherId = wld.TeacherID
            });

            return Ok(dtos);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Create([FromBody]WorkloadDto model)
        {
            var wld = _loadRepository.Create(model.TeacherId, model.SubjectId, model.SpecId, model.SemesterId,
                model.ActivityId,
                model.GroupId, model.SubGroupId, model.Hour);

            _loadRepository.Save();

            return Ok(wld);
        }

        [HttpPost]
        [Authorize]
        [Route("update")]
        public IHttpActionResult Update([FromBody]LoadUpdateDto model)
        {
            var workload = _loadRepository.GetById(model.DistribId);

            if (workload == null)
            {
                return NotFound();
            }

            _loadRepository.Update(workload, model.Hour);

            _loadRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("delete")]
        public IHttpActionResult Delete([FromUri] int modelId)
        {
            var subjectactivity = _loadRepository.GetById(modelId);

            if (subjectactivity == null)
            {
                return new NotFoundResult(Request);
            }

            _loadRepository.Remove(subjectactivity);

            _loadRepository.Save();

            return Ok();
        }
    }
}
