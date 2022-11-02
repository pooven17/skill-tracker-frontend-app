import React, { useEffect, useState, Component } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EmpSkillListComponent = props => {
    let location = useLocation();

    useEffect(() => {
        setJsToken(location.state.jsToken);
        setCriteria(location.state.criteria);
        setValue(location.state.value);
        setUserName(location.state.userName);
        setRoles(location.state.roles);
        
        if (criteria === 'All') {

            SkillTrackerService.getAllEmployee(jsToken)
                .then(res => {
                    setEmployees(res.data);
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
        else if (criteria === 'Id') {
            SkillTrackerService.getEmployeeById(value, jsToken, roles)
                .then(res => {
                    setEmployees(res.data);
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
        } else if (criteria === 'Name') {
            SkillTrackerService.getEmployeeByName(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
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
        } else if (criteria === 'Skill') {
            SkillTrackerService.getEmployeeBySkill(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
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

    const [criteria, setCriteria] = useState(location.state.criteria);
    const [value, setValue] = useState(location.state.value);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();

    const searchEmployee = () => {
        navigate('/search-employee-skill', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles
            }
        });
    }

    const editEmployee = (id) => {
//
        navigate('/edit-employee-skill', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles,
                criteria: 'Id',
                value: id
            }
        });
    }


    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 siginin">
                        <h3 className="text-center">Employees List</h3>
                        <div className="buttonPositions">
                            <button id="searchEmployeeBtn" className="btn btn-success" onClick={searchEmployee} > Go Back</button>
                        </div>
                        <br></br>
                        <div>
                            <Row>
                                {errorMessage && <div className="error"> {errorMessage} </div>}
                            </Row>
                        </div>
                        <div>
                            {
                                employees.map(employee =>
                                    <div>
                                        <div className="empDetails">
                                            <Row>
                                                <Col className="col-md-4">
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
                                                <Col className="col-md-3">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th className="table_header_1">Technical Skills</th>
                                                                <td className="table_header_1">Level</td>
                                                            </tr>

                                                            {employee.technicalSkills.map(skill => <TechnicalSkill skill={skill} />)}
                                                        </tbody>
                                                    </table>
                                                </Col>
                                                <Col className="col-md-3">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th className="table_header_1">Non Technical Skills</th>
                                                                <td className="table_header_1">Level</td>
                                                            </tr>
                                                            {employee.nonTechnicalSkills.map(skill => <TechnicalSkill skill={skill} />)}
                                                        </tbody>
                                                    </table>
                                                </Col>
                                                <Col className="col-md-2">
                                                    <button id="editEmployeeBtn" className="btn btn-success" onClick={(event) => { editEmployee(employee.associateId) }} >Edit</button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <br />
                                    </div>
                                )
                            }
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
                <td className="table_data"> {skill.expertiseLevel}</td>
            </tr>
        )
    }
}

export default EmpSkillListComponent;