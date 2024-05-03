import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import services from '../sample_data/services.json';


const ServiceDetails = () => {
    let { id } = useParams();

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