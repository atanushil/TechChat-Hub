import React, { forwardRef } from 'react';
import { CiUser, CiCamera, CiEdit } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { MdVerified } from "react-icons/md";
import { AiTwotoneCloseCircle } from "react-icons/ai";

const Profile = forwardRef(({ img, name, about, email, closeProfile }, ref) => {
  const handleProfilePicture = () => {
    alert("Profile pic update");
  };
  const handleNameChange = () => {
    alert("Name update");
  };

  const handleAboutChange = () => {
    alert("About update");
  };

  return (
    <div ref={ref} className='w-[28vw] glass-effect h-[90vh] flex p-8 flex-col justify-center items-center caret-transparent rounded-lg left-[1.2rem] absolute top-[4rem]'>
      <AiTwotoneCloseCircle
        className="cursor-pointer text-3xl absolute right-3 top-3"
        title="Close Profile"
        onClick={closeProfile}
        id="close-profile"
      />
    
        <div className="profileImage w-[50%] h-[30%] items-center relative justify-center rounded-md px-2">
          <img src={img} alt={img} className='w-full relative h-full glass-effect rounded-md object-contain' />
        <CiCamera className='text-xl absolute bottom-0 right-0  bg-[#53999f] hover:bg-[#bef264] rounded-sm cursor-pointer' onClick={handleProfilePicture} />
        </div>
      <div className="name flex flex-col mt-6 relative w-[100%] py-2">
        <label htmlFor="name" className='flex items-center text-icon-lighter '>
          <CiUser />
          <span className='px-2 text-icon-lighter'>Name</span>
        </label>
        <p className="flex items-center w-full bg-indigo-50 rounded-md">
          <input type="text" name="name" value={name} className=' w-[90%] rounded-md caret-black text-gray-600 bg-indigo-50 px-2 outline-none border-none bg-transparent' />
          <CiEdit className='text-xl cursor-pointer text-gray-600 ml-2' onClick={handleNameChange} />
        </p>
        <span className='flex text-[14px] text-[#8397b3] leading-5 '>This is not your username or pin. This name will be visible to your TechChat contacts.</span>
      </div>
      <div className="about flex flex-col w-[100%] py-2">
        <label htmlFor="about" className='flex items-center w-[40%]'>
          <FcAbout />
          <span className='px-2 text-icon-lighter'>About</span>
        </label>
        <p className='flex items-center bg-indigo-50 w-full rounded-md'>
          <input type='text' value={about} name="about" className=' w-[90%] caret-black outline-none text-gray-600 border-none bg-transparent' />
          <CiEdit className='text-xl cursor-pointer text-gray-600 ml-2' onClick={handleAboutChange} />
        </p>
      </div>
      <div className="email flex flex-col w-[100%] py-4 rounded-md ">
        <label htmlFor="email" className='flex items-center text-icon-lighter'>
          <TfiEmail />
          <span className='px-2 text-icon-lighter'>Email</span>
        </label>
        <p className='flex items-center justify-between bg-indigo-50 rounded-md text-gray-600'>
          <span className='w-[90%] text-gray-600 px-2'>{email ? email : "\u00A0"}</span>
          <MdVerified className='text-xl text-[#0ea5e9] mr-2' title='Verified' />
        </p>
      </div>
    </div>
  );
});

export default Profile;
