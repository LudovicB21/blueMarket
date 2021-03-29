import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as CgIcons from "react-icons/cg"
import * as SiIcons from "react-icons/si"
import * as FiIcons from "react-icons/fi"
import * as IoIcons from "react-icons/io"


export const SidebarData = [
    {
        title: 'Home',
        path: '/homePage',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        role: 3
    },
    {
        title: 'Fridge',
        path: '/fridge',
        icon: <BiIcons.BiFridge />,
        cName: 'nav-text',
        role: 0
    },
    {
        title: 'Scan',
        path: '/scan',
        icon: <IoIcons.IoMdQrScanner />,
        cName: 'nav-text',
        role: 0
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
        role: 3
    },
    {
        title: 'Market',
        path: '/market',
        icon: <SiIcons.SiMarketo />,
        cName: 'nav-text',
        role: 1
    },
    {
        title: 'Products',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text',
        role: 1
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text',
        role: 3
    }
]
