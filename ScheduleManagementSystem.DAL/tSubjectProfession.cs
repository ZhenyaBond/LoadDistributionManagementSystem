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
    using System.Collections.Generic;
    
    public partial class tSubjectProfession
    {
        public int SubjectID { get; set; }
        public int ProfessionID { get; set; }
        public int CreatedByID { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int ModifiedByID { get; set; }
        public System.DateTime ModifiedDate { get; set; }
        public bool IsDeleted { get; set; }
        public int SubjectProfessionID { get; set; }
    
        public virtual tProfession tProfession { get; set; }
        public virtual tSubject tSubject { get; set; }
    }
}
