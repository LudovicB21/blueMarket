import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

function Nav() {
    const navStyle = {
        color: 'white',
    }

    return (
        <div>
            <nav>
                <ul className="nav-links">
                    <Link to="/login" style={navStyle} >
                        <li>Login</li>
                    </Link>
                    <Link to="/register" style={navStyle}>
                        <li>Register</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}

export default Nav
