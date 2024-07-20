import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import practitioners from '../sample_data/practitioners.json';
import SearchBar from "../components/SearchBar";
import homepageImage from '../assets/images/emergency_room.jpg'

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
                  <div>
                    <img src={homepageImage} style={{ width: '70%', height: '50' }} />
                  </div>
                  <Link to="/practitioners">
                    <Button variant="primary" className="m-2">Find Practitioners</Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="secondary" className="m-2">View Services</Button>
                  </Link>
                  <div>
                    <Link to="/about">
                      <Button variant="info" className="m-2">About Us</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
        </>
          );

        }

export default HomePage;