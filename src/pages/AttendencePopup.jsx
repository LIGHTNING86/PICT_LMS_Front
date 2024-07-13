import React from "react";

const AttendancePopup = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center font-oswald"
      id="attendance-popup"
      style={{zIndex: "1100"}}
    >
      <div
        className="bg-white rounded-lg p-4 w-11/12 sm:w-3/4 md:w-1/2 flex flex-col items-center"
        style={{
          maxWidth: "800px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2
          className="text-lg font-bold mb-2 text-center"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "10px"
          }}
        >
          Important Attendance Notice
        </h2>
        <div style={{ width: "100%", textAlign: "justify" }}>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.2",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            1. As per the University norms, minimum of 75% attendance in each head of passing is mandatory.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.2",
              marginBottom: "10px",
            }}
          >
            2. The assessment of the term work based on the attendance and the academic performance (penalty for absenteeism may be imposed, if required).
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.2",
              marginBottom: "10px",
            }}
          >
            3. It is also mandatory for the parents to submit an undertaking in the prescribed form.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.2",
              marginBottom: "20px",
            }}
          >
            4. The parents are also requested to monitor the attendance and performance of their ward through class coordinator/Teacher and take necessary action (if required).
          </p>
          <p
            className="font-bold"
            style={{
              fontSize: "16px",
              lineHeight: "1.2",
              marginBottom: "20px",
              color: "red",
              textAlign: "center",
            }}
          >
            If you fail to meet the attendance and Term Work requirement, your term will not be granted (i.e. detained).
          </p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          style={{
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            alignSelf: "center", // Center the button horizontally
          }}
          onClick={() => {
            // Close the popup when the button is clicked
            document.body.classList.remove("overflow-hidden");
            document.getElementById("attendance-popup").style.display = "none";
          }}
        >
          I understand
        </button>
      </div>
    </div>
  );
};

export default AttendancePopup;
