import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
        if (existingUser) {
            setUser(existingUser);
        }
    }, []);

    // Logout
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existingUser");
        navigate('/');
    };

    return (
        <div>
            <Navbar expand="lg" className='bg-primary'>
                <Container fluid>
                    <Navbar.Brand className='ms-5' style={{ color: "white", fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold' }}>TURBO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto" style={{ padding: '10px' }}>
                        </Nav>
                    </Navbar.Collapse>
                    <h5 className='mt-3 mr-3 '><span className='text-light'>{user.username}</span></h5>
                                      
                            <button onClick={handleLogout} className='btn btn-primary'><h5><i className="fa-solid fa-power-off text-danger mt-3 ms-1"></i></h5></button>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
