import React from 'react'

function Container({ children }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm min-h-screen">
            {children}
        </div>
    )
}

export default Container
