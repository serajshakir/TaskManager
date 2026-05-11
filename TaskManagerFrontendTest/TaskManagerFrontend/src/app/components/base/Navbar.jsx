import React from 'react';

function Navbar() {
    return (
        <nav className="navbar fixed top-0 left-0 right-0 z-40 h-[64px] bg-white shadow flex items-center justify-between px-4 transition-all duration-300">
            <div className="navbar-title">
                <h1 className="text-gray-800 font-bold">📊 Task Manager</h1>
            </div>

            {/* Right side blank as requested */}
            <div className="flex items-center gap-3"></div>
        </nav>
    );
}

export default Navbar;