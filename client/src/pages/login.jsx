import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { firebaseAuth } from "../utils/FirebaseConfig";

import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import Button from "@/components/common/Button";
import NavBar from "@/components/common/NavBar";

export default function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  useEffect(() => {
    console.log({ userInfo });
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser, router]);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, {
          email,
        });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "Available",
            },
          });
          router.push("/onboarding");
        } else {
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.data.id,
              email: data.data.email,
              name: data.data.name,
              profileImage: data.data.profilePicture,
              status: data.data.about,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const Options = [
    
    {
      name: "Privacy & policy",
    },
    {
      name: "Desktop app",
    },
    {
      name: "Team Member",
    },
  ];
  return (
    <>
      <div className="overflow-hidden animated-bg h-[100vh] caret-transparent">
        <NavBar title={"TechChat-Hub"} options={Options} />
        <section className="content flex justify-between h-[80vh] w-[100vw]">
          <div className="part-1 w-[40%] h-[100%] ml-8 flex flex-col  justify-center">
            <div className="mt-8">
              <p className="flex flex-col px-8 text-[#cbd5e1] leading-tight">
                <span className="lg:text-[5rem] sm:text-[3rem] font-semibold  animated-text-first">Hang out</span>
                <span className="lg:text-[5rem] sm:text-[3.4rem] font-semibold flex-auto animated-text-second">anytime,</span>
                <span className="lg:text-[5rem] sm:text-[3.4rem] font-semibold  animated-text-third">anywhere</span>
              </p>
              <p className="px-8 py-4 text-xl lg:text-[1.4rem] sm:text-[1rem] text-[#f3f3f3]">
                TechChat-Hub makes it easy and fun to stay close to your favourite
                people.
              </p>
            </div>
            <Button className="" onClick={login} name={"Sign in with Google"} />
          </div>
          <div className="part-2 flex items-center relative w-[50%]">
            <div className="image flex flex-col relative left-0 top-0 z-40">
              <div className="flex">
                <img src="/smile-men-video-call.jpg" alt="" className="w-[13vw] h-[15vh] mx-2 my-1" />
                <img src="/online-party-meeting-friends.jpg" alt="" className="w-[13vw] h-[20vh] mx-2 my-1" />
              </div>
              <div className="flex">
                <img src="/friends-family-making-videocall-catching-up.jpg" alt="" className="w-[13vw] h-[20vh] mx-2 my-1 -mt-6" />
                <img src="/doctors.jpg" alt="" className="w-[13vw] h-[16vh] mx-2 my-1" />
              </div>
            </div>
            <img src="https://i.ibb.co/L6L8KkL/giphy.gif" className="flex absolute -right-16 z-30 mix-blend-screen flex-end w-[32vw] h-[70vh]" alt="giphy" border="0" />
          </div>
        </section>
      </div>
    </>
  );
}
