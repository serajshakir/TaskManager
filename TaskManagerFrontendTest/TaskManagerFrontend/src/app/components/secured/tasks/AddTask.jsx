import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToaster } from '../../../configurations/useToaster'
import Container from '../../base/Container'
import { createAxiosWithToken } from '../../../configurations/createAxios'
import useAuth from '../../../configurations/useAuth'

function AddTask() {
    const navigate = useNavigate()
    const toast = useToaster()
    const { auth } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        priority: 1,
        status: 0,
        isCompleted: 0,
        createdBy: '',
        dueDate: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: ['priority', 'status', 'isCompleted'].includes(name) ? parseInt(value) : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name.trim()) {
            toast.open('Name is required', 'warning')
            return
        }
        setIsLoading(true)
        
        const payload = {
            name: formData.name,
            description: formData.description || null,
            type: formData.type || null,
            priority: parseInt(formData.priority),
            status: parseInt(formData.status),
            isCompleted: parseInt(formData.isCompleted) || 0,
            createdBy: formData.createdBy,
            dueDate: formData.dueDate ? formData.dueDate : new Date().toISOString()
        }

        createAxiosWithToken(auth.token)
            .post('/TaskManager/Add', payload)
            .then(res => {
                if (res.data?.isSuccess) {
                    toast.open(res.data.message || 'Task added successfully', 'success')
                    navigate('/TaskManager/GetAll')
                } else {
                    toast.open(res.data?.message || 'Failed to add task', 'error')
                }
            })
            .catch(err => {
                toast.open(err.response?.data?.message || 'Failed to add task', 'error')
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Container>
            <div className="page-container">
                <div className="form-wrapper">
                    <h1 className="page-title page-title-center">Create New Task</h1>
                    <p className="page-subtitle">Fill in the details below to add a new task to your list</p>

                    <div className="card">
                        <div className="gradient-bar"></div>
                        
                        <form onSubmit={handleSubmit} className="card-content-lg">
                            <div className="form-group">
                                <label className="form-label">
                                    Task Name <span className="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="What needs to be done?"
                                />

                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange}
                                    className="form-input form-textarea"
                                    placeholder="Add more details about this task..."
                                />

                            </div>

                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <input 
                                    type="text" 
                                    name="type" 
                                    value={formData.type} 
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., Development, Design, Meeting"
                                />

                            </div>

                            <div className="form-row-3">
                                <div className="form-group">
                                    <label className="form-label">Priority</label>
                                    <select 
                                        name="priority" 
                                        value={formData.priority} 
                                        onChange={handleChange}
                                        className="form-input form-select"
                                    >
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select 
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleChange}
                                        className="form-input form-select"
                                    >
                                        <option value={0}>Pending</option>
                                        <option value={1}>In Progress</option>
                                        <option value={2}>Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Completed</label>
                                    <select 
                                        name="isCompleted" 
                                        value={formData.isCompleted} 
                                        onChange={handleChange}
                                        className="form-input form-select"
                                    >
                                        <option value={0}>No</option>
                                        <option value={1}>Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Due Date</label>
                                    <input 
                                        type="date" 
                                        name="dueDate" 
                                        value={formData.dueDate} 
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Created By</label>
                                    <input 
                                        type="text" 
                                        name="createdBy" 
                                        value={formData.createdBy} 
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Your name"
                                    />

                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button 
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="btn btn-primary"
                                    style={{ flex: 2 }}
                                >
                                    {isLoading ? 'Adding Task...' : 'Add Task'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem', marginTop: '2rem' }}>
                        Fields marked with <span style={{color: '#ef4444'}}>*</span> are required
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default AddTask
