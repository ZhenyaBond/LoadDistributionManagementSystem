using System;
using System.Collections.Generic;
using System.Linq;
using ScheduleManagementSystem.DAL.Models;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class SubjectTeachersRepository : RepositoryBase<tSubjectTeacher>, ISubjectTeachersRepository
    {
        public SubjectTeachersRepository(dbContext context) : base(context)
        {
        }

        public tSubjectTeacher TryGetById(int Id) => DbSet.FirstOrDefault(t => t.SubjectTeacherID == Id);

        public IEnumerable<GetTeacherSubjectList_Result> GetAll() => 
            Context.GetTeacherSubjectList().Where(ts => !ts.IsDeleted);

        public tSubjectTeacher Create(int SubjectID, int TeacherID, int StreamID)
        {
            var subjectteacher = new tSubjectTeacher
            {
                StreamID = StreamID,
                CreatedByID = WebAdminId,
                CreatedDate = DateTime.UtcNow,
                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.UtcNow,
                SubjectID = SubjectID,
                TeacherID = TeacherID
            };

            Add(subjectteacher);

            return subjectteacher;
        }

        public void Remove(tSubjectTeacher subjectteacher)
        {
            subjectteacher.IsDeleted = true;

            subjectteacher.ModifiedDate = DateTime.UtcNow;
            subjectteacher.ModifiedByID = WebAdminId;

            Update(subjectteacher);
        }

        public IEnumerable<StaticDefaultItem> GetSubjectsDefaults()
        {
            var subjects = Context.tSubjects.ToList();

            return subjects.Select(subject => new StaticDefaultItem(subject.SubjectID, subject.SubjectFullName));
        }


        public IEnumerable<StaticDefaultItem> GetStreamsDefaults()
        {
            var streams = Context.tStreams.ToList();

            return streams.Select(stream => new StaticDefaultItem(stream.StreamID, stream.StreamID.ToString()));
        }

        public IEnumerable<StaticDefaultItem> GetTeachersDefaults()
        {
            var teachers = Context.tTeachers.ToList();

            return teachers.Select(teacher => new StaticDefaultItem(teacher.TeacherID, teacher.TeacherFullName));
        }

    }
}
