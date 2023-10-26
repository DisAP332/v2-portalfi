import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import TokenChecker from "@/helpers/tokenChecker";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app">
      <Header />
      <div id="dashboard" className="hidden md:flex">
        <SideNav />
        <div className="app_container">{children}</div>
      </div>
      {/* <TokenChecker location="dash" token={false} /> */}
    </div>
  );
}

export default DashboardLayout;
