using System.Collections.Generic;
using ScheduleManagementSystem.DAL.Models;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface ISubjectActivitiesRepository : IRepository<tSubjectActivity>
    {
        tSubjectActivity TryGetById(int subjactId);
        IEnumerable<GetSubjectActivityList_Result> GetAll();
        tSubjectActivity Update(tSubjectActivity subjectActivity, int subjectId, int activityId, int? semesterId, int professionId, int? hour);
        tSubjectActivity Create(int subjectId, int activityId, int? semesterId, int professionId, int? hour);
        void Remove(tSubjectActivity activity);

        IEnumerable<StaticDefaultItem> GetSubjectsDefaults();
        IEnumerable<StaticDefaultItem> GetSemestersDefaults();
        IEnumerable<StaticDefaultItem> GetActivitiesDefaults();
        IEnumerable<StaticDefaultItem> GetProfessionsDefaults();
    }
}
