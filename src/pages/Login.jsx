import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock, AiFillCaretDown } from 'react-icons/ai';
import { UserContext } from '../../context/userContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: '',
    userType: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password, userType } = data;

    try {
      const { data: response } = await axios.post('/api/auth/login', { email, password, userType });

      if (response.error) {
        if (response.error.includes("User not found")) {
          toast.error('User not found!');
        } else {
          toast.error(response.error);
        }
      } else {
        setUser({ ...response, role: response.userType });
        setData({ email: '', password: '', userType: '' });
        toast.success('Login successful!');

        switch (response.userType) {
          case 'student':
            navigate('/dashboard');
            break;
          case 'faculty':
            navigate('/dashboard_faculty');
            break;
          case 'admin':
            navigate('/dashboard_admin');
            break;
          default:
            navigate('/login');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.includes("User not found")) {
          toast.error('User not found!');
        } else {
          toast.error(error.response.data.error);
        }
      } else {
        toast.error('Login failed. Please try again.');
      } 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen">
      <div className="grid md:grid-cols-10 w-full">
        <div className="flex justify-center items-center col-span-6 min-h-screen">
          <div className="bg-slate-100 rounded-lg p-8 ml-10 mr-10 mb-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 relative">
            <div className="grid md:grid-cols-10 centered">
              <div className="col-span-2 p-3 w-auto h-auto">
                <img src="../src/assets/unilogo2.png" />
              </div>
              <div className="col-span-7 p-4 centered">
                <span className="font-oswald font-semibold text-4xl text-center text-regal-blue">PICT LEAVE MANAGEMENT SYSTEM (PLMS)</span>
              </div>
            </div>
            <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
            <span className="text-3xl centered font-oswald font-bold text-white">INSTRUCTIONS FOR STUDENTS AND FACULTIES</span>
            <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
            <ol className="font-oswald list-decimal text-white text-justify text-xl p-2 ml-10">
              <li>Log in and submit leave requests accurately and with clear reasons.</li>
              <li>Check the status of your leave requests regularly for updates.</li>
              <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
              <li>Maintain fairness and consistency in approving or denying leave requests.</li>
              <li>Review and respond to leave requests promptly.</li>
            </ol>
            <hr className="h-px my-4 bg-white border-0 dark:bg-white"></hr>
            <p className="font-oswald text-center text-xl ml-3 mt-3" style={{ color: "yellow" }}>Important Note: <i>CHECK YOUR CLASS</i> <a href="msteams://" className="text-blue-700" style={{ fontSize: "21px" }}>&nbsp;<b><u>MS-TEAMS</u></b></a><i> FOR THE STUDY MATERIAL IN CASE OF YOUR ABSENCE.</i></p>
          </div>
        </div>
        <div className="flex justify-center items-center col-span-4 min-h-screen">
          <div className="bg-slate-200 rounded-lg p-8 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-40 relative">
            <form onSubmit={loginUser}>
              <h1 className="text-white text-4xl font-bold text-center">Login</h1>
              <br />
              <div className="relative my-4">
                <input required type="email" name="email" placeholder="Your Email" className="placeholder-gray-200 font-semibold text-lg block w-72 py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" value={data.email} onChange={handleInputChange} />
                <BiUser className="text-white absolute top-0 right-4" />
              </div>
              <div className="relative my-4 mt-5">
                <input required type="password" name="password" placeholder="Your Password" className="placeholder-gray-200 font-semibold text-lg block w-72 py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" value={data.password} onChange={handleInputChange} />
                <AiOutlineUnlock className="text-white absolute top-0 right-4" />
              </div>
              <div className="relative my-4 mt-5">
                <select required name="userType" className="text-white placeholder-gray-200 font-semibold text-lg block w-72 py-2.3 px-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:bg-gray-500" value={data.userType} onChange={handleInputChange}>
                  <option className="text-black font-semibold" value="">Select User Type</option>
                  <option className="text-black font-semibold" value="student">Student</option>
                  <option className="text-black font-semibold" value="faculty">Faculty</option>
                  <option className="text-black font-semibold" value="admin">Admin</option>
                </select>
                <AiFillCaretDown className="text-white absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <br />
              <button type="submit" className="font-oswald font-bold text-white w-full text-[22px] rounded bg-regal-blue py-2 hover:bg-blue-700 transition-colors duration-300">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
