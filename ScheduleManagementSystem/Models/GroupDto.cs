using System.Collections.Generic;

namespace ScheduleManagementSystem.Models
{
    public class GroupDto
    {
        public int GroupId { get; set; }
        public int GradeId { get; set; }
        public int ProfessionId { get; set; }
        public string GroupName { get; set; }
        public int GroupAmount { get; set; }
        public float GroupPart { get; set; }
        //public IEnumerable<SubGroupDto> SubGroups { get; set; }
    }

    //public class SubGroupDto
    //{
    //    public int SubGroupId { get; set; }
    //    public int GroupId { get; set; }
    //    public string SubGroupName { get; set; }
    //    public int SubGroupAmount { get; set; }
    //    public float SubGroupPart { get; set; }
    //}
}