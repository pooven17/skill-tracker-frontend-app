
import React, { useEffect, useState } from 'react';
import SearchEmpSkillComponent from './SearchEmpSkillComponent';
import EmpSkillListComponent from './EmpSkillListComponent';
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const SearchComponent = props => {
    let navigate = useNavigate();
    const location = useLocation();
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        if (location.state != undefined) {
            setRoles(location.state.roles);
        }
        if (!roles) {
            navigate('/');
        }
    }, [location]);

    if (roles.includes("ROLE_ADMIN")) {
        return (
            <SearchEmpSkillComponent />
        )
    } else {
        return (
            <EmpSkillListComponent />
        )
    }
}
export default SearchComponent;
