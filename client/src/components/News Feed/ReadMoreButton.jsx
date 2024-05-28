import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

export default function ReadMoreButton({ Link }) {
    return (
        <div className="flex items-center justify-center z-4">
            <a href={""+Link} className="read-more-btn" target='_blank' rel="noopener noreferrer">
                <div className="relative inline-flex items-center justify-start py-2 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 glass-effect border-2 border-blue-300 bg-[#f5f5f5] dark:hover:text-gray-200 dark:shadow-none group cursor-pointer">
                    {/* <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span> */}
                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <BsThreeDots />
                    </span>
                    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-green-400">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                    </span>
                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-[#737373] dark:group-hover:text-gray-700">
                        Read
                    </span>
                </div>
            </a>
        </div>
    );
}
