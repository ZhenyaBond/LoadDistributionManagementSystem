using System.Collections.Generic;
using System.Threading.Tasks;
using ScheduleManagementSystem.DAL.Models;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface ITeachersRepository : IRepository<tTeacher>
    {
        tTeacher Create(string fullName, int? degreeId, int normId, int positionId, int? titleId);
        tTeacher Update(tTeacher teacher, string fullName, int? degreeId, int normId, int positionId, int? titleId);
        tTeacher TryGetById(int teacherId);
        string GetTeacherName(int teacherId);
        IEnumerable<GetTeacherList_Result> GetAll();
        int? GetPlannedWorkload(int teacherId);
        Task CreateHistory();
        IEnumerable<StaticDefaultItem> GetNormasDefaults();
        IEnumerable<StaticDefaultItem> GetDegreesDefaults();
        IEnumerable<StaticDefaultItem> GetTitlesDefaults();
        IEnumerable<StaticDefaultItem> GetPositionsDefaults();

        void Remove(tTeacher teacher);
    }
}
