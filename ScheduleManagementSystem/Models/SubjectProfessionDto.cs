namespace ScheduleManagementSystem.Models
{
    public class SubjectProfessionDto
    {
        public int SubjectProfessionID { get; set; }
        public int SubjectID { get; set; }
        public int ProfessionID { get; set; }
        public bool IsDeleted { get; set; }
    }
}