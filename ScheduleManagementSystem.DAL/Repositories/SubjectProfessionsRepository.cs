using System;
using System.Collections.Generic;
using System.Linq;
using ScheduleManagementSystem.DAL.Models;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class SubjectProfessionsRepository : RepositoryBase<tSubjectProfession>, ISubjectProfessionsRepository
    {
        public SubjectProfessionsRepository(dbContext context) : base(context)
        {
        }

        public tSubjectProfession TryGetById(int Id) => 
            DbSet.FirstOrDefault(t => t.SubjectProfessionID == Id);

        public IEnumerable<GetSubjectProfessionList_Result> GetAll() =>
            Context.GetSubjectProfessionList().Where(sp => !sp.IsDeleted);

        public tSubjectProfession Create(int SubjectID, int ProfessionID)
        {
            var subjectprofession = new tSubjectProfession
            {
                CreatedByID = WebAdminId,
                CreatedDate = DateTime.UtcNow,
                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.UtcNow,
                SubjectID = SubjectID,
                ProfessionID = ProfessionID
            };

            Add(subjectprofession);

            return subjectprofession;
        }

        public void Remove(tSubjectProfession subjectprofession)
        {
            subjectprofession.IsDeleted = true;

            subjectprofession.ModifiedDate = DateTime.UtcNow;
            subjectprofession.ModifiedByID = WebAdminId;

            Update(subjectprofession);
        }

        public IEnumerable<StaticDefaultItem> GetSubjectsDefaults()
        {
            var subjects = Context.tSubjects.ToList();

            return subjects.Select(subject => new StaticDefaultItem(subject.SubjectID, subject.SubjectFullName));
        }


        public IEnumerable<StaticDefaultItem> GetProfessionsDefaults()
        {
            var proffesions = Context.tProfessions.ToList();

            return proffesions.Select(proffesion => new StaticDefaultItem(proffesion.ProfessionID, proffesion.ProfessionName));
        }

    }
}
