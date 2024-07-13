import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Navbar3 from '../components/Navbar_Faculty';
import axios from 'axios';
import Navbar4 from '../components/Navbar_HOD';

export default function HOD_Applications() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    async function fetchLeaves() {
      try {
        const response = await axios.get('https://pict-lms-back.onrender.com/api/leave/student');
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    }

    fetchLeaves();
  }, []);

  return (
    <div className="w-screen h-screen text-white">
      <Form>
        <div>
          <Navbar4 />
        </div>
        <div className="bg-slate-100 rounded-lg p-8 ml-10 mr-10 mt-4 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>Faculty Leave Application</span>
          </div>
          <Table striped bordered hover variant="dark" className='mt-4'>
            <tbody>
              <tr>
                <th scope="row">#</th>
                <th scope="row">Application ID</th>
                <th scope="row">Status</th>
              </tr>
              {leaves.map((leave, index) => (
                <tr key={leave._id}>
                  <td>{index + 1}</td>
                  <td>{leave._id}</td>
                  <td>Pending</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="bg-slate-100 rounded-lg p-8 ml-10 mr-10 mt-4 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>Student Leave Applications</span>
          </div>
          <Table striped bordered hover variant="dark" className='mt-4'>
            <tbody>
              <tr>
                <th scope="row">#</th>
                <th scope="row">Application ID</th>
                <th scope="row">Student ID</th>
                <th scope="row">Action</th>
              </tr>

              <tr>
                <th scope="row">1</th>
                <th scope="row">asfsdgsw34435345</th>
                <th scope="row">w343645654</th>
                <th scope="row">Pending</th>
              </tr>
              
            </tbody>
          </Table>
        </div>
      </Form>
    </div>
  );
}
