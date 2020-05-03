using System.Web.Optimization;

namespace ScheduleManagementSystem
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/tools").Include(
                "~/Content/preloader.css",
                "~/Content/popup.css",
                "~/Content/contextmenu.css",
                "~/Content/catcher.css"));

            bundles.Add(new StyleBundle("~/Content/components").Include(
                "~/Content/header.css",
                "~/Content/table.css",
                "~/Content/main.css",
                "~/Content/notfound.css"));
        }
    }
}
