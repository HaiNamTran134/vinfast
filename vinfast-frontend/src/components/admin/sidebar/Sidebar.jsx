import React from 'react'
import {useSelector} from 'react-redux'
import { Link , useLocation, useNavigate} from 'react-router-dom';
import { selectUser } from '../../../redux/user/userSlice';

import './sidebar.scss'

const SidebarItem = props => {
    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    let sidebar_items = [
        {
            "display_name": "Dashboard",
            "route": "",
            "icon": "bx bx-category-alt"
        },
        {
            "display_name": "Customers",
            "route": "customers",
            "icon": "bx bx-cart"
        },
        {
            "display_name": "Products",
            "route": "products",
            "icon": "bx bx-package"
        },
        {
            "display_name": "Account",
            "route": "accounts",
            "icon": "bx bx-user-pin"
        },
        {
            "display_name": "Home Slide",
            "route": "homeslide",
            "icon": "bx bx-list-ol"
        },
        {
            "display_name": "Home Block1",
            "route": "homeblock1",
            "icon": "bx bx-gift"
        },
        {
            "display_name": "Home Block2",
            "route": "homeblock2",
            "icon": "bx bx-store-alt"
        },
        {
            "display_name": "Home Block3",
            "route": "homeblock3",
            "icon": "bx bx-cog"
        },
        {
            "display_name": "Home Block4",
            "route": "homeblock4",
            "icon": "bx bx-cog"
        }
    ]
    if (user && user.role === 'sell') {
        sidebar_items = [
            {
                "display_name": "Dashboard",
                "route": "",
                "icon": "bx bx-category-alt"
            },
            {
                "display_name": "Customers",
                "route": "customers",
                "icon": "bx bx-user-pin"
            },
            {
                "display_name": "Home Slide",
                "route": "homeslide",
                "icon": "bx bx-list-ol"
            },
            {
                "display_name": "Home Block1",
                "route": "homeblock1",
                "icon": "bx bx-gift"
            },
            {
                "display_name": "Home Block2",
                "route": "homeblock2",
                "icon": "bx bx-store-alt"
            },
            {
                "display_name": "Home Block3",
                "route": "homeblock3",
                "icon": "bx bx-cog"
            },
            {
                "display_name": "Home Block4",
                "route": "homeblock4",
                "icon": "bx bx-cog"
            }
        ]
    }
    const location = useLocation();
    const activeItem = sidebar_items.findIndex(item => `/admin/${item.route}` === location.pathname)
    return (
        <div className='sidebar'>
            <div className="sidebar__logo" onClick={() => navigate('/')} >
                <img src="http://localhost:3000/images/logo-header.svg" alt="company logo" />
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={`/admin/${item.route}`} key={index} >
                        <SidebarItem 
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
