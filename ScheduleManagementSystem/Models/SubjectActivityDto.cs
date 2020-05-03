namespace ScheduleManagementSystem.Models
{
    public class SubjectActivityDto
    {
        public int SubjActID { get; set; }
        public int SubjectID { get; set; }
        public int ActivityID { get; set; }
        public int? SemesterID { get; set; }
        public int ProfessionID { get; set; }
        public int? Hour { get; set; }

    }
}