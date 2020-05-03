using Ninject;
using ScheduleManagementSystem.DAL;
using ScheduleManagementSystem.Helpers;
using System;
using System.Reflection;

namespace ScheduleManagementSystem.Infrastructure
{
    public static class NinjectConfig
    {
        public static Lazy<IKernel> CreateKernel = new Lazy<IKernel>(() =>
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());

            RegisterServices(kernel);

            return kernel;
        });

        private static void RegisterServices(IKernel kernel)
        {
            kernel.Load<DalModule>();
            kernel.Load<HelpersModule>();
        }
    }
}