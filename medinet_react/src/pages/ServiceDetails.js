import React from "react";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
//import services from '../sample_data/services.json';


const ServiceDetails = () => {
    let { id } = useParams();
    let { type } = useParams();
    const [ services, setServices] = useState([]);



        useEffect(() => {
        const fetchData = async () => {

            //if (!authTokens) return;

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
    }, [id, type]);

        const view = services.filter((service) => (
        service.id == id
    ))

    console.log(view)

    return (
        <div>
            <div>
                {view.map((item) => (
                    <Card style={{alignItems: "center", marginTop: '15px'}}>
                        <h2><b>{item.name}</b></h2>
                        <Card.Img src={item.image} alt="Image" style={{width: "300px", height: "300px"}} />
                        <Card.Body style={{width: '100%'}} >
                            <p>{item.description}</p>
                            <p><b>Services</b></p>
                            {typeof item.services == 'string' ? 
                                (<p>{item.services}</p>) :
                                (<ol>

                                {Array.isArray(item.services) &&
                                item.services.map(service => 
                                    (<div style={{width: '100%'}}>
                                        
                                            <li>
                                                <div style={{width: '80%'}} >
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}} >
                                                        <div style={{flex: '1'}} >
                                                            <p><b>{service.name}</b></p>
                                                        </div>
                                                        <div style={{flex: '1', textAlign: 'right'}} >
                                                            <p><b>{service.price}</b></p>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    <p>{service.description}</p>
                                                </div>
                                            </li>
                                        
                                    </div>))}
                                </ol>
                                ) 
                            }
                            <div>
                                <Link to={`/services/${item.id}/book`}>
                                    <Button><small>Book Now</small></Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ServiceDetails