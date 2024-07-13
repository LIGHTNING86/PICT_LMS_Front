import React from 'react';

const StudentApplicationPopup = ({ application, onClose }) => {
  const getMentorStatusColor = () => {
    if (application.cancelled) {
      return 'text-red-500'; // Red color for Cancelled status
    } else if (application.approvedMentor) {
      return 'text-green-500'; // Green color for Approved status
    } else if (application.approvedMentor === false) {
      return 'text-red-500'; // Red color for Declined status
    } else if (application.discussMentor) {
      return 'text-yellow-500';
     } else {
      return 'text-gray-500'; // Default color for Pending status
    }
  };

    const getFacultyStatusColor = () => {
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
    <div style={{zIndex: "1100"}} className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center font-oswald">
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
            <p className='mt-4' style={{color: "black"}}><strong>Name:</strong> {application.studentName}</p>
            <p style={{color: "black"}}><strong>Enrollment No.:</strong> {application.registrationNo}</p>
            <p style={{color: "black"}}><strong>Class:</strong> {application.studentClass}</p>
            <p style={{color: "black"}}><strong>Start Date:</strong> {new Date(application.startDate).toLocaleDateString()}</p>
            <p style={{color: "black"}}><strong>End Date:</strong> {new Date(application.endDate).toLocaleDateString()}</p>
            <p style={{color: "black"}}><strong>Reason:</strong> {application.reason}</p>
            <p style={{color: "black"}}><strong>Address:</strong> {application.address}</p>
            <p style={{color: "black"}}><strong>Contact No:</strong> {application.contactNo}</p>
            <p style={{color: "black"}}><strong>Leave Type:</strong> {application.leaveType === 'fullDay' ? 'Full Day' : 'Half Day'}</p> {/* New line to display leave type */}
            <hr className="h-px my-2 bg-black border-0 dark:bg-black"></hr>
            <p className={`font-bold ${getMentorStatusColor()}`}>
              <strong>Status (from Mentor):</strong> {application.discussMentor ? `Discuss` : application.cancelled ? `Cancelled (by the student at ${new Date(application.cancelledAt).toLocaleString()})` : (application.approvedMentor === null ? 'Pending' : application.approvedMentor ? 'Approved' : 'Declined')}
            </p>
            <p style={{color: "black"}}><strong>Approved/Declined At (by Mentor):</strong> {application.approvedMentorAt ? new Date(application.approvedMentorAt).toLocaleString(): application.discussMentorAt ? new Date(application.discussMentorAt).toLocaleString() : 'N/A'}</p>
            <p style={{color: "black"}}><strong>Remark (by Mentor):</strong> {application.remarkMentor || 'N/A'}</p>
            <hr className="h-px my-2 bg-black border-0 dark:bg-black"></hr>
            <p className={`font-bold ${getFacultyStatusColor()}`}>
              <strong>Status (from Faculty):</strong> {application.discussFaculty ? `Discuss` : application.cancelled ? `Cancelled (by the student at ${new Date(application.cancelledAt).toLocaleString()})` : (application.approvedFaculty === null ? 'Pending' : application.approvedFaculty ? 'Approved' : 'Declined')}
            </p>
            <p style={{color: "black"}}><strong>Approved/Declined At (by Faculty):</strong> {application.approvedFacultyAt ? new Date(application.approvedFacultyAt).toLocaleString() : application.discussFacultyAt ? new Date(application.discussFacultyAt).toLocaleString() : 'N/A'}</p>
            <p style={{color: "black"}}><strong>Remark (by Faculty):</strong> {application.remarkFaculty || 'N/A'}</p>
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
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StudentApplicationPopup;
