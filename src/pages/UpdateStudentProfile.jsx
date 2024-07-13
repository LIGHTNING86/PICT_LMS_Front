import { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import { UserContext } from "../../context/userContext";
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar1 from "../components/Navbar"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UpdateStudentProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { registrationNo } = useParams();
  const [originalData, setOriginalData] = useState({});
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    class: '',
    facultyID: '',
    mentorID: '',
    rollNo: '',
    registrationNo: '',
    contactNo: '',
    address: ''
  });
  const fetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!registrationNo) {
        if (!fetchedData.current) {
          toast.error('Invalid registration number');
          fetchedData.current = true;
        }
        navigate('/dashboard');
        return;
      }

      try {
        const response = await axios.get(`/api/students/${registrationNo}`);
        setOriginalData(response.data);
        setData(response.data);
      } catch (error) {
        toast.error('Error fetching student data');
        console.error(error);
      }
    };

    fetchData();
  }, [registrationNo, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/students/${registrationNo}`, data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Update failed. Please try again.');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const revertChanges = () => {
    setData(originalData);
  };

  return (
    <div className="w-screen min-h-screen text-white">
      <div>
        <Navbar1 />
      </div>
      <Form onSubmit={updateProfile}>
        <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>
              Update Profile - {!!user && (<span className="text-blue-700">{user.name}</span>)}
            </span>
          </div>
          <div className='grid grid-cols-2'>
            <div className='text-white mt-3 mr-2'>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type="text"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={data.name}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name='email'
                  type="email"
                  placeholder="Enter your Email"
                  onChange={handleChange}
                  value={data.email}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type="password"
                  placeholder="Set your Password"
                  onChange={handleChange}
                  value={data.password}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  name='dateOfBirth'
                  type="date"
                  placeholder="Enter your Date of Birth"
                  onChange={handleChange}
                  value={data.dateOfBirth}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="class">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  name='class'
                  type="text"
                  placeholder="Enter your Class"
                  onChange={handleChange}
                  value={data.class}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="facultyID">
                <Form.Label>CC ID</Form.Label>
                <Form.Control
                  name='facultyID'
                  type="text"
                  placeholder="Enter your CC's ID"
                  onChange={handleChange}
                  value={data.facultyID}
                />
              </Form.Group>
            </div>
            <div className='text-white mt-3 ml-2'>
              <Form.Group className="mb-3" controlId="rollNo">
                <Form.Label>Roll Number</Form.Label>
                <Form.Control
                  name='rollNo'
                  type="text"
                  placeholder="Enter your Roll Number"
                  onChange={handleChange}
                  value={data.rollNo}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registrationNo">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  name='registrationNo'
                  type="text"
                  placeholder="Enter your Registration Number"
                  onChange={handleChange}
                  value={data.registrationNo}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactNo">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  name='contactNo'
                  type="text"
                  placeholder="Enter your Contact No"
                  onChange={handleChange}
                  value={data.contactNo}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name='address'
                  as="textarea"
                  placeholder="Enter your Address"
                  onChange={handleChange}
                  value={data.address}
                  style={{ height: "120px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mentorID">
                <Form.Label>Mentor ID</Form.Label>
                <Form.Control
                  name='mentorID'
                  type="text"
                  placeholder="Enter your Mentor's ID"
                  onChange={handleChange}
                  value={data.mentorID}
                />
              </Form.Group>
            </div>
          </div>
          <div>
            <Button type="submit" style={{ border: "none" }} className='bg-blue-600 hover:bg-blue-800'>Update</Button>
            <Button type="button" style={{ border: "none" }} onClick={revertChanges} className='ml-2 bg-red-600 hover:bg-red-800'>Revert</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
