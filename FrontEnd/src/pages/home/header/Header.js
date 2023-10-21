import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import './Header.css';

import { connect } from 'react-redux';

import viewActions from '../../../actions/viewActions';

import { MdLogout } from 'react-icons/md';

const Header = (props) => {
    const [sideIsOpen, setSidebarIsOpen] = useState(false)
    const clickMenuIcon = () => {
        //setSidebarIsOpen(!sideIsOpen)

        //props.clickMenuIcon(!isOpen)
      
        props.toggleSidebar();
    }

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const _onClickAvatar = () => {
        setDropdownIsOpen(!dropdownIsOpen)
    }

    const handleClickOutSideDropdown = () => {
        setDropdownIsOpen(false)
    }

    const handleLogout = () => {
        //clear data in localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        window.location.replace('/sign-in');
    }

    return (
        <div className='header'>
            <div className='row-1'>
                <div className='nav-left'>
                    <MdMenu className='menu-icon' onClick={clickMenuIcon} />
                    <Link to="/">Dashboard</Link>
                    <Link to="/user-info">User Info</Link>
                    <Link to="/list-groups">List Groups</Link>
                    <Link to="/password-changing">Change Password</Link>
                    <Link to="/settings">Settings</Link>
                </div>
                <div className='nav-right'>
                    <div className='header-avatar' >
                    <div className='icon-logout'> 
                        <MdLogout 
                        size={28}
                        style={{cursor: 'pointer'}}
                        onClick={handleLogout}
                    />
                    </div>
                        <img src="../../images/avatar.png" onClick={_onClickAvatar}/>
                    </div>
                    {   
                        dropdownIsOpen && <Dropdown setDropdownClose={handleClickOutSideDropdown}/>
                    }
                </div>
            </div>
            <div className='row-2'>
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleSidebar: () => {
            dispatch(viewActions.toggleSidebar())
        }
    }
}

//export default Header;

export default connect(null, mapDispatchToProps)(Header);