import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
/*import services from '../sample_data/services.json';*/
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Services = () => {


    const [services, setServices] = useState([]);
    const [filteredData, setfilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/services', {
                    method: 'GET',
                    mode: 'no-cors', // Ensure CORS mode is set to 'cors'
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json', // Change Accept header to 'application/json'
                        // Add any other headers if needed
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setServices(data);
                console.log("services", services)
                console.log("data:", data)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const UpdateResults = (results) => {
        setfilteredData(results);
    };

    console.log("filtered data:", filteredData)

    const searchContent = "Search for Services";

    return (
        <div>
            <div style={{marginTop:'15px'}}>
                <h2><b>Get Full body health checkups from the comfort of your home</b></h2>
            </div>
            <div>
                <SearchBar data={services} setSearchResults={UpdateResults} details={searchContent} />
            </div>
            <div style={{margin: '20px 20px 20px 20px'}}>
                <Row>
                        {filteredData.map((service) => (
                            <Col>
                                <Card style={{marginTop: '20px', width: '100%', height: '70vh'}}>
                                    <Link to={`/services/${service.id}`} style={{textDecoration: 'none'}} >
                                        <Card.Title><b>{service.name}</b></Card.Title>
                                        <Card.Img src={service.image} alt="Image" style={{width: '215px', height: '200px'}}/>
                                        <Card.Body>
                                            <div>
                                                <p><b>$ 3000</b></p>
                                                <p>{service.description}</p>
                                                {typeof service.services == 'string' ? (
                                                    <p><b>Service: </b>{service.services}</p>
                                                ) : (
                                                    <b><p>Services: ...</p></b>
                                                )
                                                }
                                            </div>
                                            <div>
                                                <Button>Book Now</Button>
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    )
}

export default Services