import { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import { UserContext } from "../../context/userContext";
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar2 from "../components/Navbar_Admin";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UpdateAdminProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { _id } = useParams(); 
  const [originalData, setOriginalData] = useState({});
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const fetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!_id) {
        if (!fetchedData.current) {
          toast.error('Invalid ID');
          fetchedData.current = true;
        }
        navigate('/dashboard_admin');
        return;
      }

      try {
        const response = await axios.get(`/api/admin/${_id}`);
        setOriginalData(response.data);
        setData(response.data);
      } catch (error) {
        toast.error('Error fetching admin data');
        console.error(error);
      }
    };

    fetchData();
  }, [_id, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/admin/${_id}`, data);

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
        <Navbar2 />
      </div>
      <Form onSubmit={updateProfile}>
        <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>
            Update Profile - {!!user && (<span className="text-blue-700">{user.name}</span>)}
            </span>
          </div>
            <div className='text-white mt-3 mr-2'>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type="text"
                  placeholder="Enter your name"
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
                  placeholder="Enter your Email"
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
                  placeholder="Set your Password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </Form.Group>
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