// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RouteContainer from './app/components/secured/RouteContainer'
import Home from './app/components/secured/Home'
import GetAll from './app/components/secured/tasks/GetAll'
import AddTask from './app/components/secured/tasks/AddTask'
import UpdateTask from './app/components/secured/tasks/UpdateTask'
import DeleteTask from './app/components/secured/tasks/DeleteTask'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RouteContainer />}>
                    {/* Opens dashboard directly on localhost link */}
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Home />} />
                    <Route path="TaskManager/GetAll" element={<GetAll />} />
                    
                    {/* These trigger the modal in RouteContainer */}
                    <Route path="TaskManager/Add" element={<AddTask />} />
                    <Route path="TaskManager/Update" element={<UpdateTask />} />
                    <Route path="TaskManager/Delete" element={<DeleteTask />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App