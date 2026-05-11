import React from 'react'

function Input({ id, type = "text", value, Icon, IsError, onChange, onBlur, placeholder }) {
    return (
        <div className={`flex items-center border rounded-md px-3 py-2 ${IsError ? 'border-red-500' : 'border-blue-300'}`}>
            {Icon && <span className="text-gray-500 mr-2">{Icon}</span>}
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className="flex-1 outline-none bg-transparent"
            />
        </div>
    )
}

export default Input
