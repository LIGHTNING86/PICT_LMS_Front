import React from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <Container>
    <Row>
      <Col xs={6} md={4}>
        <Button variant="primary" size="lg">
          Large button
        </Button>{' '}

      </Col>
      <Col xs={6} md={4}>
        <Image src="holder.js/171x180" roundedCircle />
      </Col>
      <Col xs={6} md={4}>
        <Image src="holder.js/171x180" thumbnail />
      </Col>
    </Row>
  </Container>
  )
}
