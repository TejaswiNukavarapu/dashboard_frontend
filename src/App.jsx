
// import { useEffect, useState } from 'react'
// import './App.css'
// import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router'
// import Home from './pages/Home/Home'
// import Signin from './pages/Home/Authentication/Signin'
// import { Toaster } from 'react-hot-toast'
// import Announcements from './components/announcements'
// import Teaminformation from "./pages/Teaminformation"
// import EmployeeTable from './components/Teaminfo/EmployeeTable'
// import OverView from "./pages/Overview/Teamlead";
// import DigitalMarketing from "./pages/Overview/DigitalMarketing";
// import Operations from "./pages/Overview/Operations";
// import HR from "./pages/Overview/HR";
// import HROverView from "./pages/Overview/HR";
// import PostSales from "./pages/Overview/PostSales";
// import Intern from "./pages/Overview/Intern";
// import OverViewPage from "./pages/Overview/Teamlead";
// import Teamlead from "./pages/Overview/Teamlead";
// import Superadmin from "./pages/Overview/Superadmin";
// import RoleBasedAccess from "../RoleBasedAccess";
// import UnAuthorized from "./pages/UnAuthorized";

// import AddAttendence from './components/AddAttendence'
// import AttendenceShow from './components/Attendence'

// import Dps from './pages/Home/dps';
// import Payment from './pages/Home/pay';
// import Lead from './pages/Home/lead';
// import ForgotPassword from './pages/Home/Authentication/ForgotPassword'
// import { Sidenavbar } from './components/Navigation/Sidenavbar'
// import useAuth from './context/AuthContext'
// import LeadInt from './components/lead/leadInt'
// import TopNavBar from './components/TopNavBar'
// import Authentication from './pages/Overview/login'
// import MembersInfo from './pages/Home/MembersInfo'
// import SalesLeadsInfo from './pages/Home/SalesLeadsInfo'
// import EmployeesInfo from './pages/Home/EmployeesInfo'
// import StudentsInfo from './pages/Home/StudentsInfo'
// import TeamEmployees from "./components/Teaminfo/EmployeeTable"
// import AttendanceCalendar from "./components/Teaminfo/Attendence"

// import Watermark from './components/watermark'
// import OperationOverview from "./pages/Overview/Operations"
// import SalesInt from './components/lead/SalesInt'

// const siderBarAvoiders = [
//   "/",
//   "/login",
//   "/forgotPassword"

// ]

// const options = {
//   admin: "Admin",
//   operations: "Operations",
//   HR: "HR",
//   teamLead: "Team Lead",
//   intern: "Intern",
//   postSales: "Post Sales",
//   DigitalMarketing: "Digital Marteking",
//   roleLoading: "LOADING"
// }


// function App() {
//   const [count, setCount] = useState(0);

//   const { pathname } = useLocation()
//   console.log("this is location", pathname)
//   const navigate = useNavigate()

//   const { userDetails, isLoggedIn, loadingAuth } = useAuth()
//   const [roleAccess, setRoleAccess] = useState(options.roleLoading)

//   console.log("this is from app", userDetails, isLoggedIn)

//   useEffect(() => {
//     function checkLogin() {
//       if (!loadingAuth) {
//         if (!userDetails || !isLoggedIn) {
//           navigate("/")
//         }
//       }

//       if (userDetails) {
//         setRoleAccess(userDetails.role)
//       }
//     }

//     checkLogin()
//   }, [userDetails])

//   //admin routes 
//   function AdminDashboard() {
//     return <Routes>
//       <Route path="/" Component={Authentication} />
//       <Route path="/super" Component={Superadmin} />
//       <Route path="/teaminfo" Component={Teaminformation} />
//       <Route path='/salesLeadInfo' Component={SalesLeadsInfo} />
//       <Route path='/lead' Component={LeadInt} />
//       <Route path='/pay' Component={Payment} />
//       <Route path='/dps' Component={Dps} />
//       <Route path="/announcements" Component={Announcements} />
//       <Route path="/attendance" Component={AttendenceShow} />
//       <Route path="/teams/:teamId/employees" element={<TeamEmployees />} />
//       <Route path="/employees/:teamId/attendence" element={<AttendanceCalendar />} />
//     </Routes>
//   }


//   //operation routes 
//   function OperationDashboard() {
//     return <Routes>
//       <Route path='/studentsinfo' Component={StudentsInfo} />
//       {/* attends */}
//       <Route path='/pay' Component={Payment} />
//       <Route path='/dps' Component={Dps} />
//       <Route path='/attendence' Component={AttendenceShow} />
//       <Route path='/' Component={OperationOverview} />




//     </Routes>
//   }

//   //HR routes 
//   function HRDashBoard() {
//     return <Routes>
//       <Route path="/" Component={HROverView} />
//       <Route path="/addattendence" Component={AddAttendence} />
//       <Route path='/attendence' Component={AttendenceShow} />

//       <Route path='/employeeinfo' Component={EmployeesInfo} />
//       <Route path="/employeeinfo/attendence" element={<AttendenceShow />} />


//       {/* attends  */}
//     </Routes>
//   }

//   //HR Intern routes
//   function HRInternDashboard() {
//     return <Routes>
//       <Route path='/' Component={HROverView} />
//       <Route path='/addattendance' Component={AddAttendence} />
//       <Route path='/attendance' Component={AttendenceShow} />
//       <Route path='/employeeinfo' Component={EmployeesInfo} />
//     </Routes>
//   }
//   //TL routs 
//   function TLDashboard() {
//     return <Routes>
//       <Route path="/" Component={Teamlead} />
//       <Route path='/pay' Component={Payment} />
//       <Route path='/dps' Component={Dps} />
//       <Route path='/attendence' Component={AttendenceShow} />

//       {/* attends  */}
//       {/* member info  */}
//       <Route path='/membersinfo' Component={MembersInfo} />
//       <Route path='/salesLeadInfo/:id' Component={SalesInt} />




//       {/* attends  */}


//       {/* attends  */}

//     </Routes>
//   }

//   //interns routes 
//   function InterDashboard() {
//     return <Routes>
//       <Route path="/" Component={Intern} />
//             {/* <Route path='/int' Component={SalesInt} /> */}


//       {/* student info  */}
//       {/* sales lead info  */}

//       <Route path='/studentsinfo' Component={StudentsInfo} />
//       <Route path='/int' Component={SalesInt} />



//       <Route path='/lead' Component={LeadInt} />
//       <Route path='/pay' Component={Payment} />
//       <Route path='/dps' Component={Dps} />

//       <Route path='/attendence' Component={AttendenceShow} />
//       {/* attend  */}


//     </Routes>
//   }

//   //post sales
//   function PostSalesDashboard() {
//     return <Routes>

//       <Route path="/" Component={PostSales} />
//       {/* attends */}
//       {/* student info  */}

//       {/* attends */}
//       <Route path='/studentsinfo' Component={StudentsInfo} />


//       <Route path='/pay' Component={Payment} />
//       <Route path='/dps' Component={Dps} />
//       <Route path='/attendence' Component={AttendenceShow} />

//     </Routes>
//   }

//   //Digital marketing
//   function DigitalMarketingDashboard() {
//     return <Routes>
//       <Route path="/" Component={DigitalMarketing} />
//       {/* attendance  */}
//       <Route path="/announcements" Component={Announcements} />
//       <Route path='/attendence' Component={AttendenceShow} />


//     </Routes>
//   }


//   function renderRoleBased() {

//     switch (userDetails?.role) {
//       case options.admin:
//         return <AdminDashboard />
//       case options.operations:
//         return <OperationDashboard />
//       case options.HR:
//         return <HRDashBoard />
//       case options.teamLead:
//         return <TLDashboard />
//       case options.intern:
//         return <InterDashboard />
//       case options.postSales:
//         return <PostSalesDashboard />
//       case options.DigitalMarketing:
//         return <DigitalMarketingDashboard />
//     }
//   }

//   if (loadingAuth) {
//     return <div>loading....</div>
//   }

//   return (

//     <>


//       <div className='flex w-full'>

//         <Watermark opacity={0.2} size={180} rotate={-40} text={userDetails?.username ?? "Pursuit future technologies"} />


//         {!siderBarAvoiders.includes(pathname) && <Sidenavbar />}
//         <div className='flex flex-col w-full gap-4 '>

//           {!siderBarAvoiders.includes(pathname) && <TopNavBar />}


//           {renderRoleBased()}
//         </div>
//         <Routes>
//           {/* <Route path='/' Component={Home} /> */}

//           <Route path="/login" Component={Signin} />
//           <Route path='/forgotPassword' Component={ForgotPassword} />
//           <Route Component={<div>Your lost..</div>} />

//         </Routes>
//         {/* <Routes>
//         <Route path='/' Component={Home} />
//         <Route path="/login" Component={Signin} />
//         <Route path='/forgotPassword' Component={ForgotPassword} />
//       </Routes> */}
//         {/*
//         <Route path="/teams/:teamid/employees" Component={EmployeeTable} />

//         <Route path="/operations" Component={Operxations} />
//         <Route path="/admin" Component={Superadmin} />
//         <Route path="/unauthorized" Component={UnAuthorized} />
//         <Route path='role' element={<RoleBasedAccess requiredRoles={["Admin", "Post Sales", "Team Lead"]}>
//           <Teaminformation />
//         </RoleBasedAccess>} /> */}


//         <Toaster />
//       </div>

//     </>

//   );
// }


// export default App;

// App.jsx

import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import { Toaster } from 'react-hot-toast'
import useAuth from './context/AuthContext'
import { Sidenavbar } from './components/Navigation/Sidenavbar'
import TopNavBar from './components/TopNavBar'
import Watermark from './components/watermark'

// Import all pages/components used in routing
import Signin from './pages/Home/Authentication/Signin'
import ForgotPassword from './pages/Home/Authentication/ForgotPassword'
// NOTE: I am keeping 'Authentication' imported from its old path for minimal disruption, 
// but it is not used in the final Routes setup below.
import Authentication from './pages/Overview/login' // <-- Assuming this is the path
// ... import all other components (Home, Superadmin, Teamlead, etc.) ...
import Superadmin from "./pages/Overview/Superadmin";
import Teaminformation from "./pages/Teaminformation";
import SalesLeadsInfo from './pages/Home/SalesLeadsInfo';
import LeadInt from './components/lead/leadInt';
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
                // Check if user is NOT logged in
                if (!userDetails || !isLoggedIn) {
                    // Redirect to /login if they are on a protected route
                    if (!siderBarAvoiders.includes(pathname)) {
                         navigate("/login")
                    }
                } else {
                    // Check if user IS logged in but is on the login page
                    if (pathname === "/login" || pathname === "/forgotPassword") {
                        // Redirect to the dashboard root /
                        navigate("/")
                    }
                    // Set role after userDetails are confirmed
                    setRoleAccess(userDetails.role)
                }
            }
        }
        checkLogin()
    }, [userDetails, isLoggedIn, loadingAuth, navigate, pathname])

    // --- Role-based Dashboard Components ---

    // FIX 2: AdminDashboard - Removed the conflicting <Route path="/" Component={Authentication} />
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
            {/* Added a default home route for when they land on / */}
            <Route path="/" Component={Superadmin} /> 
        </Routes>
    }

    // operation routes 
    function OperationDashboard() {
        return <Routes>
            <Route path='/' Component={OperationOverview} />
            <Route path='/studentsinfo' Component={StudentsInfo} />
            <Route path='/pay' Component={Payment} />
            <Route path='/dps' Component={Dps} />
            <Route path='/attendence' Component={AttendenceShow} />
        </Routes>
    }

    // HR routes 
    function HRDashBoard() {
        return <Routes>
            <Route path="/" Component={HROverView} />
            <Route path="/addattendence" Component={AddAttendence} />
            <Route path='/attendence' Component={AttendenceShow} />
            <Route path='/employeeinfo' Component={EmployeesInfo} />
            <Route path="/employeeinfo/attendence" element={<AttendenceShow />} />
        </Routes>
    }
    
    // ... all other dashboard functions (TLDashboard, InterDashboard, etc.) ...
    
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
                // Handle unmapped role or while loading
                return <UnAuthorized />
        }
    }
    
    if (loadingAuth) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Toaster />

            {/* FIX 3: Top-level Routes for all paths */}
            <Routes>
                
                {/* 1. Public Routes (Must be outside the main dashboard layout) */}
                <Route path="/login" element={<Signin />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                
                {/* 2. Protected Routes (The Main Dashboard Structure) */}
                <Route path="*" element={
                    // Only render the dashboard structure if the user is authenticated.
                    // This handles all routes that are not /login or /forgotPassword.
                    isLoggedIn ? (
                        <div className='flex w-full'>
                            
                            <Watermark opacity={0.2} size={180} rotate={-40} text={userDetails?.username ?? "Pursuit future technologies"} />

                            {!siderBarAvoiders.includes(pathname) && <Sidenavbar />}
                            <div className='flex flex-col w-full gap-4 '>
                                {!siderBarAvoiders.includes(pathname) && <TopNavBar />}
                                
                                {/* Renders the appropriate role-based dashboard Routes */}
                                {renderRoleBased()} 
                            </div>
                        </div>
                    ) : (
                        // If not logged in and not on a public route, this acts as a fallback before redirection
                        <div className="text-center p-10">Checking authentication status...</div> 
                    )
                } />
            </Routes>
        </>
    );
}

export default App;