using System.Collections.Generic;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface ILoadRepository : IRepository<tDistrib>
    {
        IEnumerable<spGetDistribListSubjectOnly_Result> GetLoadTable();

        IEnumerable<tDistrib> GetForTeacher(int teacherId);
        tDistrib GetById(int workloadId);
        float GetGlobalWorkload();
        float? GetTeacherWorkload(int teacherId);

        tDistrib Create(int teacherId, int subjectId, int specId, int semesterId, int activityId, int? groupId,
            int? subGroupId, float hour);

        tDistrib Update(tDistrib entity, float hour);
        void Remove(tDistrib entity);
    }
}
