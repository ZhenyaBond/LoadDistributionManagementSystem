//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ScheduleManagementSystem.DAL
{
    using System;
    
    public partial class GetTeacherSubjectList_Result
    {
        public int TeacherID { get; set; }
        public int SubjectID { get; set; }
        public Nullable<int> StreamID { get; set; }
        public string TeacherFullName { get; set; }
        public string SubjectFullName { get; set; }
        public bool IsDeleted { get; set; }
        public int SubjectTeacherID { get; set; }
    }
}
