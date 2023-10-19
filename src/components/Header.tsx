import Link from "next/link";

// images
import Image from "next/image";
import ProfileIcon from "../assets/icons/profile.svg";
import JBWLogo from "../assets/images/FullLogo_Transparent.png";
import CompanyHeader from "../assets/images/Name_Logo.png";

import { DisplayUser, HeaderPublish } from "./Header/HeaderButtons";
import { HamToXBtn } from "./Header/HamIcon";

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
          <Link href="/">
            <button className="bg-slate-800 h-5/6 pl-6 pr-6 rounded-2xl">
              Log Out
            </button>
          </Link>
        </div>
        <div className="items-center pl-10 flex">
          <Image src={ProfileIcon} alt="Profile Icon" width={40} />
          <DisplayUser />
        </div>
        <div className="md:hidden mr-3" />
        <div className="flex md:hidden">
          <HamToXBtn />
        </div>
      </div>
    </>
  );
}

export default Header;
