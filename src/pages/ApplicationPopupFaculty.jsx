import React, { useState } from 'react';

const ApplicationPopupFaculty = ({ application, onClose, onApprove, onDecline, onDiscuss, userRole }) => {
  const [remark, setRemark] = useState('');

  const getStatusColorMentor = () => {
    if (application.cancelled) {
      return 'text-red-500'; // Red color for Cancelled status
    } else if (application.approvedMentor) {
      return 'text-green-500'; // Green color for Approved status
    } else if (application.approvedMentor === false) {
      return 'text-red-500'; // Red color for Declined status
    }  else if (application.discussMentor === true) {
      return 'text-yellow-500'; // Red color for Declined status
    }
    else {
      return 'text-gray-500'; // Default color for Pending status
    }
  };

  const getStatusColorFaculty = () => {
    if (application.cancelled) {
      return 'text-red-500'; // Red color for Cancelled status
    } else if (application.approvedFaculty) {
      return 'text-green-500'; // Green color for Approved status
    } else if (application.approvedFaculty === false) {
      return 'text-red-500'; // Red color for Declined status
    } else if (application.discussFaculty) {
      return 'text-yellow-500';
    } else {
      return 'text-gray-500'; // Default color for Pending status
    }
  };

  return (
    <div style={{zIndex: "1100"}} className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center font-oswald">
      <div
        className="bg-white rounded-lg p-4 w-1/2"
        style={{
          maxWidth: "800px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-lg font-bold mb-2" style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", margin: "10px", color: "black" }}>
          Application Details
        </h2>
        {application ? (
          <>
            <p className='mt-4' style={{color: "black"}}><strong>Student Name:</strong> {application.studentName}</p>
            <p style={{color: "black"}}><strong>Student Enrollment No.:</strong> {application.registrationNo}</p>
            <p style={{color: "black"}}><strong>Student Class:</strong> {application.studentClass}</p>
            <p style={{color: "black"}}><strong>Start Date:</strong> {new Date(application.startDate).toLocaleDateString()}</p>
            <p style={{color: "black"}}><strong>End Date:</strong> {new Date(application.endDate).toLocaleDateString()}</p>
            <p style={{color: "black"}}><strong>Reason:</strong> {application.reason}</p>
            <p style={{color: "black"}}><strong>Address:</strong> {application.address}</p>
            <p style={{color: "black"}}><strong>Contact No:</strong> {application.contactNo}</p>
            <p style={{color: "black"}}><strong>Leave Type:</strong> {application.leaveType === 'fullDay' ? 'Full Day' : 'Half Day'}</p>
            <hr className="h-px my-2 bg-black border-0 dark:bg-black"></hr>
            <p className={`font-bold ${getStatusColorMentor()}`}>
              <strong>Status (from Mentor):</strong> {application.discussMentor ? `Discuss` : application.cancelled ? `Cancelled (by the student at ${new Date(application.cancelledAt).toLocaleString()})` : (application.approvedMentor === null ? 'Pending' : application.approvedMentor ? 'Approved' : 'Declined')}
            </p>
            <p style={{color: "black"}}><strong>Remark (from Mentor):</strong> {application.remarkMentor || 'N/A'}</p>
            <p style={{color: "black"}}><strong>Status Change At (by Mentor):</strong> {application.approvedMentorAt ? new Date(application.approvedMentorAt).toLocaleString() : application.discussMentorAt ? new Date(application.discussMentorAt).toLocaleString() : 'N/A'}</p>
            <hr className="h-px my-2 bg-black border-0 dark:bg-black"></hr>
            <p className={`font-bold ${getStatusColorFaculty()}`}>
              <strong>Status (from Faculty):</strong> {application.discussFaculty ? `Discuss` : application.cancelled ? `Cancelled (by the student at ${new Date(application.cancelledAt).toLocaleString()})` : (application.approvedFaculty === null ? 'Pending' : application.approvedFaculty ? 'Approved' : 'Declined')}
            </p>
            <p style={{color: "black"}}><strong>Remark (Faculty):</strong> {application.remarkFaculty || 'N/A'}</p>
            <p style={{color: "black"}}><strong>Status Change At (Faculty):</strong> {application.approvedFacultyAt ? new Date(application.approvedFacultyAt).toLocaleString(): application.discussFacultyAt ? new Date(application.discussFacultyAt).toLocaleString() : 'N/A'}</p>
            <div className="mt-4">
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add a remark... (required)"
                style={{
                  width: "100%",
                  height: "80px",
                  padding: "10px",
                  border: "1px solid",
                  borderRadius: "5px",
                  borderColor: "#000",
                  color: "black",
                }}
              ></textarea>
            </div>
            <div className="flex justify-around mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={onClose}
              >
                Close
              </button>
              {!application.cancelled && (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    style={{
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => onApprove(application._id, remark, userRole)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    style={{
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => onDecline(application._id, remark, userRole)}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    style={{
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => onDiscuss(application._id, remark, userRole)}
                  >
                    Discuss
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationPopupFaculty;
