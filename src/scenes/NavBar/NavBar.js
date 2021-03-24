import React, { useEffect, useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import { SidebarData } from './SideBarData'
import './Navbar.css'
import { SiIntel } from 'react-icons/si'
//import { UserContext } from "../../store/userStore"

function NavBar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const [auth, setAuth] = useState(null)

    /*const getData = () => {
        let data = localStorage.getItem('user')
        setAuth(data)
    }*/

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('user')))
    }, [])

    console.log(auth.role)
    return (
        <>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        if (item.role === auth.role || item.role === 3) {
                            return (
                                <li key={index} className={item.cName}>
                                    {console.log(item.role)}
                                    <Link to={item.path} onClick={showSidebar} >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        }

                    })}
                </ul>
            </nav>
        </>
    )
}

export default NavBar
