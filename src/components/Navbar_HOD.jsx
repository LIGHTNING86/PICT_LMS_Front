import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navbar4() {
  return (
    <>
      <Navbar bg="light" className="text-white bg-opacity-20 shadow-lg">
        <Container>
        <Navbar.Brand href="/dashboard">
            <img
              alt=""
              src="../src/assets/unilogo2.png" 
              width="60"
              height="60"
              className="d-inline-block align-center"
            />{' '}
            <span className="text-3xl font-bold ml-5 text-regal-blue">PICT LMS</span>
          </Navbar.Brand>
          <Nav className="me-right text-lg font-bold">
            <Nav.Link href="/dashboard_hod">Dashboard</Nav.Link>
            {/* <Nav.Link href="/leavepage_hod">Leave Form</Nav.Link> */}
            {/* <Nav.Link href="/register">Register</Nav.Link> */}
            <Nav.Link href="/hod_applications">All Applications</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
