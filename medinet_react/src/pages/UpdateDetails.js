import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";

const UpdateDetails = () => {

    const [formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        location: '',
        medicalHistory: ''
    });

    //handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('FORM DATA', formData);
        
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            dateOfBirth: '',
            location: '',
            medicalHistory: ''
        })
    };

    return (
        <div >
            <div style={{marginTop: '10px', marginBottom: '10px' }} >
                <h2><b>Update your profile</b></h2>
            </div>
            <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Form onSubmit={handleSubmit} style={{width: '40%'}}>
                    <Form.Group controlId='firstName' style={{textAlign: 'left'}}>

                        <Form.Label className="col-sm-12"><b>First Name</b></Form.Label>
                       
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                        />
                        

                    </Form.Group>

                    <Form.Group controlId="lastName" style={{textAlign: 'left'}} >
                        <Form.Label><b>Last Name</b></Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="dateOfBirth" style={{textAlign: "left"}} >
                        <Form.Label><b>Date of Birth</b></Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="phoneNumber" style={{textAlign: 'left'}} >
                        <Form.Label><b>Contact Number</b></Form.Label>
                        <Form.Control
                            type="tel"
                            name="phoneNumber"
                            placeholder="+254712345678"
                            value={formData.phoneNumber}
                            onChange={handleChange}

                    />
                    </Form.Group>

                    <Form.Group controlId="location" style={{textAlign: 'left'}} >
                        <Form.Label><b>Location</b></Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            placeholder="Enter your location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group controlId="medicalHistory" style={{textAlign: 'left'}}>
                        <Form.Label><b>Medical History</b></Form.Label>
                        <Form.Control
                            type="text"
                            name="medicalHistory"
                            placeholder="Enter comma separated values"
                            value={formData.medicalHistory}
                            onChange={handleChange}
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

export default UpdateDetails
