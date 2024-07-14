import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap'
const About = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                          <h2>About Medinet</h2>
                          <p>
                            Welcome to Medinet, your comprehensive healthcare management platform designed to simplify your healthcare experience. At Medinet, we provide a wide range of services to help you manage your health efficiently and effectively.
                          </p>
                          <h3>Practitioners and Services Listings</h3>
                          <p>
                            Our platform offers a detailed directory of healthcare practitioners and services, making it easy for you to find the right medical professionals and services for your needs. Whether you are looking for a general practitioner, a specialist, or a specific healthcare service, Medinet has got you covered.
                          </p>
                          <h3>Health Risk Assessment</h3>
                          <p>
                            Understanding your health risks is crucial for maintaining good health. Medinet provides tools to help you assess your health risks based on various factors such as age, lifestyle, and medical history. Our goal is to empower you with the knowledge you need to take proactive steps towards a healthier life.
                          </p>
                          <h3>Disease Prediction</h3>
                          <p>
                            Our platform is designed to analyze symptoms and predict potential diseases, although this feature is not yet fully integrated. Once implemented, our disease prediction tool will offer valuable insights to help you understand potential health issues and seek timely medical advice.
                          </p>
                          <p>
                            At Medinet, we are committed to enhancing your healthcare journey through innovative technology and user-friendly solutions. Thank you for choosing Medinet as your trusted healthcare partner.
                          </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default About;