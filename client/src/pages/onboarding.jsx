import React, { useEffect, useState } from "react";
import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import axios from "axios";
import { onBoardUserRoute } from "../utils/ApiRoutes";

import Resizer from "react-image-file-resizer";

import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import { CiCamera, CiEdit, CiMenuBurger, CiUser } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { MdCopyAll, MdVerified } from "react-icons/md";
import { FaCopy, FaRegCopy, FaRegNewspaper } from "react-icons/fa";
import { Main } from "next/document";
import ChatListHeader from "@/components/Chatlist/ChatListHeader";
import SearchBar from "@/components/Chatlist/SearchBar";
import ChatLIstItem from "@/components/Chatlist/ChatLIstItem";
import Login from "./login";
import { IoIosPersonAdd } from "react-icons/io";
import { BiFilter, BiSearchAlt2 } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";

export default function OnBoarding() {
  const router = useRouter();

  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [image, setImage] = useState("/default_avatar.png");
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("Connecting Minds, Innovating Futures: Your Hub for Tech Messaging and News Updates");

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push("/login");
    else if (!newUser && userInfo?.email) router.push("/");
  }, [newUser, userInfo, router]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const onBoardUser = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      try {
        const base64Response = await fetch(`${image}`);
        const blob = await base64Response.blob();
        setImage(await resizeFile(blob));
        const { data } = await axios.post(onBoardUserRoute, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage: image,
              status: about,
            },
          });

          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      // Toast Notification
      return false;
    }
    return true;
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(userInfo?.email);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500); // Reset copied state after 1.5 seconds
  };



  return (
    <>
      <div className="animated-bg w-full h-[100vh] flex items-center ">
        <div className='w-[28vw] glass-effect h-[90vh] flex p-4 flex-col items-center caret-transparent rounded-lg ml-4'>
          <div className="flex items-center self-start">
            <Image
              src="/favicon.png"
              alt="whatsapp-gif"
              height={100}
              width={100}
            />
            <p className="text-3xl animated-text-first">TechChat-Hub</p>
          </div>
          <div className="flex flex-col w-full items-center justify-between mt-5 gap-4">
            <div className="bg-white rounded-md  ">
              <Avatar type="xl" image={image} setImage={setImage} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Input name={<div className="flex gap-2 items-center"><img src="/male-user.gif" alt="" className="rounded-full h-6" /> Display Name</div>} state={name} setState={setName} label />
              <Input name={<div className="flex gap-2 items-center"><img src="/about-icon.gif" className="h-6 rounded-full" />About</div>} state={about} setState={setAbout} label />
            </div>
            <div className="flex  flex-col items-center gap-2 self-start w-full">
              <p className="flex items-center self-start gap-2 text-[#7AE3C3] font-bold">
                <img src="/gmail-unscreen.gif" className="h-6" />
                Email
              </p>
              <p className="text-white py-2 px-4 flex-grow bg-[#2A3942] w-full flex justify-between items-center rounded-lg">
                {userInfo?.email}
                <button
                  className="flex gap-2"
                  onClick={handleCopyClick}
                >
                  <MdVerified className="text-[18px] text-sky-500" />
                  {isCopied ? <FaCopy /> : <FaRegCopy />}
                </button>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button className="glass-effect border-2 border-t-dropdown-background-hover hover:bg-green-500  p-3 px-6 rounded-lg" onClick={onBoardUser}>
                Create profile
              </button>
            </div>
          </div>
        </div>
        <div className='w-[70vw] animated-bg h-[90vh] flex flex-grow items-center caret-transparent rounded-lg mx-4'>
          <div className="flex items-center flex-grow bg-search-input-container-background rounded-s-lg  flex-col w-[35%] h-full  border-r">
            <div className="nav h-[10%] flex  bg-input-background rounded-lg items-center w-full justify-between px-4">
              <div className="flex items-center gap-1 flex-grow">
                <img src="/default_avatar.png" alt="" className="lg:w-12 lg:h-12 md:w-8 md:h-8 rounded-full" />
                <p className="lg:text-4xl md:text-2xl text-white  capitalize">username</p>
              </div>
              <div className="icon flex text-[16px] gap-2">
                <FaRegNewspaper className="text-panel-header-icon cursor-pointer md:hidden  lg:block lg:text-2xl md:text-xl  hover:text-[#eab308]" />
                <IoIosPersonAdd className="text-panel-header-icon cursor-pointer md:hidden lg:block lg:text-2xl md:text-xl hover:text-[#1d4ed8]" />
                <CiMenuBurger className="text-panel-header-icon cursor-pointer lg:text-2xl md:text-xl  hover:text-[#1d4ed8]" />
              </div>
            </div>
            <div className="searchBar w-full">
              <div className="bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
                <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
                  <div>
                    <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
                  </div>
                  <div className="">
                    <input type="text" placeholder="Search or start new chat" className="bg-transparent text-sm focus:outline-none text-white w-full" />
                  </div>
                </div>
                <div className="pr-5 pl-3">
                  <BiFilter className="text-panel-header-icon cursor-pointer text-xl " />
                </div>
              </div>
            </div>
            <div className="users w-full ">
              <ul className="w-full flex flex-shrink flex-grow flex-col text-white gap-2">
                <li className="w-full px-4 cursor-pointer hover:bg-background-default-hover border-b  border-conversation-border">
                  <div className="profile flex items-center gap-2 w-full">
                    <div className="">
                      <img src="/default_avatar.png" className="h-12 w-12 rounded-full" alt="" />
                    </div>
                    <div className=" ">
                      <div className="name lg:text-xl md:text-[16px]">UserName</div>
                      <div className="flex gap-1 items-center lg:text-xl md:text-[12px]">
                        <BsCheckAll className="text-xl " />
                        <p>Message</p>
                      </div>
                    </div>
                    <div className="time lg:ml-24 md:ml-4 mr-2">{"Today"}</div>
                  </div>
                </li>
                <li className="w-full px-4 cursor-pointer hover:bg-background-default-hover border-b border-conversation-border">
                  <div className="profile flex items-center gap-2 w-full">
                    <div className="">
                      <img src="/default_avatar.png" className="h-12 w-12 rounded-full" alt="" />
                    </div>
                    <div className=" border-b border-conversation-border">
                      <div className="name lg:text-xl md:text-[16px]">UserName</div>
                      <div className="flex gap-1 items-center lg:text-xl md:text-[12px]">
                        <BsCheckAll className="text-xl" />
                        <p>Message</p>
                      </div>
                    </div>
                    <div className="time lg:ml-24 md:ml-4 mr-2">{"Today"}</div>
                  </div>
                </li>
                <li className="w-full px-4 cursor-pointer hover:bg-background-default-hover border-b border-conversation-border">
                  <div className="profile flex items-center gap-2 w-full">
                    <div className="">
                      <img src="/default_avatar.png" className="h-12 w-12 rounded-full" alt="" />
                    </div>
                    <div className="border-b border-conversation-border ">
                      <div className="name lg:text-xl md:text-[16px]">UserName</div>
                      <div className="flex gap-1 items-center lg:text-xl md:text-[12px]">
                        <BsCheckAll className="text-xl text-sky-500" />
                        <p>Message</p>
                      </div>
                    </div>
                    <div className="time lg:ml-24 md:ml-1 md:mr-0 lg:mr-2">{"Yesterday"}</div>
                  </div>
                </li>
                <li className="w-full px-4 cursor-pointer hover:bg-background-default-hover border-b border-conversation-border">
                  <div className="profile flex items-center gap-2 w-full">
                    <div className="">
                      <img src="/default_avatar.png" className="h-12 w-12 rounded-full" alt="" />
                    </div>
                    <div className=" border-b border-conversation-border">
                      <div className="name lg:text-xl md:text-[16px]">UserName</div>
                      <div className="flex gap-1 items-center lg:text-xl md:text-[12px]">
                        <BsCheckAll className="text-xl text-sky-500" />
                        <p>Message</p>
                      </div>
                    </div>
                    <div className="time lg:ml-24 md:ml-1 md:mr-0 lg:mr-2">{"Yesterday"}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center w-[70%] h-full border-b-3 border-green-600 ">
            <img src="/no-chat.gif" alt="whatsapp-gif" height={300} width={300} className="mix-blend-multiply caret-transparent" />
            <p className="text-4xl animated-text uppercase font-sans">No Chat Selected.</p>
            <p className="text-xl text-yellow-50">Selected one from the add icon and start Chatting</p>
          </div>
        </div>

      </div>
    </>
  );
}
