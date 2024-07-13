import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from '../src/pages/Register';
import RegisterFaculty from './pages/RegisterFaculty';
import Register_Faculty from './pages/Register_Faculty';
import RegisterStudent from './pages/RegisterStudent';
import RegisterAdmin from './pages/RegisterAdmin';
import Login from '../src/pages/Login';
import Dashboard from './pages/Dashboard';
import LeavePage from './pages/LeavePage';
import LeavePage_Faculty from './pages/LeavePage_Faculty';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard_Admin from './pages/Dashboard_Admin';
import Dashboard_Faculty from './pages/Dashboard_Faculty';
import Student_Applications from './pages/Student_Applications';
import Faculty_Applications from './pages/Faculty_Applications';
import UpdateFacultyProfile from './pages/UpdateFacultyProfile';
import UpdateStudentProfile from './pages/UpdateStudentProfile';
import Dashboard_HOD from './pages/Dashboard_HOD';
import HOD_Applications from './pages/HOD_Applications';
import PrivateRoute from '../src/components/PrivateRoute';
import Users from './pages/Users';
import UpdateAdminProfile from './pages/UpdateAdminProfile';
import Unauthorized from './pages/Unauthorized';

axios.defaults.baseURL = 'https://pict-lms-back.onrender.com';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <div className="content">
          <Routes>
            <Route path='/' element={<div className='login-page-content'><Login /></div>} />
            <Route path='/register' element={<div className='page-content'><Register /></div>} />
            <Route path='/register_faculty' element={<div className='page-content'><RegisterFaculty /></div>} />
            <Route path='/registerFaculty' element={<div className='page-content'><Register_Faculty /></div>} />
            <Route path='/registerStudent' element={<div className='page-content'><RegisterStudent /></div>} />
            <Route path='/registerAdmin' element={<div className='page-content'><RegisterAdmin /></div>} />
            <Route path='/login' element={<div className='login-page-content'><Login /></div>} />
            <Route path='/dashboard' element={<PrivateRoute roles={['student']}><div className='page-content'><Dashboard /></div></PrivateRoute>} />
            <Route path='/student_applications' element={<PrivateRoute roles={['student']}><div className='page-content'><Student_Applications /></div></PrivateRoute>} />
            <Route path='/updateStudentProfile/:registrationNo' element={<div className='page-content'><UpdateStudentProfile /></div>} />
            <Route path='/dashboard_admin' element={<PrivateRoute roles={['admin']}><div className='page-content'><Dashboard_Admin /></div></PrivateRoute>} />
            <Route path='/dashboard_faculty' element={<PrivateRoute roles={['faculty']}><div className='page-content'><Dashboard_Faculty /></div></PrivateRoute>} />
            <Route path='/faculty_applications' element={<PrivateRoute roles={['faculty']}><div className='page-content'><Faculty_Applications /></div></PrivateRoute>} />
            <Route path='/updateFacultyProfile/:facultyID' element={<PrivateRoute roles={['faculty']}><div className='page-content'><UpdateFacultyProfile /></div></PrivateRoute>} />
            <Route path='/updateAdminProfile/:_id' element={<PrivateRoute roles={['admin']}><div className='page-content'><UpdateAdminProfile /></div></PrivateRoute>} />
            <Route path='/dashboard_hod' element={<PrivateRoute roles={['hod']}><div className='page-content'><Dashboard_HOD /></div></PrivateRoute>} />
            <Route path='/hod_applications' element={<PrivateRoute roles={['hod']}><div className='page-content'><HOD_Applications /></div></PrivateRoute>} />
            <Route path='/leavePage' element={<PrivateRoute roles={['student']}><div className='page-content'><LeavePage /></div></PrivateRoute>} />
            <Route path='/leavepage_faculty' element={<PrivateRoute roles={['faculty']}><div className='page-content'><LeavePage_Faculty /></div></PrivateRoute>} />
            <Route path='/users' element={<PrivateRoute roles={['admin']}><div className='page-content'><Users /></div></PrivateRoute>} />
            <Route path='/unauthorized' element={<Unauthorized />} />
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
