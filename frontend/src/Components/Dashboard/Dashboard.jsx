import React from 'react'
import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import './dashboard.css'

const dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_content">
        <Content />
      </div>
    </div>
  )
}

export default dashboard