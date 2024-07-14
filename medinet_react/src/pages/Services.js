import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
/*import services from '../sample_data/services.json';*/
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"
import { useParams } from 'react-router-dom'


const ServicesList = ({services, setResults, filteredData}) => {
    
    const searchContent = "Get Full body health checkups from the comfort of your home";
    return (

        <>
            <div>
                <div style={{marginTop:'15px'}}>
                    <h2><b>Seach for Services</b></h2>
                </div>
                <div>
                    <SearchBar data={services} setSearchResults={setResults} details={searchContent} />
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
        </>

        );
};


const PractitionersList = ({practitioners, setResults, filteredData}) => {
    
    const searchContent = "Search for Doctors";

    return (

        <>
            <div>
                <div style={{marginTop:'15px'}}>
                    <h2><b>Search for Doctors</b></h2>
                </div>
                <div>
                    <SearchBar data={practitioners} setSearchResults={setResults} details={searchContent} />
                </div>
                <div style={{margin: '20px 20px 20px 20px'}}>
                    <Row>
                            {filteredData.map((practitioner) => (
                                <Col>
                                    <Card style={{marginTop: '20px', width: '100%', height: '70vh'}}>
                                        <Link to={`/practitioners/${practitioner.id}`} style={{textDecoration: 'none'}} >
                                            <Card.Title><b>{practitioner.username}</b></Card.Title>
                                            <Card.Img src={practitioner.image} alt="Image" style={{width: '215px', height: '200px'}}/>
                                            <Card.Body>
                                                <div>
                                                    <p><b>$ 3000</b></p>
                                                    <p>{practitioner.description}</p>
                                                    {/*typeof service.services == 'string' ? (
                                                        <p><b>Service: </b>{service.services}</p>
                                                    ) : (
                                                        <b><p>Services: ...</p></b>
                                                    )
                                                    */}
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
        </>

        );
};


const Services = () => {


    const [services, setServices] = useState([]);
    const [token, setToken] = useState(''); 
    const [filteredData, setfilteredData] = useState([]);
    const { authTokens } = useAuth();
    const { type } = useParams();

    console.log("typea1", type)

    useEffect(() => {
        const fetchData = async () => {

            if (!authTokens) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/${type}` , {
                    method: 'GET',
                    mode: 'cors', // Ensure CORS mode is set to 'cors'
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json', // Change Accept header to 'application/json'
                       // 'Authorization': `Bearer ${authTokens.access}`,
                    }
                });
    
                if (!response.ok) {
                    console.log("type", type)
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setServices(data);
                console.log("services:", services)
                //console.log("data:", data)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [token, type]);

    const UpdateResults = (results) => {
        setfilteredData(results);
    };

    console.log("filtered data:", filteredData)

    const searchContent = "Search for Services";

    if (services.length < 1) {
        return (
            <div>
                <p>Page Not Found</p>
            </div>
        )
    }

    return (
        <div>
            { type === "services" ? (
                <ServicesList services={services} setResults={UpdateResults} filteredData={filteredData}/>
            ) : (
                <PractitionersList practitioners={services} setResults={UpdateResults} filteredData={filteredData} />
            )
            };
        </div>


    )

    

}

export default Services