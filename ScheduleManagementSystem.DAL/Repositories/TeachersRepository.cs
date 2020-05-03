using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleManagementSystem.DAL.Models;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class TeachersRepository : RepositoryBase<tTeacher>, ITeachersRepository
    {
        public TeachersRepository(dbContext context) : base(context)
        {
        }

        public tTeacher TryGetById(int teacherId) => DbSet.FirstOrDefault(t => t.TeacherID == teacherId);

        public string GetTeacherName(int teacherId)
        {
            var teacher = TryGetById(teacherId);

            return teacher.TeacherFullName ?? string.Empty;
        }

        public async Task CreateHistory() => Context.CreateHistory();

        public IEnumerable<GetTeacherList_Result> GetAll() => 
            Context.GetTeacherList().Where(t => !t.IsDeleted);

        public int? GetPlannedWorkload(int teacherId)
        {
            var teachers = GetAll().ToList();

            return teachers.First(t => t.TeacherID == teacherId).Hour;
        }

        public tTeacher Create(string fullName,  int? degreeId, int normId, int positionId, int? titleId)
        {
            var teacher = new tTeacher
            {
                TeacherFullName = fullName,
                CreatedByID = WebAdminId,
                CreatedDate = DateTime.UtcNow,
                ModifiedByID = WebAdminId,
                ModifiedDate = DateTime.UtcNow,
                DegreeID = degreeId,
                TitleID = titleId,
                NormID = normId,
                PositionID = positionId,
                PulpitID = IsitPulpitId
            };

            Add(teacher);

            return teacher;
        }

        public tTeacher Update(tTeacher teacher, string fullName, int? degreeId, int normId, int positionId, int? titleId)
        {
            teacher.TeacherFullName = fullName;
            teacher.DegreeID = degreeId;
            teacher.NormID = normId;
            teacher.PositionID = positionId;
            teacher.TitleID = titleId;

            teacher.ModifiedDate = DateTime.UtcNow;
            teacher.ModifiedByID = WebAdminId;

            Update(teacher);

            return teacher;
        }

        public void Remove(tTeacher teacher)
        {
            teacher.IsDeleted = true;

            teacher.ModifiedDate = DateTime.UtcNow;
            teacher.ModifiedByID = WebAdminId;

            Update(teacher);
        }

        public IEnumerable<StaticDefaultItem> GetNormasDefaults()
        {
            var normas = Context.tNorms.ToList();

            return normas.Select(norma => new StaticDefaultItem(norma.NormID, norma.NormName));
        }

        public IEnumerable<StaticDefaultItem> GetDegreesDefaults()
        {
            var degrees = Context.tDegrees.ToList();

            return degrees.Select(n => new StaticDefaultItem(n.DegreeID, n.DegreeName));
        }

        public IEnumerable<StaticDefaultItem> GetTitlesDefaults()
        {
            var titles = Context.tTitles.ToList();

            return titles.Select(u => new StaticDefaultItem(u.TitleID, u.TitleName));
        }

        public IEnumerable<StaticDefaultItem> GetPositionsDefaults()
        {
            var titles = Context.tPositions.ToList();

            return titles.Select(t => new StaticDefaultItem(t.PositionID, t.PositionName));
        }
    }
}
