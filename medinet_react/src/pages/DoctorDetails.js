import React from "react";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
//import practitioners from '../sample_data/practitioners.json'


const DocterDetails = () => {
    let { id } = useParams();
    let { type } = useParams();
    const [ practitioners, setPractitioners ] = useState([]);


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
                setPractitioners(data);
                console.log("practitioners:", practitioners)
                //console.log("data:", data)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id, type]);

    const view = practitioners.filter((practitioner) => (
        practitioner.id == id
    ))

    console.log("view:", view)

    return (
        <div>
            <div>
                {view.map((item) => (
                    <Card style={{alignItems: "center", marginTop: '15px'}}>
                        <h2><b>{item.username}</b></h2>
                        <Card.Img src={item.image} alt="Image" style={{width: "300px", height: "300px"}} />
                        <Card.Body>
                            <p>Specialization: {item.speciality}</p>
                            <p>Availability: {item.availability}</p>
                            <div>
                                <Link to={`/${type}/${item.id}/book`}>
                                    <Button><small>Book Now</small></Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {/*<div>
                <h4>Services</h4>
                <ol>
                    <li>Item one</li>
                    <li>Iem 2</li>
                    <li>Item 3</li>
                </ol>
            </div>
            */}
        </div>
    )
}

export default DocterDetails