import React from 'react'
import { IoClose } from 'react-icons/io5'

function Modal({ title, isOpen, setIsOpen, children }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            {/* Removed bg-white and standard padding to let Login.jsx control the look */}
            <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl shadow-2xl">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white  cursor-pointer transition-colors"
                >
                    <IoClose className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal