import React from 'react'
import ContentHeader from './ContentHeader'
import Order from './Order'
import './content.css'

const Content = () => {
  return (
   <div className="content">
    <ContentHeader />
    <Order />
   </div>
  )
}

export default Content