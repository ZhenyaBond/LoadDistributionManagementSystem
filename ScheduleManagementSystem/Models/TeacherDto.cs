namespace ScheduleManagementSystem.Models
{
    public class TeacherDto
    {
        public int TeacherId { get; set; }
        public string FullName { get; set; }
        public int PositionId { get; set; }
        public int? TitleId { get; set; }
        public int? DegreeId { get; set; }
        public int NormaId { get; set; }
    }
}