import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../../../../node_modules/axios/index";

const Dashboard = (props) => {
    const token = localStorage.getItem('token')
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalGroups, setTotalGroups] = useState(0);
    const [totalTypes, setTotalTypes] = useState(0);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const { data: groups } = await axios.get('http://localhost:8888/api/groups', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                console.log(groups);

                // Calculate totals
                setTotalMembers(groups.reduce((acc, group) => acc + group.totalMember, 0)); // totalMembers
                setTotalGroups(groups.length); // totalGroups
                setTotalTypes(new Set(groups.map(group => group.type)).size); // totalTypes

            } catch (err) {
                console.error(err);
            }
        };

        fetchGroups();
    }, []);


    useEffect(() => {
        props.showLoading(props.isLoading);
    }, [props.isLoading]);

    return (
        <div className={props.className}>
            <form className="content">
                <div className='group-overview'>
                    <h3 style={{
                        fontSize: '45px',
                        fontWeight: 'bold',
                        borderBottom: '5px solid blue',
                        paddingBottom: '5px'
                    }}>
                        Overview
                    </h3>
                    <div className='overview-stats'>
                        <div style={{ backgroundColor: 'black', cursor: 'pointer' }} className='stat-item'>
                            <h4 style={{ color: 'whitesmoke' }}>Total Members Of Groups</h4>
                            <p style={{ color: 'red', fontWeight: 'bold' }}>{totalMembers}</p>
                        </div>
                        <div style={{ backgroundColor: 'black', cursor: 'pointer' }} className='stat-item'>
                            <h4 style={{ color: 'whitesmoke' }}>Total Groups</h4>
                            <p style={{ color: 'yellow', fontWeight: 'bold' }}>{totalGroups}</p>
                        </div>
                        <div style={{ backgroundColor: 'black', cursor: 'pointer' }} className='stat-item'>
                            <h4 style={{ color: 'whitesmoke' }}>Total Types</h4>
                            <p style={{ color: 'green', fontWeight: 'bold' }}>{totalTypes}</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

const DashboardStyled = styled(Dashboard)`
    height: calc(100vh - 108px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .content {
        width: 1000px;
        background-color: #ffffff;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export default (DashboardStyled);
