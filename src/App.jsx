import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import { Toaster } from 'react-hot-toast'
import useAuth from './context/AuthContext'
import { Sidenavbar } from './components/Navigation/Sidenavbar'
import TopNavBar from './components/TopNavBar'
import Watermark from './components/watermark'
import Signin from './pages/Home/Authentication/Signin'
import ForgotPassword from './pages/Home/Authentication/ForgotPassword'
import Authentication from './pages/Overview/login'
import Superadmin from "./pages/Overview/Superadmin";
import Teaminformation from "./pages/Teaminformation";
import SalesLeadsInfo from './pages/Home/SalesLeadsInfo';
import LeadInt from './components/lead/LeadInt';
import Payment from './pages/Home/pay';
import Dps from './pages/Home/dps';
import Announcements from './components/announcements';
import AttendenceShow from './components/Attendence';
import TeamEmployees from "./components/Teaminfo/EmployeeTable";
import AttendanceCalendar from "./components/Teaminfo/Attendence";
import OperationOverview from "./pages/Overview/Operations";
import StudentsInfo from './pages/Home/StudentsInfo';
import HROverView from "./pages/Overview/HR";
import AddAttendence from './components/AddAttendence';
import EmployeesInfo from './pages/Home/EmployeesInfo';
import Teamlead from "./pages/Overview/Teamlead";
import MembersInfo from './pages/Home/MembersInfo';
import SalesInt from './components/lead/SalesInt';
import Intern from "./pages/Overview/Intern";
import PostSales from "./pages/Overview/PostSales";
import DigitalMarketing from "./pages/Overview/DigitalMarketing";
import UnAuthorized from "./pages/UnAuthorized"; // Assuming you have this page
import LeadLeads from './components/lead/LeasLeads'
import Admins from './pages/Admins'
import SpfRoles from './components/SpfRoles'

const siderBarAvoiders = [
    "/login",
    "/forgotPassword"
]

const options = {
    admin: "Admin",
    operations: "Operations",
    HR: "HR",
    teamLead: "Team Lead",
    intern: "Intern",
    postSales: "Post Sales",
    DigitalMarketing: "Digital Marketing",
    roleLoading: "LOADING"
}


function App() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { userDetails, isLoggedIn, loadingAuth } = useAuth()
    const [roleAccess, setRoleAccess] = useState(options.roleLoading) // Unused state, but kept for completeness

    console.log("this is from app", userDetails, isLoggedIn)
    useEffect(() => {
        function checkLogin() {
            if (!loadingAuth) {
                if (!userDetails || !isLoggedIn) {
                    if (!siderBarAvoiders.includes(pathname)) {
                         navigate("/login")
                    }
                } else {
                    if (pathname === "/login" || pathname === "/forgotPassword") {
                        navigate("/")
                    }
                    setRoleAccess(userDetails.role)
                }
            }
        }
        checkLogin()
    }, [userDetails, isLoggedIn, loadingAuth, navigate, pathname])
    function AdminDashboard() {
        return <Routes>
            <Route path="/super" Component={Superadmin} />
            <Route path="/teaminfo" Component={Teaminformation} />
            <Route path='/salesLeadInfo' Component={SalesLeadsInfo} />
            <Route path='/leadGenInfo' Component={LeadLeads} />
            <Route path='/pay' Component={Payment} />
            <Route path='/dps' Component={Dps} />
            <Route path="/announcements" Component={Announcements} />
            <Route path="/attendance" Component={AttendenceShow} />
            <Route path="/teams/:teamId/employees" element={<TeamEmployees />} />
            <Route path="/employees/:teamId/attendence" element={<AttendanceCalendar />} />
            <Route path="/" Component={Superadmin} /> 
            <Route path="/abc" Component={Admins} />
            <Route path="/spfroles" Component={SpfRoles} />
        </Routes>
    }

    function OperationDashboard() {
        return <Routes>
            <Route path='/' Component={OperationOverview} />
            <Route path='/studentsinfo' Component={StudentsInfo} />
            <Route path='/pay' Component={Payment} />
            <Route path='/dps' Component={Dps} />
            <Route path='/attendence' Component={AttendenceShow} />
        </Routes>
    }
 
    function HRDashBoard() {
        return <Routes>
            <Route path="/" Component={HROverView} />
            <Route path="/addattendence" Component={AddAttendence} />
            <Route path='/attendence' Component={AttendenceShow} />
            <Route path='/employeeinfo' Component={EmployeesInfo} />
            <Route path="/employeeinfo/attendence" element={<AttendenceShow />} />
        </Routes>
    }
    
    function TLDashboard() {
        return <Routes>
          <Route path="/" Component={Teamlead} />
          <Route path='/pay' Component={Payment} />
          <Route path='/dps' Component={Dps} />
          <Route path='/attendence' Component={AttendenceShow} />
          <Route path='/membersinfo' Component={MembersInfo} />
          <Route path='/salesLeadInfo/:id' Component={SalesInt} />
        </Routes>
    }
    
    function InterDashboard() {
        return <Routes>
          <Route path="/" Component={Intern} />
          <Route path='/studentsinfo' Component={StudentsInfo} />
          <Route path='/int' Component={SalesInt} />
          <Route path='/lead' Component={LeadInt} />
          <Route path='/pay' Component={Payment} />
          <Route path='/dps' Component={Dps} />
          <Route path='/attendence' Component={AttendenceShow} />
        </Routes>
    }
    
    function PostSalesDashboard() {
        return <Routes>
          <Route path="/" Component={PostSales} />
          <Route path='/studentsinfo' Component={StudentsInfo} />
          <Route path='/pay' Component={Payment} />
          <Route path='/dps' Component={Dps} />
          <Route path='/attendence' Component={AttendenceShow} />
        </Routes>
    }

    function DigitalMarketingDashboard() {
        return <Routes>
          <Route path="/" Component={DigitalMarketing} />
          <Route path="/announcements" Component={Announcements} />
          <Route path='/attendence' Component={AttendenceShow} />
        </Routes>
    }

    function renderRoleBased() {
        switch (userDetails?.role) {
            case options.admin:
                return <AdminDashboard />
            case options.operations:
                return <OperationDashboard />
            case options.HR:
                return <HRDashBoard />
            case options.teamLead:
                return <TLDashboard />
            case options.intern:
                return <InterDashboard />
            case options.postSales:
                return <PostSalesDashboard />
            case options.DigitalMarketing:
                return <DigitalMarketingDashboard />
            default:
                return <UnAuthorized />
        }
    }
    
    if (loadingAuth) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Signin />} />
                <Route path="*" element={
                    isLoggedIn ? (
                        <div className='flex w-full'>
                            
                            <Watermark opacity={0.2} size={180} rotate={-40} text={userDetails?.username ?? "Pursuit future technologies"} />

                            {!siderBarAvoiders.includes(pathname) && <Sidenavbar />}
                            <div className='flex flex-col w-full gap-4 '>
                                {!siderBarAvoiders.includes(pathname) && <TopNavBar />}
                                {renderRoleBased()} 
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-10">Checking authentication status...</div> 
                    )
                } />
            </Routes>
        </>
    );
}

export default App;