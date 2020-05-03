namespace ScheduleManagementSystem.Models
{
    public class LoadDto
    {
        public int DistribId { get; set; }
        public int TeacherId { get; set; }
        public string Subject { get; set; }
        public string Profession { get; set; }
        public string Semester { get; set; }
        public string Activity { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
        public float Hour { get; set; }
    }
}