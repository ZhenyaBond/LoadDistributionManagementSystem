using Ninject.Modules;
using ScheduleManagementSystem.Helpers.Encryptors;
using ScheduleManagementSystem.Helpers.Encryptors.Interfaces;

namespace ScheduleManagementSystem.Helpers
{
    public class HelpersModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ISha256Encryptor>().To<Sha256Encryptor>();
        }
    }
}
