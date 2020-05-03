using System;
using System.Collections.Generic;
using System.Linq;
using ScheduleManagementSystem.DAL.Models;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class StreamsRepository : RepositoryBase<tStream>, IStreamsRepository
    {
        public StreamsRepository(dbContext context) : base(context)
        {
        }

        public tStream TryGetById(int Id) => DbSet.FirstOrDefault(t => t.ID == Id);

        public IEnumerable<GetStreamList_Result> GetAll() =>
            Context.GetStreamList().Where(s => !s.IsDeleted);

        public tStream Create(int StreamID, string ProfessionName, string StreamSubject, int SemesterID)
        {
            var stream = new tStream
            {
                StreamID = StreamID,
                CreatedByID = WebAdminId,
                CreatedDate = DateTime.UtcNow,
                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.UtcNow,
                StreamStructure = ProfessionName,
                StreamSubject = StreamSubject,
                SemesterID = SemesterID
            };

            Add(stream);

            return stream;
        }

        public void Remove(tStream stream)
        {
            stream.IsDeleted = true;

            stream.ModifiedDate = DateTime.UtcNow;
            stream.ModifiedByID = WebAdminId;

            Update(stream);
        }

        public IEnumerable<StaticDefaultItem> GetSubjectsDefaults()
        {
            var subjects = Context.tSubjects.ToList();

            return subjects.Select(subject => new StaticDefaultItem(subject.SubjectID, subject.SubjectFullName));
        }


        public IEnumerable<StaticDefaultItem> GetSemestersDefaults()
        {
            var semesters = Context.tSemesters.ToList();

            return semesters.Select(semester => new StaticDefaultItem(semester.SemesterID, semester.SemesterNameRu));
        }

        public IEnumerable<StaticDefaultItem> GetProfessionsDefaults()
        {
            var professions = Context.tProfessions.ToList();

            return professions.Select(profession => new StaticDefaultItem(profession.ProfessionID, profession.ProfessionName));
        }

    }
}
