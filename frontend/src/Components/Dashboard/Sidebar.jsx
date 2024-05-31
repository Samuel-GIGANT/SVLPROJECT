import React from 'react'
import { FaUserCheck} from 'react-icons/fa'
import { BiHome} from 'react-icons/bi'
import './sidebar.css';

const sidebar = () => {
  return (
    <div className='menu'>
      <div className='logo'>
      <a href="/"><span>SVL</span>Sound Video Light</a>
      </div>
      <div className="menu_list">
        <a href="/dashboard" className="item">
          <BiHome className='logo_icons'/>
          Dashboard
        </a>
        <a href="/user" className="item">
          <FaUserCheck className='logo_icons'/>
          Users
        </a>
        <a href="/catogories" className="item">
          <BiHome className='logo_icons'/>
          Categories
        </a>
        <a href="/product" className="item">
          <BiHome className='logo_icons'/>
          Products
        </a>
        <a href="/order" className="item">
          <BiHome className='logo_icons'/>
          Orders
        </a>
        <a href="/cart" className="item">
          <BiHome className='logo_icons'/> 
          Cart
        </a>
      </div>

    </div>
  )
}

export default sidebar