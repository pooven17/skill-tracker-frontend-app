import { Col, Row } from "react-bootstrap";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as Constants from "./SkillTrackerConstant";


const SigninComponent = () => {
    const [userName, setUserNamed] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const SignIn = (e) => {
        e.preventDefault();
        if (userName === '' || password === '') {
            setErrorMessage("Credentials should not be Empty");
        } else {
            var formBody = {
                'username': userName,
                'password': password
            };

            axios.post(Constants.HOST_URL + '/skill-tracker/signin', formBody)
                .then(function (response) {
                    const tokenTemp = response.data.token;
                    let roles = response.data.roles;
                    if (roles.includes("ROLE_ADMIN")) {
                        navigate('/search-employee-skill', {
                            state: {
                                jsToken: tokenTemp,
                                roles: roles,
                                userName: userName
                            }
                        });
                    } else {
                        navigate('/employee-skills', {
                            state: {
                                jsToken: tokenTemp,
                                roles: roles,
                                userName: userName,
                                criteria: 'Id',
                                value: userName
                            }
                        });
                        setErrorMessage(userName + ' has role of ' + roles + ". Not Authorized to see Profile Details");
                    }
                    return
                })
                .catch(function (error) {
                    //setUserNamed("");
                    //setPassword("");
                    setErrorMessage("User Name or Password is Wrong");
                    console.log(error);
                });
        }
    }

    const ChangeUserNameHandler = (event) => {
        setUserNamed(event.target.value);
    }

    const ChangePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 siginin">
                        {<h3 className="text-center">Signin</h3>}
                        <div className="card-body">
                            <form>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> User Name: </label>
                                            <input placeholder="Username" name="userName" className="form-control"
                                                value={userName} onChange={ChangeUserNameHandler} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> Password: </label>
                                            <input type="password" placeholder="Password" name="password" className="form-control"
                                                value={password} onChange={ChangePasswordHandler} />
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <button className="btn btn-success" onClick={SignIn}>Signin</button>
                                {errorMessage && <div className="error"> {errorMessage} </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SigninComponent;