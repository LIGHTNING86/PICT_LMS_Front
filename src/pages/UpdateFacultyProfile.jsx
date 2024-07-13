import { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import { UserContext } from "../../context/userContext";
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar3 from "../components/Navbar_Faculty";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UpdateFacultyProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { facultyID } = useParams(); // Ensure you use `facultyID`
  const [originalData, setOriginalData] = useState({});
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    department: '',
    cc_class: '',
    facultyID: '',
    mentorID: '',
    contactNo: '',
    address: ''
  });
  const fetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!facultyID) {
        if (!fetchedData.current) {
          toast.error('Invalid faculty ID');
          fetchedData.current = true;
        }
        navigate('/dashboard_faculty');
        return;
      }

      try {
        const response = await axios.get(`/api/faculties/${facultyID}`);
        setOriginalData(response.data);
        setData(response.data);
      } catch (error) {
        toast.error('Error fetching faculty data');
        console.error(error);
      }
    };

    fetchData();
  }, [facultyID, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/faculties/${facultyID}`, data);

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
        <Navbar3 />
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
              <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  name='dateOfBirth'
                  type="date"
                  placeholder="Enter your Date of Birth"
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
                  placeholder="Enter your Department"
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
                  placeholder="Enter your CC Class"
                  onChange={handleChange}
                  value={data.cc_class}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="facultyID">
                <Form.Label>Faculty ID</Form.Label>
                <Form.Control
                  name='facultyID'
                  type="text"
                  placeholder="Enter your Faculty ID"
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
                  placeholder="Enter your Mentor ID"
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
                  placeholder="Enter your Contact No"
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
                  placeholder="Enter your Address"
                  onChange={handleChange}
                  value={data.address}
                  required
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
