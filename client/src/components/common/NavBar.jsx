import React from 'react';

export default function NavBar({ title, options }) {
    return (
        <div className='flex items-center px-4'>
            <div className='flex items-center '>
                <img src={"/favicon.png"} className='w-[100px] h-[80px] py-2' alt="Logo" />
                <p className='text-4xl text-white'>{title}</p>
            </div>
            <div className='flex-1'>
                <div className='flex items-center justify-end gap-5 text-input-background px-4'>
                    {options.map(({ name, onClick }) => (
                        <div key={name} className='hover:text-[#fafafa] cursor-pointer text-[#d7d5d4] hover:decoration-8 hover:decoration-slate-400' onClick={onClick}>
                            <p className='text-[1.4rem]'>{name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
