import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

// proxy.ts already redirects here if the session cookie is missing or
// invalid (FE-02) - this layout no longer needs its own client-side check.
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app">
      <Header />
      <div id="dashboard" className="hidden md:grid">
        <SideNav />
        <div className="app_container">{children}</div>
      </div>
      <div className="block sm:hidden app_container">{children}</div>
    </div>
  );
}

export default DashboardLayout;
