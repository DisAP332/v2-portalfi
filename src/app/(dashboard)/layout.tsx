import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import TokenChecker from "@/helpers/tokenChecker";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app">
      <Header />
      <div id="dashboard">
        <SideNav />
        <div className="app_container">{children}</div>
      </div>
      <TokenChecker location="dash" />
    </div>
  );
}

export default DashboardLayout;
