import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Navbar3 from "../components/Navbar_Faculty";
import axios from "axios";
import {toast} from 'react-hot-toast'

export default function Dashboard_Faculty() {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
          await axios.post('api/auth/logout');
          setUser(null);
          navigate('/login');
          toast.success('Logout successful!');
      } catch (error) {
          console.error("Logout failed:", error);
      }
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden" style={{marginTop: "-30px"}}>
      <div>
        <Navbar3 />
      </div>

      <div className="w-screen min-h-screen grid md:grid-cols-10">
        <div className="w-full h-full md:h-screen centered col-span-6">
                    <div className="bg-slate-100 rounded-lg p-8 mx-10 mb-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 relative">
                        <div className="grid md:grid-cols-10 centered">
                            <div className="col-span-2 p-2 w-auto h-auto">
                                <img src="../src/assets/unilogo2.png" />
                            </div>
                            <div className="col-span-7 p-4 centered">
                                <span className="font-oswald font-semibold text-4xl text-center text-regal-blue">
                                    PICT LEAVE MANAGEMENT SYSTEM (PLMS)
                                </span>
                            </div>
                        </div>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
                        <span className="text-3xl centered font-oswald font-bold text-white">INSTRUCTIONS FOR FACULTIES</span>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
                        <ol className="font-oswald list-decimal text-white text-justify text-xl p-2 ml-10">
                            <li>Maintain fairness and consistency in approving or denying leave requests.</li>
                            <li>Review and respond to leave requests promptly.</li>
                        </ol>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
                        <p className="font-oswald text-center text-xl mt-3" style={{ color: "yellow" }}>
                            Important Note: <i>PLEASE PROVIDE STUDY MATERIAL ON YOUR CLASS </i>
                            <a href="msteams://" className="text-blue-700" style={{ fontSize: "21px" }}>
                                &nbsp;<b><u>MS-TEAMS</u></b>
                            </a>
                            <i> FOR THE ABSENT STUDENTS</i>
                        </p>
                    </div>
                </div>

        <div className="w-full h-full md:h-screen centered col-span-4">
        <div className=" h-[100vh] flex items-center justify-center bg-cover text-white text-2xl centered font-oswald font-bold">
        <div className="bg-slate-100 rounded-lg p-8 m-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <h1 className="centered text-4xl">FACULTY DASHBOARD</h1>
          <br />
          {!!user && (<h3 className="centered">Hi,&nbsp;<span className="text-regal-blue">{user.name}!</span></h3>)}
          {!!user && (<h3 className="centered mt-2">CC Class:&nbsp;<span className="text-regal-blue">{user.cc_class}</span></h3>)}
          {!!user && (<h3 className="centered mt-2">Faculty ID:&nbsp;<span className="text-regal-blue">{user.facultyID}</span></h3>)}
          {!!user && (<h3 className="centered mt-2">Mentor ID:&nbsp;<span className="text-regal-blue">{user.mentorID}</span></h3>)}
          <div>

          <br />
          <main className="content centered">
            <h1>Welcome to <span className="text-regal-blue">PICT Leave Management System</span></h1>
          </main>
          <button onClick={handleLogout} className="mt-4 w-full text-[22px] rounded bg-red-600 py-2 hover:bg-red-700 transition-colors duration-300">Logout</button>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}
