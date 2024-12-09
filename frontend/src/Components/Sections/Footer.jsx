import React from 'react'
import {Container , Row , Col} from 'react-bootstrap';
const Footer = () => {
    const currentYear = new Date().getFullYear();


  return (
   <footer className='bg-dark'>
        <Container>
            <Row>
                <Col className='text-center pt-3'>
                    <p className='text-light'>Book My Ground &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
   </footer>
  )
}

export default Footer