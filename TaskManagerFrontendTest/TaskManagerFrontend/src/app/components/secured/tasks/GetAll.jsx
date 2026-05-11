import React, { useEffect, useState } from 'react'
import { useToaster } from '../../../configurations/useToaster'
import Container from '../../base/Container'
import { createAxios } from '../../../configurations/createAxios'
import { FiRefreshCw, FiInbox, FiClock, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'
import moment from 'moment'

function GetAll() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(null)
    const toast = useToaster()

    useEffect(() => { 
        // Data is now fetched immediately on component mount for all users
        getTasks() 
    }, [])

    const getTasks = () => {
        setIsLoading(true)
        createAxios()
            .get('/TaskManager/GetAll', { params: { PageNo: 1, PageSize: 100, SearchTerm: '' } })
            .then(res => {
                const result = res.data
                setTasks(Array.isArray(result) ? result : result.data || [])
                toast.open('Tasks loaded successfully', 'success')
            })
            .catch(err => toast.open(err.message || 'Failed to fetch tasks', 'error'))
            .finally(() => setIsLoading(false))
    }

    const getPriority = (p) => ({ 1: 'High', 2: 'Medium', 3: 'Low' }[p] || 'N/A')
    const getStatus = (s) => ({ 0: 'Pending', 1: 'In Progress', 2: 'Completed' }[s] || 'N/A')
    const getPriorityClass = (p) => ({ 1: 'badge-high', 2: 'badge-medium', 3: 'badge-low' }[p] || '')
    const getStatusClass = (s) => ({ 0: 'badge-pending', 1: 'badge-progress', 2: 'badge-completed' }[s] || '')

    const filteredTasks = filter === null ? tasks : tasks.filter(t => t.status === filter)

    return (
        <Container>
            <div className="page-container">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h1 className="page-title">All Tasks</h1>
                        <button onClick={getTasks} className="btn btn-refresh" disabled={isLoading}>
                            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} size={18} />
                            Refresh
                        </button>
                    </div>

                    <div className="filter-group">
                        <button onClick={() => setFilter(0)} className={`filter-btn ${filter === 0 ? 'active-pending' : ''}`}>
                            <FiClock style={{ marginRight: '0.5rem' }} /> Pending
                        </button>
                        <button onClick={() => setFilter(1)} className={`filter-btn ${filter === 1 ? 'active-progress' : ''}`}>
                            <FiTrendingUp style={{ marginRight: '0.5rem' }} /> In Progress
                        </button>
                        <button onClick={() => setFilter(2)} className={`filter-btn ${filter === 2 ? 'active-completed' : ''}`}>
                            <FiCheckCircle style={{ marginRight: '0.5rem' }} /> Completed
                        </button>
                        {filter !== null && (
                            <button onClick={() => setFilter(null)} className="filter-btn">Clear</button>
                        )}
                    </div>

                    <div className="table-container">
                        <div className="gradient-bar-blue"></div>
                        
                        {isLoading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading tasks...</p>
                            </div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="empty-state">
                                <FiInbox className="empty-state-icon" size={64} />
                                <p className="empty-state-text">No tasks found</p>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.map(task => (
                                        <tr key={task.id}>
                                            <td style={{ fontWeight: '600', color: '#6366f1' }}>#{task.id}</td>
                                            <td style={{ fontWeight: '600' }}>{task.name}</td>
                                            <td style={{ maxWidth: '200px' }} className="text-truncate">{task.description || '-'}</td>
                                            <td>{task.type || '-'}</td>
                                            <td><span className={`badge ${getPriorityClass(task.priority)}`}>{getPriority(task.priority)}</span></td>
                                            <td><span className={`badge ${getStatusClass(task.status)}`}>{getStatus(task.status)}</span></td>
                                            <td>{task.dueDate ? moment(task.dueDate).format('MMM DD, YYYY') : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default GetAll