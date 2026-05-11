import React, { useEffect, useState } from 'react'
import { useToaster } from '../../../configurations/useToaster'
import Container from '../../base/Container'
import { createAxiosWithToken } from '../../../configurations/createAxios'
import { FiRefreshCw, FiEdit3, FiList, FiInbox } from 'react-icons/fi'
import useAuth from '../../../configurations/useAuth'

function UpdateTask() {
    const [tasks, setTasks] = useState([])
    const [selected, setSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToaster()
    const { auth } = useAuth()
    const [form, setForm] = useState({ id: 0, name: '', description: '', type: '', priority: 3, status: 0, isCompleted: 0, createdBy: '', dueDate: '' })

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

    const selectTask = (task) => {
        setSelected(task)
        setForm({
            id: task.id, name: task.name || '', description: task.description || '', type: task.type || '',
            priority: task.priority || 1, status: task.status || 0, isCompleted: task.isCompleted || 0,
            createdBy: task.createdBy || '', dueDate: task.dueDate || ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: ['priority', 'status', 'isCompleted', 'id'].includes(name) ? parseInt(value) : value }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (!form.name.trim()) return toast.open('Name is required', 'warning')
        setIsLoading(true)
        const payload = {
            id: form.id,
            name: form.name,
            description: form.description || null,
            type: form.type || null,
            priority: form.priority,
            status: form.status,
            isCompleted: form.isCompleted,
            createdBy: form.createdBy,
            dueDate: form.dueDate ? form.dueDate : new Date().toISOString().split('T')[0]
        }
        createAxiosWithToken(auth.token)
            .post('/TaskManager/Update', payload)
            .then(res => { 
                if (res.data?.isSuccess) {
                    toast.open(res.data.message || 'Task updated successfully', 'success')
                    setSelected(null)
                    getTasks()
                } else {
                    toast.open(res.data?.message || 'Failed to update', 'error')
                }
            })
            .catch(err => toast.open(err.response?.data?.message || 'Failed to update', 'error'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Container>
            <div className="page-container">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h1 className="page-title">Update Task</h1>
                        <button onClick={getTasks} className="btn btn-refresh" disabled={isLoading}>
                            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} size={18} />
                            Refresh
                        </button>
                    </div>

                    <div className="two-column-layout">
                        <div className="card">
                            <div className="gradient-bar"></div>
                            <div className="card-content">
                                <div className="section-title">
                                    <FiList className="section-title-icon" />
                                    Select a Task
                                </div>
                                
                                {isLoading ? (
                                    <div className="loading-container" style={{ padding: '2rem 0' }}>
                                        <div className="loading-spinner"></div>
                                        <p className="loading-text">Loading...</p>
                                    </div>
                                ) : tasks.length === 0 ? (
                                    <div className="empty-state" style={{ padding: '2rem 0' }}>
                                        <FiInbox size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                        <p className="empty-state-text">No tasks available</p>
                                    </div>
                                ) : (
                                    <div className="selectable-list">
                                        {tasks.map(t => (
                                            <div 
                                                key={t.id} 
                                                onClick={() => selectTask(t)}
                                                className={`selectable-item ${selected?.id === t.id ? 'selected' : ''}`}
                                            >
                                                <div className="selectable-item-title">#{t.id} - {t.name}</div>
                                                <div className="selectable-item-subtitle">{t.description || 'No description'}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card">
                            <div className="gradient-bar-green"></div>
                            <div className="card-content">
                                <div className="section-title">
                                    <FiEdit3 className="section-title-icon" />
                                    Edit Details
                                </div>

                                {selected ? (
                                    <form onSubmit={handleUpdate}>
                                        <div className="form-group">
                                            <label className="form-label">Task Name <span className="required">*</span></label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter task name" className="form-input" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Description</label>
                                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter description" className="form-input form-textarea" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Type</label>
                                            <input type="text" name="type" value={form.type} onChange={handleChange} placeholder="e.g. Bug, Feature, Task" className="form-input" />
                                        </div>

                                        <div className="form-row-3">
                                            <div className="form-group">
                                                <label className="form-label">Priority</label>
                                                <select name="priority" value={form.priority} onChange={handleChange} className="form-input form-select">
                                                    <option value={1}>High</option>
                                                    <option value={2}>Medium</option>
                                                    <option value={3}>Low</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Status</label>
                                                <select name="status" value={form.status} onChange={handleChange} className="form-input form-select">
                                                    <option value={0}>Pending</option>
                                                    <option value={1}>In Progress</option>
                                                    <option value={2}>Completed</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Completed</label>
                                                <select name="isCompleted" value={form.isCompleted} onChange={handleChange} className="form-input form-select">
                                                    <option value={0}>No</option>
                                                    <option value={1}>Yes</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Due Date</label>
                                                <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="form-input" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Created By</label>
                                                <input type="text" name="createdBy" value={form.createdBy} onChange={handleChange} placeholder="Enter creator name" className="form-input" />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                            <button type="submit" className="btn btn-success" style={{ flex: 1 }} disabled={isLoading}>
                                                {isLoading ? 'Updating...' : 'Update Task'}
                                            </button>
                                            <button type="button" onClick={() => setSelected(null)} className="btn btn-secondary">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="empty-state" style={{ padding: '3rem 0' }}>
                                        <FiEdit3 size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                        <p className="empty-state-text">Select a task from the list to edit</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default UpdateTask
