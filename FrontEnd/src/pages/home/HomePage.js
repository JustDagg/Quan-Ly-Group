import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import UserInfo from './userinfo/UserInfo';
import ListGroups from './listgroups/ListGroups';
import Dashboard from './dashboard/Dashboard';
import WithLoading from '../../_sharecomponents/loading/WithLoading';
import './HomePage.css';
import { connect } from 'react-redux';

const UserWithLoading = WithLoading(UserInfo);
const ListGroupsWithLoading = WithLoading(ListGroups);
const DashboardWithLoading = WithLoading(Dashboard);

const HomePage = (props) => {
    
    return (
        <div className='home-container'>
            <Sidebar />
            <div className={props.sidebarIsOpen ? 'home-main' : 'home-main sidebar-close'}>
                <Header/>
                <div className='main-content'>
                    <Outlet />
                </div>
                {/* New Group Overview Section */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sidebarIsOpen: state.view.sidebarIsOpen
    }
}

export default connect(mapStateToProps, null)(HomePage);
