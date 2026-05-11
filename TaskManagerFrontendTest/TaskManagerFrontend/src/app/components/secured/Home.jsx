import React, { useEffect, useState } from 'react'
import { createAxios } from '../../configurations/createAxios'
import { useToaster } from '../../configurations/useToaster'
import moment from 'moment'
import { FiCheckCircle, FiClock } from 'react-icons/fi'

function Home() {
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        incompletedTasks: 0
    })
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToaster()

    useEffect(() => { 
        // Data is now fetched immediately on component mount for all users
        getDashboardStats() 
    }, [])

    const getDashboardStats = () => {
        setIsLoading(true)
        createAxios()
            .get('/TaskManager/GetAll', { params: { PageNo: 1, PageSize: 100, SearchTerm: '' } })
            .then(res => {
                let result = res.data
                let tasks = Array.isArray(result) ? result : (result.data || result.result || [])
                
                const completed = tasks.filter(t => 
                    t.isCompleted === true || t.status === 'Completed' || t.status === 2
                ).length
                
                const incompleted = tasks.length - completed
                setStats({ totalTasks: tasks.length, completedTasks: completed, incompletedTasks: incompleted })
            })
            .catch(err => {
                console.log('API Error:', err)
                toast.open('Failed to load dashboard statistics', 'error')
            })
            .finally(() => setIsLoading(false))
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good Morning'
        if (hour < 18) return 'Good Afternoon'
        return 'Good Evening'
    }

    const completedPercentage = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-greeting">{getGreeting()}! 👋</h1>
                <p className="dashboard-date">{moment().format('dddd, MMMM Do YYYY')}</p>
            </div>

            {isLoading ? (
                <div className="loading-container"><div className="loading-spinner"></div></div>
            ) : (
                <>
                   <div className="stats-grid">
                        <div className="stat-card completed">
                            <div className="stat-card-content">
                                <div className="stat-card-info">
                                    <p className="stat-card-label">Completed Tasks</p>
                                    <p className="stat-card-value">{stats.completedTasks}</p>
                                </div>
                                <div className="stat-card-icon"><FiCheckCircle /></div>
                            </div>
                            <div className="stat-card-footer">
                                <p className="stat-card-message"><span>✨</span> Great progress!</p>
                            </div>
                        </div>

                        <div className="stat-card incompleted">
                            <div className="stat-card-content">
                                <div className="stat-card-info">
                                    <p className="stat-card-label">Pending Tasks</p>
                                    <p className="stat-card-value">{stats.incompletedTasks}</p>
                                </div>
                                <div className="stat-card-icon"><FiClock /></div>
                            </div>
                            <div className="stat-card-footer">
                                <p className="stat-card-message"><span>🔥</span> Stay focused!</p>
                            </div>
                        </div>
                    </div>

                    <div className="chart-section">
                        <div className="chart-header">
                            <h2 className="chart-title">Task Distribution</h2>
                        </div>
                        <div className="chart-container">
                            <div className="chart-wrapper">
                                <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#progressGradient)" strokeWidth="10"
                                        strokeDasharray={`${completedPercentage * 2.51} 251`} strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#059669" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="chart-center">
                                    <span className="chart-percentage">{Math.round(completedPercentage)}%</span>
                                    <span className="chart-percentage-label">Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home