using System;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class LoadRepository : RepositoryBase<tDistrib>, ILoadRepository
    {
        public LoadRepository(dbContext context) : base(context)
        {
        }

        public IEnumerable<spGetDistribListSubjectOnly_Result> GetLoadTable() => Context.spGetDistribListSubjectOnly();

        public IEnumerable<tDistrib> GetForTeacher(int teacherId) => 
            DbSet.Where(d => d.TeacherID == teacherId && !d.IsDeleted).ToList();

        public float GetGlobalWorkload() => DbSet.Any() ? DbSet.Sum(wld => wld.Hour) : 0;

        public float? GetTeacherWorkload(int teacherId)
        {
            var list = DbSet.Where(t => t.TeacherID == teacherId && t.IsDeleted == false).ToList();

            return list.Any() ? (float?) list.Sum(wld => wld.Hour) : null;
        }

        public tDistrib GetById(int workloadId) => DbSet.FirstOrDefault(wld => wld.DistribID == workloadId);

        public tDistrib Create(int teacherId, int subjectId, int specId, int semesterId, int activityId, int? groupId, int? subGroupId,
            float hour)
        {
            var distrib = new tDistrib
            {
                TeacherID = teacherId,
                ActivityID = activityId,
                GroupID = groupId,
                Hour = hour,
                SemesterID = semesterId,
                SubjectID = subjectId,
                SubGroupID = subGroupId,
                ProfessionID = specId,

                CreatedByID = WebAdminId,
                CreatedDate = DateTime.Now,

                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.Now
            };

            Add(distrib);

            return distrib;
        }

        public tDistrib Update(tDistrib entity, float hour)
        {
            entity.Hour = hour;

            entity.ModifiedDate = DateTime.UtcNow;
            entity.ModifiedByID = WebAdminId;

            Update(entity);

            return entity;
        }

        public void Remove(tDistrib entity)
        {
            Delete(entity);
        }
    }
}
