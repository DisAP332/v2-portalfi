"use client";

//images
import Image from "next/image";
import ContentIcon from "../../assets/icons/content.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

//redux
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { showorHiderMenu } from "@/redux/slices/menuTogglerSlice";
import Link from "next/link";

export function ContentDD() {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.menuToggler.content);

  return (
    <div className="sidenav_toggleable">
      <button
        onClick={() => dispatch(showorHiderMenu("content"))}
        style={content.toggledcss}
      >
        <div className="border-r-2 border-slate-500 mr-5 pr-2">
          <Image src={ContentIcon} alt="settings icon" width={22} />
        </div>
        Content
      </button>
      <div className="toggleable_dropdown" style={content.dropdowncss}>
        <Link href={"/dash/events"}>Events</Link>

        <Link href={"/dash/food"}>Food</Link>

        <Link href={"/dash/drinks"}>Drinks</Link>

        <Link style={{ borderTop: "1px solid white" }} href={"/dash"}>
          HomePage
        </Link>
      </div>
    </div>
  );
}

export function ProfileDD() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.menuToggler.profile);

  return (
    <div className="sidenav_toggleable">
      {/* ---- begin profile menu ------ */}
      <button
        onClick={() => dispatch(showorHiderMenu("profile"))}
        style={profile.toggledcss}
      >
        <div className="flex">
          <div className="border-r-2 border-slate-500 mr-5 pr-2">
            <Image src={ProfileIcon} alt="settings icon" />
          </div>
          Profile
        </div>
      </button>
      <div className="toggleable_dropdown" style={profile.dropdowncss}>
        <button>Settings</button>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default function SettingsDD() {
  const dispatch = useDispatch();
  const settings = useSelector(
    (state: RootState) => state.menuToggler.settings
  );
  return (
    <div className="sidenav_toggleable">
      <button
        onClick={() => dispatch(showorHiderMenu("settings"))}
        style={settings.toggledcss}
      >
        <div className="border-r-2 border-slate-500 mr-5 pr-2">
          <Image src={SettingsIcon} alt="settings icon" />
        </div>
        Settings
      </button>
      <div className="toggleable_dropdown" style={settings.dropdowncss}>
        <button>Settings</button>
      </div>
    </div>
  );
}
