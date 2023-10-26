"use client";

import CartProvider from "@/redux/CartProvider";
import SettingsDD, { ContentDD, ProfileDD } from "./SideNav/NavButtons";

function SideNav() {
  return (
    <div className="sideNavContainer hidden md:grid">
      <div className="flex flex-col gap-y-3">
        <CartProvider>
          <ProfileDD />
          <ContentDD />
          <SettingsDD />
        </CartProvider>
      </div>
      <div className="gap-y-3 flex flex-col place-items-center border-t-2 border-slate-500 pt-10"></div>
    </div>
  );
}

export default SideNav;
