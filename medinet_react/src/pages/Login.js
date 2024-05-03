import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleLogin = async () => {
        try{
            const response = await axios.post('http://localhost:8000/accounts/login/',
            {username, password},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            if (response.ok){
                console.log('Login succesful:', response.data);
            }
        
        } catch (error) {
            
            setError('Invalid username or password')
        }
    };

    return (
        <div>

            <Form onSubmit={handleLogin}>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />  
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />  
                </Form.Group>

                <Button type="submit"><small>Login</small></Button>
                {error  && <div style={{ color: 'red'}}>{error}</div>}

            </Form>

        </div>

    )
};

export default Login;