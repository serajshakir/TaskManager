import React from 'react'

function Card({ children, className = '' }) {
    return (
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
            {children}
        </div>
    )
}

export default Card
