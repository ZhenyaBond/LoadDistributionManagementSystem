namespace ScheduleManagementSystem.DAL.Models
{
    public class StaticDefaultItem
    {
        public int Id { get; }
        public string Name { get; set; }

        public StaticDefaultItem(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
