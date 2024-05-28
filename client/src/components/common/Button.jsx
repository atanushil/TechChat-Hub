import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function Button({ name,onClick }) {
    return (
        <div className='flex items-center'>
            <button onClick={onClick}
                className="cursor-pointer mx-8 my-4 text-white font-bold relative lg:text-[1.2rem] sm:text-[1rem] sm:items-center px-4 h-[3em] flex lg:items-center justify-center gap-1
                text-center bg-gradient-to-r from-violet-500 from-10%
                -sky-500 via-30% to-pink-500 to-90% bg-[length:400%]
                rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%]
                before:content-[''] before:absolute hover:border-1
                before:-top-[5px] before:-bottom-[5px]
                before:-left-[5px] before:-right-[5px] border-2 
                before:bg-gradient-to-r before:from-violet-500
                before:from-10% before:via-sky-500 before:via-30%
                before:to-pink-500 before:bg-[length:400%]
                before:-z-10 before:rounded-[35px] before:hover:blur-xl 
                before:transition-all before:ease-in-out before:duration-[1s]
                before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
            >
                <FcGoogle className="text-4xl" />
                {name}
            </button>

        </div>
    )
}
