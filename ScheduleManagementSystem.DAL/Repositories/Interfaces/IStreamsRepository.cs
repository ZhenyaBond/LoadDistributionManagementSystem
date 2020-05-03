using System.Collections.Generic;
using ScheduleManagementSystem.DAL.Models;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface IStreamsRepository : IRepository<tStream>
    {
        IEnumerable<GetStreamList_Result> GetAll();
        tStream TryGetById(int Id);
        tStream Create(int StreamID, string ProfessionName, string StreamSubject, int SemesterID);
        void Remove(tStream stream);

        IEnumerable<StaticDefaultItem> GetSubjectsDefaults();
        IEnumerable<StaticDefaultItem> GetSemestersDefaults();
        IEnumerable<StaticDefaultItem> GetProfessionsDefaults();
    }
}
