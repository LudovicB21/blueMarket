import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as CgIcons from "react-icons/cg"
import * as SiIcons from "react-icons/si"
import * as FiIcons from "react-icons/fi"
import * as BsFill from "react-icons/bs"
import * as RiIcons from "react-icons/ri"

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
        role: 1
    },
    {
        title: 'Scan',
        path: '/scan',
        icon: <AiIcons.AiOutlineBarcode />,
        cName: 'nav-text',
        role: 1
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
        role: 4
    },
    {
        title: 'Inventory',
        path: '/products',
        icon: <FaIcons.FaProductHunt />,
        cName: 'nav-text',
        role: 2
    },
    {
        title: 'Spokes',
        path: '/spokes',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text',
        role: 0
    },
    {
        title: 'Shopping cart',
        path: '/shoppingCart',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text',
        role: 1
    },
    {
        title: 'MyProducers',
        path: '/productors',
        icon: <BsFill.BsFillPersonFill />,
        cName: 'nav-text',
        role: 0
    },
    {
        title: 'PurchasePC',
        path: '/purchasePC',
        icon: <RiIcons.RiComputerLine />,
        cName: 'nav-text',
        role: 1
    },
    {
        title: 'Statistics',
        path: '/stats',
        icon: <BiIcons.BiStats />,
        cName: 'nav-text',
        role: 0
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text',
        role: 4
    },
]
