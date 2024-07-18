'use client';

import { useRef } from 'react';

export default function InputWrapper({ value, iconSrc, placeholder, type, onChange }) {
    const inputRef = useRef(null);
  
    const handleDivClick = () => {
        inputRef.current.focus();
    };

    return (
        <div
        className={`flex items-center bg-white p-2 rounded-2xl shadow-lg cursor-pointer focus-within:outline focus-within:outline-green-200 focus-within:outline-3`}
        onClick={handleDivClick}
        >
        <img src={iconSrc} alt="icon" className="w-9 h-auto" />
        <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-transparent"
        />
        </div>
    );
}