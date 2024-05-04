import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../context/AuthContext';

const MyNavbar = () => {
    let [user, setUser] = useState(AuthContext);
    let logoutUser = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark" expanded="bg" >
                    <Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>
                    <Navbar.Toggle aria-controls = "basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/services">Services</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div>
                <Link to="/">Home</Link>
                <span> | </span>
                {user ? (
                    <p onClick={logoutUser} >Logout</p>
                ) : (
                    <Link to="/login" >Login</Link>
                ) }
                {user && <p>Hello {user.username}</p>}
            </div>
        </div>
    )
}

export default MyNavbar;