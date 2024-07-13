import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Navbar3 from '../components/Navbar_Admin';

export default function Users() {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://pict-lms-back.onrender.com/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchFaculties = async () => {
      try {
        const response = await axios.get('https://pict-lms-back.onrender.com/api/faculties');
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get('https://pict-lms-back.onrender.com/api/admin');
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchStudents();
    fetchFaculties();
    fetchAdmins();
  }, []);

  const deleteUser = async (userType, _id) => {
    console.log(`Deleting ${userType} with ID: ${_id}`);
    try {
      const response = await axios.delete(`https://pict-lms-back.onrender.com/api/${userType}/${_id}`);
      if (response.status === 200) {
        if (userType === 'students') {
          setStudents(students.filter(student => student._id !== _id));
        } else if (userType === 'faculties') {
          setFaculties(faculties.filter(faculty => faculty._id !== _id));
        } else if (userType === 'admins') {
          setAdmins(admins.filter(admin => admin._id !== _id));
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };  
  

  return (
    <div className="w-screen min-h-screen text-white">
      <Navbar3 />
      <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
        <div>
          <span className='text-white text-3xl font-bold'>
            Users - {!!user && (<span className="text-blue-700">{user.name}</span>)}
          </span>
        </div>
  
        <div className="mt-8">
          <span className='text-white text-2xl font-bold'>
            Students
          </span>
        </div>
        <Table striped bordered hover variant="dark" className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Registration No</th>
              <th>Date of Birth</th>
              <th>Contact No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNo}</td>
                <td>{student.class}</td>
                <td>{student.registrationNo}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.contactNo}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteUser('students', student._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <div className="mt-8">
          <span className='text-white text-2xl font-bold'>
            Faculties
          </span>
        </div>
        <Table striped bordered hover variant="dark" className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Faculty ID</th>
              <th>Mentor ID</th>
              <th>Contact No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty, index) => (
              <tr key={faculty._id}>
                <td>{index + 1}</td>
                <td>{faculty.name}</td>
                <td>{faculty.email}</td>
                <td>{faculty.facultyID}</td>
                <td>{faculty.mentorID}</td>
                <td>{faculty.contactNo}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteUser('faculties', faculty._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <div className="mt-8">
          <span className='text-white text-2xl font-bold'>
            Admins
          </span>
        </div>
        <Table striped bordered hover variant="dark" className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteUser('admins', admin._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}