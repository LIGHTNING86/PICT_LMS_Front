import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/Navbar.css';

export default function Navbar1() {
  const [registrationNo, setRegistrationNo] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setRegistrationNo(response.data.registrationNo);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom text-white bg-opacity-20 shadow-lg w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
          <img
            alt=""
            src="../src/assets/unilogo2.png"
            width="60"
            height="60"
            className="d-inline-block align-center"
          />{' '}
          <span className="text-2xl md:text-3xl font-bold ml-3 text-regal-blue">PICT LMS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto text-lg font-bold">
            <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
            <CustomNavLink to={`/updateStudentProfile/${registrationNo}`}>Update Profile</CustomNavLink>
            <CustomNavLink to="/leavePage">Leave Form</CustomNavLink>
            <CustomNavLink to="/student_applications">My Applications</CustomNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  function CustomNavLink({ to, children }) {
    const isActive = location.pathname === to;

    return (
      <Nav.Link
        as={Link}
        to={to}
        className={`nav-link ${isActive ? 'active' : ''}`}
        style={{ color: isActive ? '#ff4500' : '' }} // Change color based on isActive
      >
        {children}
      </Nav.Link>
    );
  }
}