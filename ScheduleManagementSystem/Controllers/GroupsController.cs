using ScheduleManagementSystem.DAL;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using ScheduleManagementSystem.Models;
using System.Linq;
using System.Web.Http;

namespace ScheduleManagementSystem.Controllers
{
    [RoutePrefix("api/groups")]
    public class GroupsController : ApiController
    {
        private readonly IGroupsRepository _groupsRepository;

        public GroupsController(IGroupsRepository groupsRepository) 
            => _groupsRepository = groupsRepository;

        [HttpGet]
        [Authorize]
        public IHttpActionResult Get()
        {
            var list = _groupsRepository.GetAll().ToList();

            //var grouping = list.GroupBy(a => a.GroupID);

            //var dtos = grouping.Select(Map);

            return Ok(list);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Post([FromBody] GroupDto dtoModel)
        {
            var group = _groupsRepository.Create(dtoModel.GroupName, dtoModel.ProfessionId,
                dtoModel.GroupAmount, dtoModel.GroupPart, dtoModel.GradeId);

            _groupsRepository.Save();

            return Ok(group);
        }

        [HttpGet]
        [Authorize]
        [Route("deletegroup")]
        public IHttpActionResult DeleteGroup([FromUri] int groupId)
        {
            var group = _groupsRepository.TryGetGroupById(groupId);

            if (group == null)
            {
                return NotFound();
            }

            _groupsRepository.DeleteGroup(group);
            _groupsRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("deletesubgroup")]
        public IHttpActionResult DeleteSubGroup([FromUri] int subGroupId)
        {
            var subGroup = _groupsRepository.TryGetSubGroupById(subGroupId);

            if (subGroup == null)
            {
                return NotFound();
            }

            _groupsRepository.DeleteSubGroup(subGroup);
            _groupsRepository.Save();

            return Ok();
        }

        private GroupDto Map(IGrouping<int, GetGroupSubGroupList_Result> grouping)
        {
            return new GroupDto
            {
                GroupAmount = grouping.First().GroupAmount,
                GroupId = grouping.First().GroupID,
                GroupName = grouping.First().GroupName,
                SubGroups = grouping.Select(gr => new SubGroupDto
                {
                    SubGroupId = gr.SubGroupID,
                    SubGroupName = gr.SubGroupName,
                    SubGroupAmount = gr.SubGroupAmount
                })
            };
        }
    }
}
