using Ninject.Modules;
using ScheduleManagementSystem.DAL.Repositories;
using ScheduleManagementSystem.DAL.Repositories.Interfaces;

namespace ScheduleManagementSystem.DAL
{
    public class DalModule : NinjectModule
    {
        public override void Load()
        {
            Bind<dbContext>().ToSelf();
            Bind<ITeachersRepository>().To<TeachersRepository>();
            Bind<IUsersRepository>().To<UsersRepository>();
            Bind<ISubjectsRepository>().To<SubjectsRepository>();
            Bind<ILoadRepository>().To<LoadRepository>();
            Bind<INormPositionsRepository>().To<NormPositionsRepository>();
            Bind<ISubjectActivitiesRepository>().To<SubjectActivitiesRepository>();
            Bind<IStreamsRepository>().To<StreamsRepository>();
            Bind<ISubjectTeachersRepository>().To<SubjectTeachersRepository>();
            Bind<ISubjectProfessionsRepository>().To<SubjectProfessionsRepository>();
            Bind<IGroupsRepository>().To<GroupsRepository>();
        }
    }
}
