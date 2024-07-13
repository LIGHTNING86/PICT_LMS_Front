import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar2 from "../components/Navbar_Admin";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RegisterAdmin() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
        const { data: responseData } = await axios.post('/api/auth/register', {
        ...data,
        userType: 'admin'
        });
      if (responseData.error) {
        if (responseData.error.includes("duplicate key error")) {
          toast.error('User already exists!');
        } else {
          toast.error(responseData.error);
        }
      } else {
        setData({
            name: '', email: '', password: ''});
        toast.success('Admin registered successfully!');
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
    });
    toast.success("Form Reset Successfully!");
  };

  return (
    <div className="w-screen min-h-screen text-white">
        <div>
            <Navbar2 />      
        </div>
      <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
        <div>
          <span className='text-white text-3xl font-bold'>
            Register an Admin - {!!user && (<span className="text-blue-700">{user.name}</span>)}
          </span>
        </div>
        <Form onSubmit={registerUser}>
          <Form.Group className="mb-2 mt-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              type="text"
              placeholder="Enter admin's name"
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
              placeholder="Enter admin's Email"
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
          <Button type="submit" style={{ border: "none" }} className='bg-blue-600 hover:bg-blue-800'>Register</Button>
          <Button type="reset" onClick={resetForm} style={{ border: "none" }} className='ml-2 bg-red-600 hover:bg-red-800'>Reset</Button>
        </Form>
      </div>
    </div>
  );
}
