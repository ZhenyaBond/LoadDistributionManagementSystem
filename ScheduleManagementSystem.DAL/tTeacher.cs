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
    
    public partial class tTeacher
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tTeacher()
        {
            this.tDistribs = new HashSet<tDistrib>();
            this.tSubjectTeachers = new HashSet<tSubjectTeacher>();
        }
    
        public int TeacherID { get; set; }
        public string TeacherFullName { get; set; }
        public Nullable<int> PulpitID { get; set; }
        public Nullable<int> PositionID { get; set; }
        public Nullable<int> TitleID { get; set; }
        public Nullable<int> DegreeID { get; set; }
        public Nullable<int> NormID { get; set; }
        public int CreatedByID { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int ModifiedByID { get; set; }
        public System.DateTime ModifiedDate { get; set; }
        public bool IsDeleted { get; set; }
    
        public virtual tDegree tDegree { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tDistrib> tDistribs { get; set; }
        public virtual tNorm tNorm { get; set; }
        public virtual tPosition tPosition { get; set; }
        public virtual tPulpit tPulpit { get; set; }
        public virtual tTitle tTitle { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tSubjectTeacher> tSubjectTeachers { get; set; }
    }
}
