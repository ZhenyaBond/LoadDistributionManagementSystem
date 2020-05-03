using System;
using System.Collections.Generic;
using System.Linq;
using ScheduleManagementSystem.DAL.Models;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class SubjectActivitiesRepository : RepositoryBase<tSubjectActivity>, ISubjectActivitiesRepository
    {
        public SubjectActivitiesRepository(dbContext context) : base(context)
        {
        }

        public tSubjectActivity TryGetById(int subjactId) => DbSet.FirstOrDefault(t => t.SubjActID == subjactId);

        public IEnumerable<GetSubjectActivityList_Result> GetAll() => 
            Context.GetSubjectActivityList().Where(sa => !sa.IsDeleted);

        public tSubjectActivity Create(int subjectId, int activityId, int? semesterId, int professionId, int? hour)
        {
            var subjectActivity = new tSubjectActivity
            {
                SubjectID = subjectId,
                CreatedByID = WebAdminId,
                CreatedDate = DateTime.UtcNow,
                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.UtcNow,
                ActivityID = activityId,
                SemesterID = semesterId,
                ProfessionID = professionId,
                Hour = hour
            };

            Add(subjectActivity);

            return subjectActivity;
        }

        public tSubjectActivity Update(tSubjectActivity subjectActivity, int subjectId, int activityId, int? semesterId, int professionId, int? hour)
        {
            subjectActivity.SubjectID = subjectId;
            subjectActivity.ActivityID = activityId;
            subjectActivity.SemesterID = semesterId;
            subjectActivity.ProfessionID = professionId;
            subjectActivity.Hour = hour;

            subjectActivity.ModifiedDate = DateTime.UtcNow;
            subjectActivity.ModifiedByID = WebAdminId;

            Update(subjectActivity);

            return subjectActivity;
        }

        public void Remove(tSubjectActivity subjectActivity)
        {
            subjectActivity.IsDeleted = true;

            subjectActivity.ModifiedDate = DateTime.UtcNow;
            subjectActivity.ModifiedByID = WebAdminId;

            Update(subjectActivity);
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

        public IEnumerable<StaticDefaultItem> GetActivitiesDefaults()
        {
            var activities = Context.tActivities.ToList();

            return activities.Select(activity => new StaticDefaultItem(activity.ActivityID, activity.ActivityNameRu));
        }

        public IEnumerable<StaticDefaultItem> GetProfessionsDefaults()
        {
            var professions = Context.tProfessions.ToList();

            return professions.Select(profession => new StaticDefaultItem(profession.ProfessionID, profession.ProfessionName));
        }

    }
}
