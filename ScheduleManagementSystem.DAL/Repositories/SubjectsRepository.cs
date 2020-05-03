using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class SubjectsRepository : RepositoryBase<tSubjectPrev>, ISubjectsRepository
    {
        public SubjectsRepository(dbContext context) : base(context)
        {
        }

        public tSubjectPrev TryGetBySpec(int subjectId) => DbSet.FirstOrDefault(t => t.Id == subjectId);

        public IEnumerable<GetSubjectList_Result> GetAll() => 
            Context.GetSubjectList().Where(s => !s.IsDeleted);

        public async Task LoadSubjectsFromWeb() => Context.spLoadSubjectFromWeb();

        public tSubjectPrev CreateSubject(string disciplineName, string specName, string examSem, string creditSem,
            string totalHour, string lecturesHour, string labHour, string practicHour, string seminarHour)
        {
            var newSubject = new tSubjectPrev
            {
                DisciplineName = disciplineName,
                specName = specName,
                ExamSem = examSem,
                CreditSem = creditSem,
                TotalHour = totalHour,
                LecturesHour = lecturesHour,
                LabHour = labHour,
                PracticHour = practicHour,
                SeminarHour = seminarHour
            };

            Add(newSubject);

            return newSubject;
        }

        public tSubjectPrev Update(tSubjectPrev subject, string examSem,
            string creditSem, string totalHour, string lecturesHour, string labHour, 
            string practicHour, string seminarHour, bool isDeleted)
        {
            subject.ExamSem = examSem;
            subject.CreditSem = creditSem;
            subject.TotalHour = totalHour;
            subject.LecturesHour = lecturesHour;
            subject.PracticHour = practicHour;
            subject.SeminarHour = seminarHour;
            subject.isDeleted = isDeleted;

            Update(subject);

            return subject;
        }

        public void Remove(tSubjectPrev subjectPrev)
        {
            subjectPrev.isDeleted = true;

            Update(subjectPrev);
        }
    }
}
