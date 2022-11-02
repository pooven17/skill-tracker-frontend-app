import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import TableRows from "./TableRows"
import SkillTrackerService from '../services/SkillTrackerService';
function AddDeleteTableRows() {

    const [tRowsData, setTRowsData] = useState([]);
    const [ntRowsData, setNtRowsData] = useState([]);
    let location = useLocation();
    const [criteria, setCriteria] = useState(location.state.criteria);
    const [value, setValue] = useState(location.state.value);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();
    useEffect(() => {
        setJsToken(location.state.jsToken);
        setCriteria(location.state.criteria);
        setValue(location.state.value);
        setUserName(location.state.userName);
        setRoles(location.state.roles);

        if (criteria === 'Id') {
            SkillTrackerService.getEmployeeById(value, jsToken, roles)
                .then(res => {
                    console.log("wwwwwwwwwww"+ JSON.stringify(res.data));
                    console.log("eeeeeeeeeeeeeeeeeeeeee"+res.data[0].technicalSkills);
                    setTRowsData(res.data[0].technicalSkills); 
                    setNtRowsData(res.data[0].nonTechnicalSkills); 
                })
                .catch(function (error) {
                    setErrorMessage("Profile not found for the provided criteria");
                    setTimeout(() => {
                        navigate('/search-employee-skill', {
                            state: {
                                jsToken: jsToken,
                                roles: roles,
                                userName: userName
                            }
                        });
                    }, 1000);
                });
        }
    }, [location]);

    const taddTableRows = () => {
        const rowsInput = {
            skillName: '',
            expertiseLevel: 0,
            technical: true
        }
        setTRowsData([...tRowsData, rowsInput])

    }
    const tDeleteTableRows = (index) => {
        const rows = [...tRowsData];
        rows.splice(index, 1);
        setTRowsData(rows);
    }

    const ntDeleteTableRows = (index) => {
        const rows = [...ntRowsData];
        rows.splice(index, 1);
        setNtRowsData(rows);
    }

    const tHandleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...tRowsData];
        rowsInput[index][name] = value;
        setTRowsData(rowsInput);
    }

    const ntHandleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...ntRowsData];
        rowsInput[index][name] = value;
        setNtRowsData(rowsInput);
    }

    const saveEmployee = () => {

       console.log(JSON.stringify(tRowsData));
    }



    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 siginin">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Techical Skills</th>
                                    <th>Level</th>
                                    <th><button className="btn btn-outline-success" onClick={taddTableRows} >+</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows rowsData={tRowsData} deleteTableRows={tDeleteTableRows} handleChange={tHandleChange} />
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-4">
                    <button id="editEmployeeBtn" className="btn btn-success" onClick={saveEmployee} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddDeleteTableRows