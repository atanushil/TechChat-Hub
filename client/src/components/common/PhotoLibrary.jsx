import React from "react";
import { IoClose } from "react-icons/io5";

export default function PhotoLibrary({ setImage, hidePhotoLibrary }) {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full z-40 flex justify-center items-center">
      <div className=" h-max w-max  animated-bg  gap-6 rounded-lg p-6 pb-14 mt-20">
        <div
          className=" cursor-pointer flex items-end justify-end"
          onClick={() => hidePhotoLibrary(false)}
        >
          <IoClose className="text-4xl hover:text-[#dc2626]" />
        </div>
        <div className="grid grid-cols-3 justify-center items-center  gap-6 p-10 w-full">
          {images.map((image, index) => (
            <div
              onClick={async () => {
                const avatarImage = document.querySelector(
                  `[data-avatar=avatar-${index}]`
                );

                const response = await fetch(avatarImage?.src);
                const blob = await response.blob();

                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result);
                };

                hidePhotoLibrary(false);

                setImage(image);
              }}
              className="cursor-pointer"
              key={image}
            >
              <img
                src={image}
                alt="avatar"
                className="h-24 w-24"
                data-avatar={`avatar-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
