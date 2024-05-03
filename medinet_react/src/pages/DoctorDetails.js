import React from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import practitioners from '../sample_data/practitioners.json'


const DocterDetails = () => {
    let { id } = useParams();

    const view = practitioners.filter((practitioner) => (
        practitioner.id == id
    ))

    console.log(view)

    return (
        <div>
            <div>
                {view.map((item) => (
                    <Card style={{alignItems: "center", marginTop: '15px'}}>
                        <h2><b>{item.name}</b></h2>
                        <Card.Img src={item.image} alt="Image" style={{width: "300px", height: "300px"}} />
                        <Card.Body>
                            <p>Specialization: {item.speciality}</p>
                            <p>Availability: {item.availability}</p>
                            <div>
                                <Link to={`/practitioner/${item.id}/book`}>
                                    <Button><small>Book Now</small></Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div>
                <h4>Services</h4>
                <ol>
                    <li>Item one</li>
                    <li>Iem 2</li>
                    <li>Item 3</li>
                </ol>
            </div>
        </div>
    )
}

export default DocterDetails