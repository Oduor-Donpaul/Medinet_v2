import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../context/AuthContext';

const MyNavbar = () => {
    let { user, logoutUser } = useContext(AuthContext);
    
    return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark" expanded="lg" >
                    <Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>
                    <Navbar.Toggle aria-controls = "basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/services">Services</Nav.Link>
                            <Nav.Link as={Link} to="/practitioners">Practitioners</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div>
                {!user ? (
                     <Link to="/login" >Login</Link>
                ) : (

                    <>
                        <p style={{ display: 'inline' }}> Welcome {user.username} </p>
                        <span> | </span>
                        
                        <p onClick={logoutUser} style={{ cursor: 'pointer', display: 'inline' }} >Logout</p>
                    </>
                   
                ) }
            </div>
        </div>
    )
}

export default MyNavbar;