using System;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class GroupsRepository : RepositoryBase<tGroup>, IGroupsRepository
    {
        public GroupsRepository(dbContext context) : base(context)
        {
        }

        public tGroup TryGetGroupById(int groupId) => DbSet.FirstOrDefault(g => g.GroupID == groupId);

        //public tSubGroup TryGetSubGroupById(int subGroupId) =>
        //    Context.tSubGroups.FirstOrDefault(sg => sg.SubGroupID == subGroupId);

        public IEnumerable<GetGroupSubGroupList_Result> GetAll() => Context.GetGroupSubGroupList();

        public tGroup Create(string GroupName, int ProfessionId, int GroupAmount, float GroupPart, int GradeId)
        {
            var group = new tGroup
            {
                GroupName = GroupName,
                ProfessionID = ProfessionId,
                GroupAmount = GroupAmount,
                GroupPart = GroupPart,
                GradeID = GradeId,
                CreatedByID = WebAdminId,
                CreatedDate = DateTime.UtcNow,
                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.UtcNow,
                
            };

            Add(group);

            return group;
        }

        public void DeleteGroup(tGroup group)
        {
            group.tSubGroups.ToList().ForEach(sg =>
            {
                sg.IsDeleted = true;
                sg.GroupID = null;

                sg.ModifiedDate = DateTime.Now;
                sg.ModifiedByID = WebAdminId;
            });

            Delete(group);
        }

        //public void DeleteSubGroup(tSubGroup subGroup)
        //{
        //    subGroup.IsDeleted = true;

        //    subGroup.ModifiedDate = DateTime.Now;
        //    subGroup.ModifiedByID = WebAdminId;
        //}
    }
}
