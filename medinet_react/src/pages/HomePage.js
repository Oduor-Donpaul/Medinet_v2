import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import practitioners from '../sample_data/practitioners.json';
import SearchBar from "../components/SearchBar";


const HomePage = () => {
    const [filteredData, setfilteredData] = useState([]);

    const setSearchResults = (results) => {
        setfilteredData(results)

    };
    const searchContent = "Search for Doctors";

    return (
        <>
            <Container className="text-center mt-5">
              <Row>
                <Col>
                  <h1>Welcome to Medinet</h1>

                  <p>Your go-to platform for booking medical appointments with ease.</p>
                  <img src={`${process.env.PUBLIC_URL}/images/emergency_room.jpg`} alt={{ width: '10%', height: 'auto' }} />
                  <Link to="/practitioners">
                    <Button variant="primary" className="m-2">Find Practitioners</Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="secondary" className="m-2">View Services</Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="info" className="m-2">About Us</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
        </>
          );

        }

export default HomePage;