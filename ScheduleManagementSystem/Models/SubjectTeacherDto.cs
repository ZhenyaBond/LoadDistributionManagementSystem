namespace ScheduleManagementSystem.Models
{
    public class SubjectTeacherDto
    {
        public int SubjectTeacherID { get; set; }
        public int SubjectID { get; set; }
        public int TeacherID { get; set; }
        public int StreamID { get; set; }
        public bool IsDeleted { get; set; }
    }
}