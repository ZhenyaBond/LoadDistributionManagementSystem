namespace ScheduleManagementSystem.Models
{
    public class StreamDto
    {
        public int Id { get; set; }
        public int StreamID { get; set; }
        public string ProfessionName { get; set; }
        public string StreamSubject { get; set; }
        public int SemesterID { get; set; }
        public bool IsDeleted { get; set; }
    }
}