using System.Collections.Generic;
using System.Threading.Tasks;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface ISubjectsRepository : IRepository<tSubjectPrev>
    {
        IEnumerable<GetSubjectList_Result> GetAll();
        tSubjectPrev TryGetBySpec(int subjectId);
        Task LoadSubjectsFromWeb();
        tSubjectPrev CreateSubject(string disciplineName, string specName, string examSem, string creditSem,
                                                string totalHour, string lecturesHour, string labHour, string practicHour, string seminarHour);

        tSubjectPrev Update(tSubjectPrev subject, string examSem, string creditSem,
            string totalHour, string lecturesHour, string labHour, string practicHour, string seminarHour,
            bool isDeleted);
        void Remove(tSubjectPrev subject);
    }
}
