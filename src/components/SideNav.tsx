import SettingsDD, { ContentDD, ProfileDD } from "./SideNav/SideNavButtons";

function SideNav() {
  return (
    <div className="sideNavContainer hidden md:grid">
      <div className="flex flex-col gap-y-3">
        <ProfileDD />
        <ContentDD />
        <SettingsDD />
      </div>
      <div className="gap-y-3 flex flex-col place-items-center border-t-2 border-slate-500 pt-10"></div>
    </div>
  );
}

export default SideNav;
