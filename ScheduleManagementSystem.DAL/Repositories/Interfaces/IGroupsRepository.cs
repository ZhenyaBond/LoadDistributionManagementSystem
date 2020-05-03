using System.Collections.Generic;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface IGroupsRepository : IRepository<tGroup>
    {
        tGroup TryGetGroupById(int groupId);
        //tSubGroup TryGetSubGroupById(int subGroupId);
        IEnumerable<GetGroupSubGroupList_Result> GetAll();
        void DeleteGroup(tGroup group);
        //void DeleteSubGroup(tSubGroup subGroup);
        tGroup Create(string GroupName, int ProfessionId, int GroupAmount, float GroupPart, int GradeId);
    }
}
