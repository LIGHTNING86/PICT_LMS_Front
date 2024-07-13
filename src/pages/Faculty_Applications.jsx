import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Navbar3 from '../components/Navbar_Faculty';
import ApplicationPopupFaculty from './ApplicationPopupFaculty';
import ApplicationPopupMentor from './ApplicationPopupMentor';

export default function Faculty_Applications() {
  const [facultyApplications, setFacultyApplications] = useState([]);
  const [mentorApplications, setMentorApplications] = useState([]);
  const [selectedFacultyApplication, setSelectedFacultyApplication] = useState(null);
  const [selectedMentorApplication, setSelectedMentorApplication] = useState(null);
  const [showFacultyPopup, setShowFacultyPopup] = useState(false);
  const [showMentorPopup, setShowMentorPopup] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFacultyApplications = async () => {
      try {
        const response = await axios.get(`https://pict-lms-back.onrender.com/api/leave/student`, {
          params: {
            studentFacultyID: user.facultyID,
            approvedMentor: true // Filter applications where approvedMentor is true
          }
        });
        setFacultyApplications(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    const fetchMentorApplications = async () => {
      try {
        const response = await axios.get(`https://pict-lms-back.onrender.com/api/leave/student`, {
          params: { studentMentorID: user.mentorID }
        });
        setMentorApplications(response.data);
      } catch (error) {
        console.error("Error fetching mentor-specific leave applications:", error);
      }
    };

    fetchFacultyApplications();
    fetchMentorApplications();
  }, [user.facultyID, user.mentorID]);

  const handleApproveFaculty = async (id, remarkFaculty) => {
    try {
      const response = await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/approve/${id}`, { remarkFaculty });
      updateApplicationStatus(response.data, 'faculty');
      console.log("Application Approved");
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleDeclineFaculty = async (id, remarkFaculty) => {
    try {
      const response = await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/decline/${id}`, { remarkFaculty });
      updateApplicationStatus(response.data, 'faculty');
    } catch (error) {
      console.error("Error declining application:", error);
    }
  };

  const handleDiscussFaculty = async (id, remarkFaculty) => {
    try {
      const response = await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/discuss/${id}`, { remarkFaculty });
      updateApplicationStatus(response.data, 'faculty');
      console.log("Application Discuss");
    } catch (error) {
      console.error("Error discussing application:", error);
    }
  };

  const handleApproveMentor = async (id, remarkMentor) => {
    try {
      const response = await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/mentor/approve/${id}`, { remarkMentor });
      updateApplicationStatus(response.data, 'mentor');
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleDeclineMentor = async (id, remarkMentor) => {
    try {
      const response = await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/mentor/decline/${id}`, { remarkMentor });
      updateApplicationStatus(response.data, 'mentor');
    } catch (error) {
      console.error("Error declining application:", error);
    }
  };

  const handleDiscussMentor = async (id, remarkMentor) => {
    try {
      const response = await axios.patch(`https://pict-lms-back.onrender.com/api/leave/student/mentor/discuss/${id}`, { remarkMentor });
      updateApplicationStatus(response.data, 'mentor');
    } catch (error) {
      console.error("Error discussing application:", error);
    }
  };

  const updateApplicationStatus = (updatedApplication, role) => {
    if (role === 'faculty') {
      setFacultyApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app
        )
      );
    } else {
      setMentorApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app
        )
      );
    }
  };

  const viewApplication = async (id, role) => {
    try {
      const response = await axios.get(`https://pict-lms-back.onrender.com/api/leave/student/${id}`);
      if (role === 'faculty') {
        setSelectedFacultyApplication(response.data);
        setShowFacultyPopup(true);
      } else {
        setSelectedMentorApplication(response.data);
        setShowMentorPopup(true);
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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

  const getStatus = (approved, cancelled, cancelledAt, discussMentor, discussFaculty) => {
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

  return (
    <div className="w-screen min-h-screen text-white">
      <Navbar3 />
      <div className="bg-slate-100 rounded-lg p-8 m-3 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
        <div>
          <span className='text-white text-3xl font-bold'>
            Student Leave Applications (Faculty) - {!!user && (<span className="text-blue-700">{user.name}</span>)}
          </span>
        </div>

        <Table striped bordered hover variant="dark" className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Application ID</th>
              <th>Enrollment ID</th>
              <th>Status (Mentor)</th>
              <th>Status Changed At (Mentor)</th>
              <th>Status (Faculty)</th>
              <th>Status Changed At (Faculty)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {facultyApplications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app._id}</td>
                <td>{app.registrationNo}</td>
                <td>{getStatus(app.approvedMentor, app.cancelled, app.cancelledAt, app.discussMentor, false)}</td>
                <td>{getDates(null , null, app.approvedMentor, app.approvedMentorAt, app.discussMentor, app.discussMentorAt, null , null) || "N/A"}</td>
                <td>{getStatus(app.approvedFaculty, app.cancelled, app.cancelledAt, false, app.discussFaculty)}</td>
                <td>{getDates(app.approvedFaculty, app.approvedFacultyAt, null , null , null , null, app.discussFaculty, app.discussFacultyAt) || "N/A"}</td>
                <td>
                  <Button style={{ border: "none" }} className='bg-blue-600 hover:bg-blue-800' onClick={() => viewApplication(app._id, 'faculty')}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="mt-8">
          <span className='text-white text-3xl font-bold'>
            Student Leave Applications (Mentor) - {!!user && (<span className="text-blue-700">{user.name}</span>)}
          </span>
        </div>

        <Table striped bordered hover variant="dark" className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Application ID</th>
              <th>Enrollment ID</th>
              <th>Status</th>
              <th>Status Changed At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mentorApplications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app._id}</td>
                <td>{app.registrationNo}</td>
                <td>{getStatus(app.approvedMentor, app.cancelled, app.cancelledAt, app.discussMentor, false)}</td>
                <td>{getDates(null , null, app.approvedMentor, app.approvedMentorAt, app.discussMentor, app.discussMentorAt, null , null)}</td>
                <td>
                  <Button style={{ border: "none" }} className='bg-blue-600 hover:bg-blue-800' onClick={() => viewApplication(app._id, 'mentor')}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {showFacultyPopup && (
        <ApplicationPopupFaculty
          application={selectedFacultyApplication}
          onClose={() => setShowFacultyPopup(false)}
          onApprove={(id, remark) => handleApproveFaculty(id, remark)}
          onDecline={(id, remark) => handleDeclineFaculty(id, remark)}
          onDiscuss={(id, remark) => handleDiscussFaculty(id, remark)}
          userRole={'faculty'}
        />
      )}
      {showMentorPopup && (
        <ApplicationPopupMentor
          application={selectedMentorApplication}
          onClose={() => setShowMentorPopup(false)}
          onApprove={(id, remark) => handleApproveMentor(id, remark)}
          onDecline={(id, remark) => handleDeclineMentor(id, remark)}
          onDiscuss={(id, remark) => handleDiscussMentor(id, remark)}
          userRole={'mentor'}
        />
      )}
    </div>
  );
}
