import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div style={{ backgroundColor: 'pink', flex: 1/2.5}}>

    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/research">Research</Link>
      </li>
      <li>
        <Link to="/notifications">Notifications</Link>
      </li>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
    </ul>
  </nav>
    </div>
  )
}

export default Menu