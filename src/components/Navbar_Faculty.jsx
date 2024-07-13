import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/Navbar.css'; // Import your custom CSS

export default function Navbar3() {
  const [facultyID, setFacultyID] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setFacultyID(response.data.facultyID);
      } catch (error) {
        console.error('Error fetching faculty profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Navbar bg="light" className="navbar-custom text-white bg-opacity-20 shadow-lg w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard_faculty" className="d-flex align-items-center">
          <img
            alt=""
            src="../src/assets/unilogo2.png"
            width="60"
            height="60"
            className="d-inline-block align-center"
          />{' '}
          <span className="text-3xl font-bold ml-3 text-regal-blue">PICT LMS</span>
        </Navbar.Brand>
        <Nav className="ml-auto text-lg font-bold">
          <CustomNavLink to="/dashboard_faculty">Dashboard</CustomNavLink>
          <CustomNavLink to={`/updateFacultyProfile/${facultyID}`}>Update Profile</CustomNavLink>
          <CustomNavLink to="/register_faculty">Add Student (Mentor)</CustomNavLink>
          <CustomNavLink to="/faculty_applications">Applications</CustomNavLink>
        </Nav>
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
