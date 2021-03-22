import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as CgIcons from "react-icons/cg"
import * as SiIcons from "react-icons/si"
import * as FiIcons from "react-icons/fi"
import * as IoIcons from "react-icons/io"

const routes = [
    {
        title: 'Home',
        path: '/homePage',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Fridge',
        path: '/fridge',
        icon: <BiIcons.BiFridge />,
        cName: 'nav-text'
    },
    {
        title: 'Scan',
        path: '/scan',
        icon: <IoIcons.IoMdQrScanner />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Market',
        path: '/market',
        icon: <SiIcons.SiMarketo />,
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <FiIcons.FiLogIn />,
        cName: 'nav-text'
    },
    {
        title: 'Register',
        path: '/register',
        icon: <FaIcons.FaRegistered />,
        cName: 'nav-text'
    },
];

export const getRoutes = () => {
    const parentRoute = {
        'name': '',
        'path': '',
    };
    const flatRoutes = compile(parentRoute, routes);
    return flatRoutes;
}

const compile = (parentRoute: Route, subRoutes: Route[]): Route[] => {
    return subRoutes.flatMap(subRoute => {
        const newRoute: Route = {
            'name': subRoute.name,
            'path': parentRoute.path + subRoute.path,
            'component': subRoute.component,
            'roles': (parentRoute.roles || []).concat((subRoute.roles || [])),
        };
        return (subRoute.routes) ? [...compile(newRoute, subRoute.routes)] : newRoute;
    });
}

export const getPath = (name: string, params: Object = null) => {
    const routeFound = getRoutes().find(route => route.name === name);
    let path = routeFound ? routeFound.path : null;
    if (path && params) {
        Object.entries(params).forEach(([key, value]: [string, any]) => {
            path = path ? path.replace(`:${key}`, value) : '';
        });
    }
    return path;
}