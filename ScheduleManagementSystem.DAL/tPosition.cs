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
    
    public partial class tPosition
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tPosition()
        {
            this.tNormPositions = new HashSet<tNormPosition>();
            this.tTeachers = new HashSet<tTeacher>();
        }
    
        public int PositionID { get; set; }
        public string PositionName { get; set; }
        public int CreatedByID { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int ModifiedByID { get; set; }
        public System.DateTime ModifiedDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tNormPosition> tNormPositions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tTeacher> tTeachers { get; set; }
    }
}
