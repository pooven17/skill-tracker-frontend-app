import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


const HeaderComponent = (props) => {

    const location = useLocation();

    let navigate = useNavigate();

    useEffect(() => {
        if (location.state != undefined) {
            setUserName(location.state.userName);
            setRoles(location.state.roles);
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [location]);

    const [userName, setUserName] = useState('');
    const [roles, setRoles] = useState([]);
    const [disabled, setDisabled] = useState('');

    let userSpan;
    if (userName != '') {
        userSpan = <span style={{ color: "gold", float: 'right', marginRight: "11%" }}>Welcome  {userName}</span>;
    }

    let roleSpan;
    if (roles != []) {
        let userRole;

        if (roles.includes("ROLE_ADMIN")) {
            userRole = 'Admin privilege';
        } else {
            if (roles.includes("ROLE_MODERATOR")) {
                userRole = 'Edit privilege';
            } else {
                if (roles.includes("ROLE_USER")) {
                    userRole = 'View privilege';
                }
            }
        }
        roleSpan = <span style={{ color: "gold", float: 'right', marginRight: "1%" }}>
            {userRole}
            </span>;
    }

    const cancel = (e) => {
        e.preventDefault();
        setRoles('');
        setUserName('');
        navigate('/');
    }

    return (
        <div className="header">
            <span  className="header_title">Employee Skill Tracker</span>
            <br />
            <button className="btn btn-danger signout" onClick={cancel} hidden={disabled}>Sign Out</button>
        </div>
    )

}

export default HeaderComponent;