import React, { useContext, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../context/AuthContext";


const Login = () => {
   
    let { loginUser } = useContext(AuthContext);

    return (
        <div>

            <Form onSubmit={loginUser}>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        
                    />  
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                       
                    />  
                </Form.Group>

                <Button type="submit"><small>Login</small></Button>
            

            </Form>

        </div>

    )
};

export default Login;