import React, { createContext, useContext, useState } from 'react'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi'

const ToasterContext = createContext()

export const ToasterProvider = ({ children }) => {
    const [message, setMessage] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [type, setType] = useState('info')

    const open = (msg, toastType = 'info') => {
        setMessage(msg)
        setType(toastType)
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
            setMessage('')
        }, 3500)
    }

    const close = () => {
        setIsVisible(false)
        setMessage('')
    }

    const getIcon = () => {
        switch(type) {
            case 'success': return <FiCheckCircle size={20} />
            case 'error': return <FiAlertCircle size={20} />
            case 'warning': return <FiAlertTriangle size={20} />
            default: return <FiInfo size={20} />
        }
    }

    const getGradient = () => {
        switch(type) {
            case 'success': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            case 'error': return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            case 'warning': return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            default: return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        }
    }

    return (
        <ToasterContext.Provider value={{ open }}>
            {children}
            {isVisible && (
                <div className="toaster-container">
                    <div className="toaster-content-wrapper">
                        <div className="toaster-icon-wrapper" style={{ background: getGradient() }}>
                            {getIcon()}
                        </div>
                        <div className="toaster-message-wrapper">
                            {message}
                        </div>
                        <button onClick={close} className="toaster-close-btn">
                            <FiX size={16} />
                        </button>
                        <div className="toaster-progress-wrapper">
                            <div className="toaster-progress-bar-inner" />
                        </div>
                    </div>
                </div>
            )}
        </ToasterContext.Provider>
    )
}

export const useToaster = () => {
    return useContext(ToasterContext)
}
