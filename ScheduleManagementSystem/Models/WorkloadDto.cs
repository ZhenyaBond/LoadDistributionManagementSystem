namespace ScheduleManagementSystem.Models
{
    public class WorkloadDto
    {
        public int TeacherId { get; set; }
        public int SubjectId { get; set; }
        public int SpecId { get; set; }
        public int SemesterId { get; set; }
        public int ActivityId { get; set; }
        public int? GroupId { get; set; }
        public int? SubGroupId { get; set; }
        public float Hour { get; set; }
    }
}