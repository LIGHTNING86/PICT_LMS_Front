import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar";
import AttendancePopup from "./AttendencePopup";
import axios from "axios";
import { toast } from 'react-hot-toast';

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('api/auth/logout');
            setUser(null);
            toast.success('Logout successful!');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error('Logout failed. Please try again.');
        }
    };

    return (
        <div className="w-screen min-h-screen overflow-x-hidden" style={{ marginTop: "-30px" }}>
            <div>
                <Navbar1 />
            </div>

            <div className="w-full min-h-screen grid md:grid-cols-10"> {/* Adjusted grid for better responsiveness */}
                <div className="w-full h-full centered col-span-10 md:col-span-6"> {/* Changed col-span for better responsiveness */}
                    <div className="bg-slate-100 rounded-lg p-8 mx-4 md:mx-10 mb-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 relative">
                        <div className="grid md:grid-cols-10 centered">
                            <div className="col-span-2 p-3 w-auto h-auto">
                                <img src="../src/assets/unilogo2.png" alt="University Logo" />
                            </div>
                            <div className="col-span-8 md:col-span-7 p-4 centered">
                                <span className="font-oswald font-semibold text-3xl md:text-4xl text-center text-regal-blue">
                                    PICT LEAVE MANAGEMENT SYSTEM (PLMS)
                                </span>
                            </div>
                        </div>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
                        <span className="text-2xl md:text-3xl centered font-oswald font-bold text-white">INSTRUCTIONS FOR STUDENTS</span>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
                        <ol className="font-oswald list-decimal text-white text-justify text-lg md:text-xl p-2 ml-4 md:ml-10">
                            <li>Submit leave requests accurately and with clear reasons.</li>
                            <li>Check the status of your leave requests regularly for updates.</li>
                        </ol>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
                        <p className="font-oswald text-center text-lg md:text-xl mt-3" style={{ color: "yellow" }}>
                            Important Note: <i>CHECK YOUR CLASS </i>
                            <a href="msteams://" className="text-blue-700" style={{ fontSize: "18px" }}>
                                &nbsp;<b><u>MS-TEAMS</u></b>
                            </a>
                            <i> FOR THE STUDY MATERIAL IN CASE OF YOUR ABSENCE.</i>
                        </p>
                    </div>
                </div>

                <div className="w-full min-h-screen centered col-span-10 md:col-span-4"> {/* Adjusted col-span for better responsiveness */}
                    <div className="flex items-center justify-center bg-cover text-white text-2xl centered font-oswald font-bold">
                        <div className="bg-slate-100 rounded-lg p-8 mx-4 md:m-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
                            <h1 className="centered text-3xl md:text-4xl">STUDENT DASHBOARD</h1>
                            <br />
                            {!!user && (
                                <h3 className="centered">
                                    Hi,&nbsp;<span className="text-regal-blue">{user.name}!</span>
                                </h3>
                            )}
                            {!!user && (
                                <h3 className="centered mt-2">
                                    Class:&nbsp;<span className="text-regal-blue">{user.class}</span>
                                </h3>
                            )}
                            {!!user && (
                                <h3 className="centered mt-2">
                                    Registration No.:&nbsp;<span className="text-regal-blue">{user.registrationNo}</span>
                                </h3>
                            )}
                            <div>
                                <br />
                                <main>
                                    <h1>Welcome to <span className="text-regal-blue">PICT Leave Management System</span></h1>
                                </main>
                                <button onClick={handleLogout} className="mt-4 w-full text-[18px] md:text-[22px] rounded bg-red-600 py-2 hover:bg-red-700 transition-colors duration-300">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <AttendancePopup />
            </div>
        </div>
    );
}
