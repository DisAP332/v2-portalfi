import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app">
      <Header />
      <div id="dashboard">
        <SideNav />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
