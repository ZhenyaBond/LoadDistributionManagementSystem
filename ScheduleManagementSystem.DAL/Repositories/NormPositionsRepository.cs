using ScheduleManagementSystem.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ScheduleManagementSystem.DAL.Repositories
{
    public class NormPositionsRepository : RepositoryBase<tNormPosition>, INormPositionsRepository
    {
        public NormPositionsRepository(dbContext context) : base(context)
        {
        }

        public tNormPosition TryGetById(int normpositionId) => 
            DbSet.FirstOrDefault(t => t.NormPositionID == normpositionId);

        public IEnumerable<GetNormPositionList_Result> GetAll() => Context.GetNormPositionList();


        public tNormPosition Update(tNormPosition normPosition, int Hour)
        {
            normPosition.Hour = Hour;

            normPosition.ModifiedDate = DateTime.UtcNow;
            normPosition.ModifiedByID = WebAdminId;

            Update(normPosition);

            return normPosition;
        }

    }
}
