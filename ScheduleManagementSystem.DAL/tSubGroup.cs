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
    
    public partial class tSubGroup
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tSubGroup()
        {
            this.tDistribs = new HashSet<tDistrib>();
        }
    
        public int SubGroupID { get; set; }
        public string SubGroupName { get; set; }
        public Nullable<int> GroupID { get; set; }
        public Nullable<int> SubGroupAmount { get; set; }
        public Nullable<double> SubGroupPart { get; set; }
        public int CreatedByID { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int ModifiedByID { get; set; }
        public System.DateTime ModifiedDate { get; set; }
        public bool IsDeleted { get; set; }
    
        public virtual tGroup tGroup { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tDistrib> tDistribs { get; set; }
    }
}
