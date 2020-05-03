using System.Collections.Generic;
using ScheduleManagementSystem.DAL.Models;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface ISubjectProfessionsRepository : IRepository<tSubjectProfession>
    {
        IEnumerable<GetSubjectProfessionList_Result> GetAll();
        tSubjectProfession TryGetById(int Id);
        tSubjectProfession Create(int SubjectID, int ProfessionID);
        void Remove(tSubjectProfession subjectprofession);

        IEnumerable<StaticDefaultItem> GetSubjectsDefaults();
        IEnumerable<StaticDefaultItem> GetProfessionsDefaults();
    }
}
