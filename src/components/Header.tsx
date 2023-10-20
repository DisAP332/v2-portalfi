import Link from "next/link";

// images
import Image from "next/image";
import ProfileIcon from "../assets/icons/profile.svg";
import JBWLogo from "../assets/images/FullLogo_Transparent.png";
import CompanyHeader from "../assets/images/Name_Logo.png";

// buttons
import {
  DisplayUser,
  HeaderPublish,
  LogoutButton,
} from "./Header_/HeaderButtons";
import { HamToXBtn } from "./Header_/HamIcon";

function Header() {
  return (
    <>
      <div className="header">
        <div className="header_start hidden md:flex">
          <Image src={JBWLogo} alt="JBW Logo" width={60} height={50} />
          <Image
            src={CompanyHeader}
            alt="Company Header"
            className="company-title-logo"
          />
        </div>
        <div className="header_center hidden md:flex">
          <HeaderPublish />
          <LogoutButton />
        </div>
        {/* profile icon gets first spot in grid when in mobile */}
        <div className="items-center pl-10 flex">
          <Image src={ProfileIcon} alt="Profile Icon" width={40} />
          <DisplayUser />
        </div>
        {/* this extra div here is to fill the center in mobile */}
        <div className="md:hidden mr-3" />
        {/* hamburger icon that only shows in mobile */}
        <div className="flex md:hidden">
          <HamToXBtn />
        </div>
      </div>
    </>
  );
}

export default Header;
