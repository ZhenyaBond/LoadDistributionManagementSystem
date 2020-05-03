using Ninject;
using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;

namespace ScheduleManagementSystem.Infrastructure
{
    public class WebApiDependencyResolver : IDependencyResolver
    {
        private readonly IKernel _kernel;

        public WebApiDependencyResolver(IKernel kernel) => _kernel = kernel;

        public IDependencyScope BeginScope() => this;

        public object GetService(Type serviceType) => _kernel.TryGet(serviceType);

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return _kernel.GetAll(serviceType);
            }
            catch (Exception)
            {
                return new List<object>();
            }
        }

        public void Dispose()
        {
        }
    }
}