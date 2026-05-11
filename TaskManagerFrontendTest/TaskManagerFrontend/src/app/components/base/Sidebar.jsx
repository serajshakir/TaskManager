// src/app/components/base/Sidebar.jsx
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdDashboard, MdAdd, MdList, MdEdit, MdDeleteOutline } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'
import useAuth from '../../configurations/useAuth'
import { clearAuth } from '../../configurations/authStorage'

function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { auth, logedOut } = useAuth() // Access auth state and logout property

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', alt: 'Dashboard', icon: <MdDashboard /> },
        { path: '/TaskManager/Add', label: 'Add Task', alt: 'Add Task', icon: <MdAdd /> },
        { path: '/TaskManager/Update', label: 'Update Task', alt: 'Update Task', icon: <MdEdit /> },
        { path: '/TaskManager/Delete', label: 'Delete Task', alt: 'Delete Task', icon: <MdDeleteOutline /> },
        { path: '/TaskManager/GetAll', label: 'Get All Tasks', alt: 'Get All Tasks', icon: <MdList /> },
    ]

    const handleLogout = () => {
        if (auth?.isLogin) {
            logedOut(); // Clears auth state
            clearAuth(); // Clears localStorage
            navigate('/dashboard');
        }
    }

    return (
        <aside className="sidebar flex flex-col h-screen">
            <div className="sidebar-logo">
                <h1>
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">Task Manager</span>
                </h1>
            </div>

            <nav className="sidebar-nav flex-1">
                <p className="nav-label">Main Menu</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout section at the bottom */}
            {auth?.isLogin && (
                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={handleLogout}
                        className="nav-item w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all cursor-pointer border-none bg-transparent"
                    >
                        <span className="nav-icon text-xl"><IoMdLogOut /></span>
                        <span className="nav-text font-bold">Logout ({auth.userName})</span>
                    </button>
                </div>
            )}
        </aside>
    )
}

export default Sidebar