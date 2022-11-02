import React, { useEffect, useState, Component } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableRows from "./TableRows"

const EditEmpSkillComponentNew = props => {
    let location = useLocation();
    const [criteria, setCriteria] = useState(location.state.criteria);
    const [value, setValue] = useState(location.state.value);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [tRowsData, setTRowsData] = useState([]);
    const [ntRowsData, setNtRowsData] = useState([]);

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
                    setEmployee(res.data[0]);
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



    const getEmployee = () => {
        navigate('/employee-skills', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles,
                criteria: criteria,
                value: value
            }
        });
    }

    const saveEmployee = () => {
        var data = [...tRowsData, ...ntRowsData];
        let empRequest = employee;
        empRequest.technicalSkills = null;
        empRequest.nonTechnicalSkills = null;
        empRequest.skills = data;

        SkillTrackerService.updateEmployeeBySkill(empRequest.associateId, jsToken, empRequest)
            .then(res => {
                console.log("Updated");
                navigate('/employee-skills', {
                    state: {
                        jsToken: jsToken,
                        userName: userName,
                        roles: roles,
                        criteria: criteria,
                        value: value
                    }
                });
            })
            .catch(function (error) {
                setErrorMessage("Profile update failed");
            });

    }

    const tAddTableRows = () => {
        const rowsInput = {
            skillName: '',
            expertiseLevel: 0,
            technical: true
        }
        setTRowsData([...tRowsData, rowsInput])

    }

    const ntAddTableRows = () => {
        const rowsInput = {
            skillName: '',
            expertiseLevel: 0,
            technical: false
        }
        setNtRowsData([...ntRowsData, rowsInput])
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

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 siginin">
                        <h3 className="text-center">Employees List</h3>
                        <div className="buttonPositions">
                            <button id="getEmployeeBtn" className="btn btn-success" onClick={getEmployee} >Go Back</button>
                        </div>
                        <br></br>
                        <div>
                            <Row>
                                {errorMessage && <div className="error"> {errorMessage} </div>}
                            </Row>
                        </div>
                        <div>

                            <div >
                                <Row>
                                    <Col className="col-md-8">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th className="table_header_2"> Employee ID </th>
                                                    <td className="table_profile_2">: {employee.associateId}</td>
                                                </tr>
                                                <tr>
                                                    <th className="table_header_2"> Employee Name </th>
                                                    <td className="table_profile_2">: {employee.name}</td>
                                                </tr>
                                                <tr>
                                                    <th className="table_header_2"> Employee Email ID </th>
                                                    <td className="table_profile_2">: {employee.emailId}</td>
                                                </tr>
                                                <tr>
                                                    <th className="table_header_2"> Employee Contact </th>
                                                    <td className="table_profile_2">: {employee.contactNo}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row><Row>
                                    <Col className="col-md-6">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Techical Skills</th>
                                                    <th>Level</th>
                                                    <th><button className="btn btn-outline-success" onClick={tAddTableRows} >+</button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TableRows rowsData={tRowsData} deleteTableRows={tDeleteTableRows} handleChange={tHandleChange} />
                                            </tbody>
                                        </table>
                                    </Col>
                                    <Col className="col-md-6">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Non Techical Skills</th>
                                                    <th>Level</th>
                                                    <th><button className="btn btn-outline-success" onClick={ntAddTableRows} >+</button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TableRows rowsData={ntRowsData} deleteTableRows={ntDeleteTableRows} handleChange={ntHandleChange} />
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row><Row>
                                    <Col className="col-md-4">
                                        <button id="editEmployeeBtn" className="btn btn-success" onClick={saveEmployee} >Save</button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class TechnicalSkill extends Component {
    render() {
        var skill = this.props.skill;
        return (
            <tr>
                <th className="table_header"> {skill.skillName} </th>
                <td className="table_data">
                    <input className="skillInput" id={skill.skillName} defaultValue={skill.expertiseLevel} /></td>
            </tr>
        )
    }
}

export default EditEmpSkillComponentNew;