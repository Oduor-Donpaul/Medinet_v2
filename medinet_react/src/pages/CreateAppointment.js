import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

const CreateAppointmentForm = ({defaulPractitioner, defaultService}) => {
    const [ serviceData, setServiceData ] = useState({});
    let { bookingId } = useParams();
    const { authTokens, user } = useAuth();

    console.log("booking Id:", bookingId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/service/${bookingId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                })
                if (!response.ok){
                    throw new Error("Network error")
                }
                const data = await response.json();
                console.log("booking data:", data)
                setServiceData(data);

                setFormData(prevFormData => ({
                    ...prevFormData,
                    practitioner: data.Practitioner.username ,
                    service: data.name || ''
                }))
            } catch (error){
                console.log("error fetching data:", error)
            }
        };
        fetchData();
    }, [bookingId])

    const currentDateandTime = () => {
        const now = new Date();
        return{
            date: now.toISOString().split('T')[0], //YYYY-MM-DD format
            time: now.toTimeString().split('')[0].slice(0, 5), //HH:MM:SS format
        }
    }

    console.log("service data:", serviceData)

    const { date, time } = currentDateandTime();

    const [formData, setFormData] = useState({
        patient: user.username,
        practitioner: serviceData.practitioner || '',
        service: serviceData.name || '',
        dateCreated: date,
        appointmentDate: '',
        time: time,
        status: 'pending'
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("form data2", formData);

        try {
            const response = await axios.post(
                    'http://localhost:8000/api/appointments/',
                    formData,
                    {
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': `Bearer ${authTokens.access}`
                        }
                    }
            );
            console.log("Appointment created:", response.data);
        } catch (error) {
            console.error('Error creating appointment:', error)
        }

        console.log("data submitted", formData);

        setFormData({
            dateCreated: date,
            appointmentDate: "",
            time: ""
        })
    }

    return (
        <div style={{width: '100%'}}>
            <div>
                <h2><b>Create Appointment</b></h2>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="patient">
                        <Form.Label>Patient</Form.Label>
                        <Form.Control
                            type="text"
                            name="patient"
                            value={formData.patient}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="practitioner">
                        <Form.Label>Practitioner</Form.Label>
                        <Form.Control
                            type="text"
                            name="practitioner"
                            value={formData.practitioner}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="service">
                        <Form.Label>Service</Form.Label>
                        <Form.Control
                            type="text"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="dateCreated">
                        <Form.Label>Date Created</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateCreated"
                            value={formData.dateCreated}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="appointmentDate">
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>


                    <Form.Group controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}

                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{marginTop: '15px'}} >
                        <small>Submit</small>
                    </Button>
                </Form>
            </div>
        </div>

    )
}

export default CreateAppointmentForm;