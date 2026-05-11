import React, { useEffect, useState } from 'react'
import { useToaster } from '../../../configurations/useToaster'
import Container from '../../base/Container'
import { createAxiosWithToken } from '../../../configurations/createAxios'
import { FiRefreshCw, FiInbox, FiClock, FiTrendingUp, FiCheckCircle, FiCalendar } from 'react-icons/fi'
import moment from 'moment'
import useAuth from '../../../configurations/useAuth'

function CompletedTasks() {
    const [data, setData] = useState([])
    const toast = useToaster()
    const { auth } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(2)

    useEffect(() => { getCompletedTasks() }, [filter])

    const getCompletedTasks = () => {
        setIsLoading(true)
        createAxiosWithToken(auth.token)
            .get(`/TaskManager/GetByTaskCompleted?IsCompleted=${filter}`)
            .then(res => {
                let result = res.data
                if (Array.isArray(result)) setData(result)
                else if (result.data) setData(result.data)
                else setData([])
                toast.open('Tasks loaded successfully', 'success')
            })
            .catch(err => {
                console.log(err)
                toast.open(err.message || 'Failed to fetch tasks', 'error')
            })
            .finally(() => setIsLoading(false))
    }

    const getPriorityText = (priority) => {
        switch (priority) {
            case 1: return 'High'
            case 2: return 'Medium'
            case 3: return 'Low'
            default: return priority || 'N/A'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 0: return 'Pending'
            case 1: return 'In Progress'
            case 2: return 'Completed'
            default: return status || 'N/A'
        }
    }

    const getPriorityClass = (p) => ({ 1: 'badge-high', 2: 'badge-medium', 3: 'badge-low' }[p] || '')
    const getStatusClass = (s) => ({ 0: 'badge-pending', 1: 'badge-progress', 2: 'badge-completed' }[s] || '')

    return (
        <Container>
            <div className="page-container">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h1 className="page-title">Tasks by Status</h1>
                        <button onClick={getCompletedTasks} className="btn btn-refresh" disabled={isLoading}>
                            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} size={18} />
                            Refresh
                        </button>
                    </div>

                    <div className="filter-group">
                        <button onClick={() => setFilter(0)} className={`filter-btn ${filter === 0 ? 'active-pending' : ''}`}>
                            <FiClock style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Pending
                        </button>
                        <button onClick={() => setFilter(1)} className={`filter-btn ${filter === 1 ? 'active-progress' : ''}`}>
                            <FiTrendingUp style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            In Progress
                        </button>
                        <button onClick={() => setFilter(2)} className={`filter-btn ${filter === 2 ? 'active-completed' : ''}`}>
                            <FiCheckCircle style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Completed
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="card">
                            <div className="gradient-bar-green"></div>
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading tasks...</p>
                            </div>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="card">
                            <div className="gradient-bar-green"></div>
                            <div className="empty-state">
                                <FiInbox size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                <p className="empty-state-text">No tasks found for this status</p>
                            </div>
                        </div>
                    ) : (
                        <div className="task-grid">
                            {data.map((item) => (
                                <div key={item.id} className="task-card">
                                    <div className={`gradient-bar${filter === 0 ? '-red' : filter === 1 ? '-blue' : '-green'}`}></div>
                                    
                                    <div className="task-card-header">
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <span className={`badge ${getStatusClass(item.status)}`}>{getStatusText(item.status)}</span>
                                            <span className={`badge ${getPriorityClass(item.priority)}`}>{getPriorityText(item.priority)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="task-card-body">
                                        <h3 className="task-title">{item.name}</h3>
                                        <p className="task-description">{item.description || 'No description provided'}</p>
                                        
                                        {item.type && (
                                            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                                                <span style={{ fontWeight: '600', color: '#475569' }}>Type:</span> {item.type}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="task-card-footer">
                                        <div>
                                            <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Created</p>
                                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <FiCalendar size={14} />
                                                {item.createdOn ? moment(item.createdOn).format('MMM DD, YYYY') : 'N/A'}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Due Date</p>
                                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                                                <FiClock size={14} />
                                                {item.dueDate ? moment(item.dueDate).format('MMM DD, YYYY') : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default CompletedTasks
