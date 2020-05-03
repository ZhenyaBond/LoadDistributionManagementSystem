using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScheduleManagementSystem.Models
{
    public class SubjectDto
    {
        public int Id { get; set; }
        public string DisciplineName { get; set; }
        public string SpecName { get; set; }
        public string ExamSem { get; set; }
        public string CreditSem { get; set; }
        public string TotalHour { get; set; }
        public string LecturesHour { get; set; }
        public string LabHour { get; set; }
        public string PracticHour { get; set; }
        public string SeminarHour { get; set; }
        public bool IsDeleted { get; set; }
    }
}