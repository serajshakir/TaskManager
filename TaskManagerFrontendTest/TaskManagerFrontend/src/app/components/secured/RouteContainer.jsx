// src/app/components/secured/RouteContainer.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../base/Sidebar';
import Navbar from '../base/Navbar';
import Modal from '../base/Modal'; // Using your existing Modal
import Login from '../public/Login';
import useAuth from '../../configurations/useAuth'; //

function RouteContainer() {
    // Destructuring auth safely
    const authContext = useAuth();
    const auth = authContext ? authContext.auth : null;
    
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const protectedPaths = ['/TaskManager/Add', '/TaskManager/Update', '/TaskManager/Delete'];

    useEffect(() => {
        // Trigger login modal if clicking protected actions
        if (protectedPaths.includes(location.pathname) && !auth?.isLogin) {
            setIsLoginModalOpen(true);
        } else {
            setIsLoginModalOpen(false);
        }
    }, [location.pathname, auth?.isLogin]);

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
        navigate('/TaskManager/GetAll'); // Go back to public view on close
    };

    return (
        <div className="main-layout flex h-screen overflow-hidden bg-[#f8fafc]">
            <Sidebar />
            <div className="main-content-wrapper flex-1 ml-64 flex flex-col min-h-0 transition-all duration-300">
                <Navbar />
                <main className="main-content flex-1 pt-[64px] p-6 md:p-10 overflow-y-auto">
                    {/* Data stays visible in background */}
                    <Outlet /> 
                </main>
            </div>

            {/* Login Modal Overlay */}
            <Modal 
                title="Log In" 
                isOpen={isLoginModalOpen} 
                setIsOpen={handleCloseModal}
            >
                <Login isModal={true} onLoginSuccess={() => setIsLoginModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default RouteContainer;