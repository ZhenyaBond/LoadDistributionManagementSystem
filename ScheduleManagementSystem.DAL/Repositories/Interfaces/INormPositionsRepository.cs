using System.Collections.Generic;
using ScheduleManagementSystem.DAL.Models;

namespace ScheduleManagementSystem.DAL.Repositories.Interfaces
{
    public interface INormPositionsRepository : IRepository<tNormPosition>
    {
        tNormPosition Update(tNormPosition normPosition, int Hour);
        IEnumerable<GetNormPositionList_Result> GetAll();
        tNormPosition TryGetById(int normpositionId);
    }
}
