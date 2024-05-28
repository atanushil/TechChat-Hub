import React, { useEffect, useRef, useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import { IoIosPersonAdd } from "react-icons/io";
import Profile from "../common/Profile";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContextMenu from "../common/ContextMenu";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import Avatar from "../common/Avatar";
import { MdOutlineGroups, MdQrCodeScanner } from "react-icons/md";
import { PiBroadcastThin } from "react-icons/pi";
import { FaRegNewspaper } from "react-icons/fa";
import NewsFeed from "../News Feed/NewsFeed";

export default function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const [showNewsFeed, setShowNewsFeed] = useState(false);

  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    {
      name: "New Group",
      icon: <MdOutlineGroups className="text-[24px]" />,
      callBack: async () => {
        setIsContextMenuVisible(false);
        router.push("/add-group");
      }
    },
    {
      name: "New broadcast",
      icon: <PiBroadcastThin className="text-[24px]" />,
      callBack: async () => {
        setIsContextMenuVisible(false);
        router.push("/broadcast");
      },
    },
    {
      name: "Payment",
      icon: <MdQrCodeScanner className="text-[24px]" />,
      callBack: async () => {
        setIsContextMenuVisible(false);
        router.push("/add-friend");
      },
    },
    {
      name: "Logout",
      icon: <IoIosLogOut className="text-[24px]" />,
      callBack: async () => {
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const handleTechNews = () => {
    setShowNewsFeed(true);
  }

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  const toggleProfile = () => {
    setShowProfile(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const closeNewsFeed = () => {
    setShowNewsFeed(false);
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center caret-transparent">
      <div className="cursor-pointer flex justify-center items-center text-white gap-3" onClick={toggleProfile}>
        <Avatar type="sm" image={userInfo?.profileImage} />
        <p className="lg:text-2xl md:text-xl caret-transparent md:text-[10px]">{userInfo?.name}</p>
      </div>
      <div className="flex lg:gap-6 md:gap-[12px] ">
        <>
          <FaRegNewspaper
            className="text-panel-header-icon cursor-pointer lg:text-2xl md:text-xl  hover:text-[#eab308]"
            title="Tech News"
            onClick={handleTechNews}
          />
          {showNewsFeed && (
            <div className="absolute top-0 left-0 z-10">
              <NewsFeed onClose={closeNewsFeed} />
            </div>
          )}
        </>
        <IoIosPersonAdd
          className="text-panel-header-icon cursor-pointer lg:text-2xl md:text-xl hover:text-[#1d4ed8]"
          title="Add User"
          onClick={handleAllContactsPage}
        />
        <>
          <CiMenuBurger
            className="text-panel-header-icon cursor-pointer lg:text-2xl md:text-xl  hover:text-[#1d4ed8]"
            title="Menu"
            onClick={(e) => showContextMenu(e)}
            id="context-opener"
          />
          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              cordinates={contextMenuCordinates}
              contextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}
        </>
      </div>
      {showProfile && (
        <Profile
          ref={profileRef}
          img={userInfo?.profileImage}
          name={userInfo?.name}
          about={userInfo?.status}
          email={userInfo?.email}
          closeProfile={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}
