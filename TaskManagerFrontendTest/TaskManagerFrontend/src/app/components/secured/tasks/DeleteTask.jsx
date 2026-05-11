import React, { useEffect, useState } from 'react'
import { useToaster } from '../../../configurations/useToaster'
import Container from '../../base/Container'
import { createAxiosWithToken } from '../../../configurations/createAxios'
import { FiRefreshCw, FiTrash2, FiAlertTriangle, FiX, FiInbox } from 'react-icons/fi'
import useAuth from '../../../configurations/useAuth'

function DeleteTask() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [deleteItem, setDeleteItem] = useState(null)
    const { auth } = useAuth()
    const toast = useToaster()

    useEffect(() => { getTasks() }, [])

    const getTasks = () => {
        setIsLoading(true)
        createAxiosWithToken(auth.token)
            .get('/TaskManager/GetAll', { params: { PageNo: 1, PageSize: 100, SearchTerm: '' } })
            .then(res => {
                setTasks(Array.isArray(res.data) ? res.data : res.data.data || [])
                toast.open('Tasks loaded successfully', 'success')
            })
            .catch(err => toast.open(err.message, 'error'))
            .finally(() => setIsLoading(false))
    }

    const handleDelete = () => {
        if (!deleteItem) return
        setIsLoading(true)
        createAxiosWithToken(auth.token)
            .post(`/TaskManager/Delete?id=${deleteItem.id}`)
            .then(res => { 
                toast.open(res.data.message || 'Task deleted successfully', 'success')
                setDeleteItem(null)
                getTasks()
            })
            .catch(err => toast.open(err.response?.data?.message || 'Failed to delete', 'error'))
            .finally(() => setIsLoading(false))
    }

    const getPriority = (p) => ({ 1: 'High', 2: 'Medium', 3: 'Low' }[p] || 'N/A')
    const getStatus = (s) => ({ 0: 'Pending', 1: 'In Progress', 2: 'Completed' }[s] || 'N/A')
    const getPriorityClass = (p) => ({ 1: 'badge-high', 2: 'badge-medium', 3: 'badge-low' }[p] || '')
    const getStatusClass = (s) => ({ 0: 'badge-pending', 1: 'badge-progress', 2: 'badge-completed' }[s] || '')

    return (
        <Container>
            <div className="page-container">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h1 className="page-title">Delete Task</h1>
                        <button onClick={getTasks} className="btn btn-refresh" disabled={isLoading}>
                            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} size={18} />
                            Refresh
                        </button>
                    </div>

                    <div className="table-container">
                        <div className="gradient-bar-red"></div>
                        
                        {isLoading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading tasks...</p>
                            </div>
                        ) : tasks.length === 0 ? (
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
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'center' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(t => (
                                        <tr key={t.id}>
                                            <td style={{ fontWeight: '600', color: '#6366f1' }}>#{t.id}</td>
                                            <td style={{ fontWeight: '600' }}>{t.name}</td>
                                            <td><span className={`badge ${getPriorityClass(t.priority)}`}>{getPriority(t.priority)}</span></td>
                                            <td><span className={`badge ${getStatusClass(t.status)}`}>{getStatus(t.status)}</span></td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button onClick={() => setDeleteItem(t)} className="btn-delete-sm">
                                                    <FiTrash2 style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} size={16} />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {deleteItem && (
                <div className="modal-overlay" onClick={() => setDeleteItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="gradient-bar-red"></div>
                        
                        <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1.5rem', animation: 'bounceIn 0.5s ease-out'
                            }}>
                                <FiAlertTriangle size={40} color="#dc2626" />
                            </div>
                            
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>
                                Confirm Deletion
                            </h2>
                            
                            <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                Are you sure you want to delete this task?
                            </p>
                            
                            <p style={{ 
                                fontSize: '1.125rem', fontWeight: '600', color: '#1e293b',
                                padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', marginBottom: '2rem'
                            }}>
                                "{deleteItem.name}"
                            </p>
                            
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button onClick={() => setDeleteItem(null)} className="btn btn-secondary">
                                    <FiX size={18} />Cancel
                                </button>
                                <button onClick={handleDelete} className="btn btn-danger" disabled={isLoading}>
                                    <FiTrash2 size={18} />{isLoading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default DeleteTask
