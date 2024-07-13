import { useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from "../../context/userContext";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar_Admin";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Register_Faculty() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    department: '',
    position: '',
    cc_class: '',
    facultyID: '',
    mentorID: '',
    contactNo: '',
    address: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { data: responseData } = await axios.post('/api/auth/register', {
        ...data,
        userType: 'faculty'
      });

      if (responseData.error) {
        if (responseData.error.includes("duplicate key error")) {
          toast.error('User already exists!');
        } else {
          toast.error(responseData.error);
        }
      } else {
        setData({
          name: '', email: '', password: '', dateOfBirth: '', department: '', position: '', facultyID: '', mentorID: '', contactNo: '', address: ''
        });
        toast.success('Faculty Registered Successfully!');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.includes("duplicate key error")) {
          toast.error('User already exists!');
        } else {
          toast.error(error.response.data.error);
        }
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData({
      name: '',
      email: '',
      password: '',
      dateOfBirth: '',
      department: '',
      position: '',
      cc_class: '',
      facultyID: '',
      mentorID: '',
      contactNo: '',
      address: ''
    });
    toast.success("Form Reset Successfully!");
  };

  return (
    <div className="w-screen min-h-screen text-white">
      <div>
        <Navbar2 />
      </div>
      <Form onSubmit={registerUser}>
        <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>
              Register a Faculty - {!!user && (<span className="text-blue-700">{user.name}</span>)}
            </span>
          </div>
          <div className='grid grid-cols-2'>
            <div className='text-white mt-3 mr-2'>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type="text"
                  placeholder="Enter faculty's name"
                  onChange={handleChange}
                  value={data.name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name='email'
                  type="email"
                  placeholder="Enter faculty's Email"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type="password"
                  placeholder="Set a Password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  name='dateOfBirth'
                  type="date"
                  placeholder="Enter faculty's Date of Birth"
                  onChange={handleChange}
                  value={data.dateOfBirth}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  name='department'
                  type="text"
                  placeholder="Enter faculty's Department"
                  onChange={handleChange}
                  value={data.department}
                  required
                />
              </Form.Group>
            </div>
            <div className='text-white mt-3 ml-2'>
              <Form.Group className="mb-3" controlId="cc_class">
                <Form.Label>Teaching (CC Class)</Form.Label>
                <Form.Control
                  name='cc_class'
                  type="text"
                  placeholder="Enter faculty's CC CLass"
                  onChange={handleChange}
                  value={data.cc_class}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="facultyID">
                <Form.Label>Faculty/CC ID</Form.Label>
                <Form.Control
                  name='facultyID'
                  type="text"
                  placeholder="Enter faculty's Faculty/CC ID"
                  onChange={handleChange}
                  value={data.facultyID}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mentorID">
                <Form.Label>Mentor ID</Form.Label>
                <Form.Control
                  name='mentorID'
                  type="text"
                  placeholder="Enter faculty's Mentor ID"
                  onChange={handleChange}
                  value={data.mentorID}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactNo">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  name='contactNo'
                  type="text"
                  placeholder="Enter faculty's Contact No"
                  onChange={handleChange}
                  value={data.contactNo}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name='address'
                  type="text"
                  placeholder="Enter faculty's Address"
                  onChange={handleChange}
                  value={data.address}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div>
            <Button type="submit" style={{ border: "none" }} className='bg-blue-600 hover:bg-blue-800'>Register</Button>
            <Button type="reset" onClick={resetForm} style={{ border: "none" }} className='ml-2 bg-red-600 hover:bg-red-800'>Reset</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
