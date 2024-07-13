import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar3 from "../components/Navbar_Faculty";
import Navbar4 from "../components/Navbar_HOD";

export default function Dashboard_HOD() {
    const {user} = useContext(UserContext)
  return (
    <div className="w-screen h-screen">
      <div>
        <Navbar4 />
      </div>

      <div className="w-screen h-screen grid grid-rows-2 md:grid-cols-10" style={{marginTop: "-30px"}}>
          <div className="w-full h-full md:h-screen centered col-span-6">
            <div className="bg-slate-100 rounded-lg p-8 ml-10 mr-10 mb-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 relative">
              <div className="grid md:grid-cols-10 centered">
                <div className="col-span-2 p-4 w-auto h-auto">
                  <img src="../src/assets/unilogo2.png"/>
                </div>
                <div className="col-span-7 p-6 centered">
                  <span className="font-oswald font-semibold text-4xl text-center text-regal-blue">PICT LEAVE MANAGEMENT SYSTEM (PLMS)</span>
                </div>
              </div>
              <span className="text-3xl centered font-oswald font-bold text-white">INSTRUCTIONS</span>
            <hr class="h-px my-8 bg-white border-0 dark:bg-white"></hr>
            <ol className="font-oswald list-decimal text-white text-justify text-xl p-3">
                <li>Log in and submit leave requests accurately and with clear reasons.</li>
                <li>Check the status of your leave requests regularly for updates.</li>
                <li>Maintain fairness and consistency in approving or denying leave requests.</li>
                <li>Review and respond to leave requests promptly.</li>
              </ol>
            </div>
        </div>

        <div className="w-full h-full md:h-screen centered col-span-4">
        <div className=" h-[100vh] flex items-center justify-center bg-cover text-white text-2xl centered font-oswald font-bold">
        <div className="bg-slate-100 rounded-lg p-8 m-10 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <h1 className="centered">HOD Dashboard</h1>
          <br />
          {!!user && (<h3 className="centered">Hi,&nbsp;<span className="text-regal-blue italic">{user.name}!</span></h3>)}
          <div>

          <br />
          <main className="content centered">
            <h1>Welcome to the Dashboard!</h1>
          </main>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}
