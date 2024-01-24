import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logout, selectUser } from '../../../redux/user/userSlice';
import { Link } from 'react-router-dom'
import cookies from 'react-cookies'
import Dropdown from '../dropdown/Dropdown'
import notifications from '../../../assets/JsonData/notification.json'

import './topNav.scss'

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const Topnav = () => {
    const user = useSelector(selectUser);

    const dispatch = useDispatch()

    const handleLogout = ()=> {
        cookies.remove("user")
        dispatch(logout())
    }

    return (
        <div className='topnav'>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <div className="header__right">
                        <div className='account'>
                            <div className="header__right--account">
                                <img src={user ? user.avatar : null} alt="" />
                                {user ? user.name : null}
                            </div>
                            <div className='account__list active'>
                                <ul>
                                    <li onClick={handleLogout}>
                                        <Link to='/'>Đăng xuất</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/admin'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                {/* <div className="topnav__right-item">
                    <ThemeMenu/>
                </div> */}
            </div>
        </div>
    )
}

export default Topnav