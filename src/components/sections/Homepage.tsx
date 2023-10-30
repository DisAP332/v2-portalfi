import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function HomePageOptions() {
  const toggler = useSelector(
    (state: RootState) => state.sectionToggler.home_page_options
  );

  const [homePageSettings, setHomePageSettings] = useState({
    navigation_style: "",
    announcement: {
      style: "",
      text: "",
    },
  });
  return (
    <>
      <div style={toggler.hiderCSS}>
        <div className="homePageOptionsContainer text-slate-500 text-3xl">
          <div>
            <h1>Design</h1>
            <div className="m-3 flex flex-row justify-between">
              <h1>Navigation</h1>
              <div>
                <label htmlFor="sidebar">Sidebar: </label>
                <input
                  type="checkbox"
                  name="sidebar"
                  onClick={() =>
                    setHomePageSettings({
                      ...homePageSettings,
                      navigation_style: "sidebar",
                    })
                  }
                />
                <div className="ml-8 w-80 h-40 bg-slate-400"></div>
              </div>
              <div>
                <label htmlFor="overhead">Overhead: </label>
                <input
                  type="checkbox"
                  name="overhead"
                  onClick={() =>
                    setHomePageSettings({
                      ...homePageSettings,
                      navigation_style: "overhead",
                    })
                  }
                />
                <div className="ml-8 w-80 h-40 bg-slate-400"></div>
              </div>
            </div>
            <div className="m-3 flex flex-row justify-between">
              <h1>Announcements</h1>
              <div>
                <label htmlFor="banner">Banner: </label>
                <input
                  type="checkbox"
                  name="banner"
                  onClick={() =>
                    setHomePageSettings({
                      ...homePageSettings,
                      announcement: {
                        ...homePageSettings.announcement,
                        style: "banner",
                      },
                    })
                  }
                />
                <div className="ml-8 w-80 h-40 bg-slate-400"></div>
              </div>
              <div>
                <label htmlFor="notif">Notif: </label>
                <input
                  type="checkbox"
                  name="notif"
                  onClick={() =>
                    setHomePageSettings({
                      ...homePageSettings,
                      announcement: {
                        ...homePageSettings.announcement,
                        style: "notif",
                      },
                    })
                  }
                />
                <div className="ml-8 w-80 h-40 bg-slate-400"></div>
              </div>
              <div>
                <label htmlFor="none">None: </label>
                <input
                  type="checkbox"
                  name="none"
                  onClick={() =>
                    setHomePageSettings({
                      ...homePageSettings,
                      announcement: {
                        ...homePageSettings.announcement,
                        style: "none",
                      },
                    })
                  }
                />
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <h1>Details:</h1>
            <div>
              <label htmlFor="annnouncementMessage">
                Announcement Message:{" "}
              </label>
              <input
                name="annnouncementMessage"
                onChange={(e) =>
                  setHomePageSettings({
                    ...homePageSettings,
                    announcement: {
                      ...homePageSettings.announcement,
                      text: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
        <button className="bg-slate-500">Save</button>
      </div>
    </>
  );
}
