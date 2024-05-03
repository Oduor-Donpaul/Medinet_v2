import React, { useState } from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';
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
        <div>
            <div>
                {/* text input for searching doctors*/}
                <SearchBar data={practitioners} setSearchResults={setSearchResults} details={searchContent}/>
            </div>
            <Row className="m-4 ">
                {filteredData.map((practitioner) => (
                    <Col key={practitioner.id} xs={12} md={6} lg={3}>
                        <Card style={{ width: '100%', marginTop: '15px' }} >
                            <Link to={`/practitioners/${practitioner.id}`} style={{textDecoration: 'none'}} >
                                <Card.Img variant="top" src={practitioner.image} alt="Image" style={{ height: "200px", width: "215px" }} />
                                <Card.Body>
                                    <Card.Title><b>{practitioner.name}</b></Card.Title>
                                    <Card.Text  >
                                        <p>{practitioner.speciality}</p>
                                        <p>Experience: {practitioner.experience}</p>
                                        <div >
                                            <div>
                                                <small>Avilability: {practitioner.availability}</small>
                                            </div>
                                            <Button className="ms-right" ><small>Book Now</small></Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div>

            </div>


        </div>

    )
}

export default HomePage;