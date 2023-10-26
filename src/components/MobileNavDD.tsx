"use client";

import { useSelector } from "react-redux";
import SettingsDD, { ContentDD, ProfileDD } from "./SideNav/NavButtons";
import CartProvider from "@/redux/CartProvider";
import { RootState } from "@/redux/store";

function MobileNavDD() {
  const mobileNav = useSelector(
    (state: RootState) => state.menuToggler.mobileDD
  );
  return (
    <div className="mobileDD" style={mobileNav.dropdowncss}>
      <ProfileDD />
      <ContentDD />
      <SettingsDD />
    </div>
  );
}

export default MobileNavDD;
