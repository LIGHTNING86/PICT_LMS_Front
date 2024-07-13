import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../context/userContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Navbar1 from '../components/Navbar';
import { toast } from 'react-hot-toast';

export default function LeavePage() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    address: '',
    contactNo: '',
    leaveType: 'fullDay',
  });

  const { user } = useContext(UserContext);
  const [endDateError, setEndDateError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'endDate' && value < formData.startDate) {
      setEndDateError(true);
    } else {
      setEndDateError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.endDate < formData.startDate) {
      toast.error("End Date cannot be before Start Date");
      return;
    }

    // Add student details to formData
    const submissionData = {
      ...formData,
      studentName: user.name,
      registrationNo: user.registrationNo,
      studentClass: user.class,
      studentFacultyID: user.facultyID,
      studentMentorID: user.mentorID,
    };

    // console.log('Submission Data:', submissionData); // Add this line for debugging

    try {
      const response = await axios.post('https://pict-lms-back.onrender.com/api/leave/student', submissionData);
      console.log(response.data); 
      setFormData({
        startDate: '',
        endDate: '',
        reason: '',
        address: '',
        contactNo: '',
        leaveType: 'fullDay',
      });
      toast.success("Application Sent!");
    } catch (error) {
      console.error('Error submitting leave application:', error);
      console.log("User details: ", user.name, user.registrationNo, user.class, user.facultyID, user.mentorID);
    }
  };

  return (
    <div className="w-screen min-h-screen text-white">
      <Form onSubmit={handleSubmit}>
        <div>
          <Navbar1 />
        </div>
        <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>
              Leave Application Form - {!!user && (<span className="text-blue-700">{user.name}</span>)}
            </span>
          </div>
          <div className='grid grid-cols-2'>
            <div className='text-white mt-3 mr-2'>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control name='startDate' type="date" placeholder="Select Leave Start Date" onChange={handleChange} value={formData.startDate} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="leaveReasons">
                <Form.Label>Reason(s) for Leave</Form.Label>
                <Form.Control name="reason" as="textarea" placeholder="Enter the reason(s) for the leave" style={{ height: "120px" }} onChange={handleChange} value={formData.reason} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Full Day"
                    name="leaveType"
                    value="fullDay"
                    checked={formData.leaveType === 'fullDay'}
                    onChange={handleChange}
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="Half Day"
                    name="leaveType"
                    value="halfDay"
                    checked={formData.leaveType === 'halfDay'}
                    onChange={handleChange}
                    inline
                  />
                </div>
              </Form.Group>
            </div>
            <div className='text-white mt-3 ml-2'>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control name='endDate' type="date" placeholder="Select Leave End Date" onChange={handleChange} value={formData.endDate} disabled={formData.startDate === ''} />
                {endDateError && (
                  <div style={{ color: 'red' }}>
                    *End Date cannot be before Start Date
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="leaveAddress">
                <Form.Label>Leave Address</Form.Label>
                <Form.Control name='address' as="textarea" placeholder="Enter the address of leave location" style={{ height: "120px" }} onChange={handleChange} value={formData.address} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactNo">
                <Form.Label>On-leave Contact No.</Form.Label>
                <Form.Control name='contactNo' type="number" placeholder="Enter Contact No." onChange={handleChange} value={formData.contactNo} />
              </Form.Group>
            </div>
          </div>
          <div>
            <Button type="submit" style={{border: "none"}} className='bg-blue-600 hover:bg-blue-800'>Submit</Button>
            <Button type="reset" style={{border: "none"}} className='ml-2 bg-red-600 hover:bg-red-800'>Reset</Button>
          </div>
          <p style={{ color: 'yellow' }} className='mt-3'>
            DISCLAIMER: By submitting this form, I confirm that all details provided are accurate and truthful to the best of my knowledge.
          </p>
        </div>
      </Form>
    </div>
  );
}
