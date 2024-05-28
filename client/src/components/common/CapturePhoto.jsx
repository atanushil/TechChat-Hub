import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function CapturePhoto({ setImage, hide }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL("image/jpeg"));
      hide(false);
    }
  };

  return (
    <div className="  md:w-[60vw] lg:w-[30vw] xl:w-[27.8vw] h-[83.2vh] absolute left-0 top-20 bg-gray-900 flex-col gap-3 z-40 rounded-lg p-2 flex items-center justify-between">
      <div className="flex flex-col gap- w-full">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={() => hide(false)}
        >
          <IoClose className="h-10 w-10 text-white" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <video
            id="video"
            className="w-full  h-[50vh] rounded-md"
            autoPlay
            ref={videoRef}
          >
          </video>
          <button
            className="h-[100px] w-[100px]  bg-[] rounded-full cursor-pointer border-8 border-teal-400 my-4"
            onClick={captureImage}
          ></button>
        </div>
      </div>
    </div>
  );
}
