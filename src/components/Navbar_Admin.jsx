import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../../styles/Navbar.css'; // Import your custom CSS
import axios from 'axios';

export default function Navbar2() {
  const [_id, setID] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setID(response.data._id);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Navbar bg="light" className="navbar-custom text-white bg-opacity-20 shadow-lg">
      <Container>
      <Navbar.Brand as={Link} to="/dashboard_admin" className="d-flex align-items-center">
          <img
            alt=""
            src="../src/assets/unilogo2.png"
            width="60"
            height="60"
            className="d-inline-block align-center"
          />{' '}
          <span className="text-3xl font-bold ml-3 text-regal-blue">PICT LMS</span>
        </Navbar.Brand>
        <Nav className="me-right text-lg font-bold">
          <CustomNavLink to="/dashboard_admin">Dashboard</CustomNavLink>
          <CustomNavLink to={`/updateAdminProfile/${_id}`}>Update Profile</CustomNavLink>
          <NavDropdown title="Register User" id="basic-nav-dropdown">
            <CustomDropdownItem to="/registerStudent">Register Student</CustomDropdownItem>
            <CustomDropdownItem to="/registerFaculty">Register Faculty</CustomDropdownItem>
            <CustomDropdownItem to="/registerAdmin">Register Admin</CustomDropdownItem>
          </NavDropdown>
          <CustomNavLink to="/users">Users</CustomNavLink>
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

  function CustomDropdownItem({ to, children }) {
    const isActive = location.pathname === to;

    return (
      <NavDropdown.Item
        as={Link}
        to={to}
        className={`dropdown-item ${isActive ? 'active' : ''}`}
        style={{ color: isActive ? '#00000' : '' }} // Change color based on isActive
      >
        {children}
      </NavDropdown.Item>
    );
  }
}
