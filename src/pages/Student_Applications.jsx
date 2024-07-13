import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../context/userContext";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Navbar1 from '../components/Navbar';
import axios from 'axios';
import StudentApplicationPopup from './StudentApplicationPopup';

export default function Student_Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`https://pict-lms-back.onrender.com/api/leave/student`, {
          params: { registrationNo: user.registrationNo } // Pass registrationNo as query parameter
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching student applications:', error);
      }
    };

    fetchApplications();
  }, [user.registrationNo]);

  const getStatus = (approved, cancelled, cancelledAt, discussFaculty, discussMentor) => {
    if (cancelled) {
      return (
        <span className="text-red-500">
          Cancelled ({formatDate(cancelledAt)})
        </span>
      );
    } else if (discussMentor || discussFaculty) {
      return (
        <span className="text-yellow-500">
          Discuss
        </span>
      );
    } else if (approved === null) {
      return 'Pending';
    } else if (approved) {
      return <span className="text-green-500">Approved</span>;
    } else {
      return <span className="text-red-500">Declined</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const cancelApplication = async (id) => {
    try {
      await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/cancel/${id}`);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, cancelled: true, cancelledAt: new Date() } : app
        )
      );
    } catch (error) {
      console.error("Error cancelling application:", error);
    }
  };

  const getDates = (approvedFaculty, approvedFacultyAt, approvedMentor, approvedMentorAt, discussMentor, discussMentorAt, discussFaculty, discussFacultyAt) => {
    if(approvedFaculty) {
      return (
        <span className="text-green-500">
          ({formatDate(approvedFacultyAt)})
        </span>
      );
    } else if(approvedFaculty === false) {
      return (
        <span className="text-red-500">
          ({formatDate(approvedFacultyAt)})
        </span>
      );
    } else if(approvedMentor) {
      return (
        <span className="text-green-500">
          ({formatDate(approvedMentorAt)})
        </span>
      );
    } else if(approvedMentor === false) {
      return (
        <span className="text-red-500">
          ({formatDate(approvedMentorAt)})
        </span>
      );
    } else if(discussFaculty) {
      return (
        <span className="text-yellow-500">
          ({formatDate(discussFacultyAt)})
        </span>
      );
    } else if(discussMentor) {
      return (
        <span className="text-yellow-500">
          ({formatDate(discussMentorAt)})
        </span>
      );
    }
  }

  return (
    <div className="w-screen min-h-screen text-white">
      <Form>
        <div>
          <Navbar1 />
        </div>
        <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <div>
            <span className='text-white text-3xl font-bold'>Leave Application Status - {!!user && (<span className="text-blue-700">{user.name}</span>)}</span>
          </div>
          <Table striped bordered hover variant="dark" className='mt-4'>
            <thead>
              <tr>
                <th>#</th>
                <th>Application ID</th>
                <th>Status (Mentor)</th>
                <th>Status Changed At (by Mentor)</th>
                <th>Status (Faculty)</th>
                <th>Status Changed At (by Faculty)</th>
                <th>Action</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application._id}>
                  <td>{index + 1}</td>
                  <td>{application._id}</td>
                  <td>{getStatus(application.approvedMentor, application.cancelled, application.cancelledAt, application.discussMentor, false)}</td>
                  <td>{getDates(null , null, application.approvedMentor, application.approvedMentorAt, application.discussMentor, application.discussMentorAt, null , null)}</td>
                  <td>{getStatus(application.approvedFaculty, application.cancelled, application.cancelledAt, false, application.discussFaculty)}</td>
                  <td>{getDates(application.approvedFaculty, application.approvedFacultyAt, null , null , null , null, application.discussFaculty, application.discussFacultyAt) || "N/A"}</td>
                  <td>
                    {!application.cancelled && (
                      <Button className='bg-red-600 hover:bg-red-800' style={{border: "none"}} onClick={() => cancelApplication(application._id)}>Cancel</Button>
                    )}
                  </td>
                  <td>
                    <Button style={{border: "none"}} className='bg-blue-600 hover:bg-blue-800' onClick={() => setSelectedApplication(application)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Button style={{border: "none"}} className='bg-blue-600 hover:bg-blue-800' as={Link} to="/leavePage">Submit New Application</Button>
          </div>
        </div>
      </Form>
      {selectedApplication && (
        <StudentApplicationPopup
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}
