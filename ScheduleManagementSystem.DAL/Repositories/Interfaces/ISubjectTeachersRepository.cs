using System.Collections.Generic;
using ScheduleManagementSystem.DAL.Models;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface ISubjectTeachersRepository : IRepository<tSubjectTeacher>
    {
        IEnumerable<GetTeacherSubjectList_Result> GetAll();
        tSubjectTeacher TryGetById(int Id);
        tSubjectTeacher Create(int SubjectID, int TeacherID, int StreamID);
        void Remove(tSubjectTeacher subjectteacher);

        IEnumerable<StaticDefaultItem> GetSubjectsDefaults();
        IEnumerable<StaticDefaultItem> GetStreamsDefaults();
        IEnumerable<StaticDefaultItem> GetTeachersDefaults();
    }
}
