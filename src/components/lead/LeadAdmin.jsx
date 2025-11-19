// // import React, { useState, useEffect } from 'react';
// // import Table from '../table';
// // import CustomSelect from '../button/CustomSelect';
// // import useAuth from '../../context/AuthContext';
// // import toast from 'react-hot-toast';
// // import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

// // const LeadAdmin = () => {
// //   const { userDetails } = useAuth();
// //   const [leadData, setLeadData] = useState([]);
// //   const [month, setMonth] = useState('');
// //   const [teamName, setTeamName] = useState('');
// //   const [username, setUsername] = useState('');
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(5);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const [teams, setTeams] = useState([]);
// //   const [teamMembers, setTeamMembers] = useState([]);
// //   const [filteredMembers, setFilteredMembers] = useState([]);

// //   // ✅ Fetch teams
// //   useEffect(() => {
// //     const fetchTeams = async () => {
// //       try {
// //         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team`);
// //         if (!res.ok) throw new Error('Failed to fetch teams');
// //         const data = await res.json();

// //         const formattedTeams = data.map(team => ({
// //           id: team.name,
// //           label: team.name,
// //           _id: team._id,
// //         }));
// //         setTeams(formattedTeams);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchTeams();
// //   }, []);

// //   // ✅ Fetch team members
// //   useEffect(() => {
// //     if (!teamName) {
// //       setTeamMembers([]);
// //       return;
// //     }

// //     const selectedTeam = teams.find(t => t.id === teamName);
// //     if (!selectedTeam) {
// //       setTeamMembers([]);
// //       return;
// //     }

// //     const fetchTeamMembers = async () => {
// //       try {
// //         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team/${selectedTeam._id}`);
// //         if (!res.ok) throw new Error('Failed to fetch team members');
// //         const data = await res.json();

// //         const formattedMembers = data?.employees.map(member => ({
// //           id: member._id,
// //           label: member.username,
// //         }));
// //         setTeamMembers(formattedMembers);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchTeamMembers();
// //   }, [teamName, teams]);

// //   // ✅ Filtered members list
// //   useEffect(() => {
// //     setFilteredMembers(teamMembers);
// //     if (!teamMembers.find(m => m.id === username)) setUsername('');
// //   }, [teamMembers, username]);

// //   // ✅ Fetch Leads (with pagination)
// //   const fetchLeads = async () => {
// //     try {
// //       const params = new URLSearchParams();
// //       if (month) params.append('month', month);
// //       if (teamName) params.append('teamName', teamName);
// //       if (username) params.append('username', username);

// //       const res = await fetch(
// //         `${import.meta.env.VITE_BACKEND_URL}/leadgen/leadgen/all?page=${page}&limit=${limit}&${params.toString()}`
// //       );

// //       const data = await res.json();
// //       setLeadData(data.leads || data);
// //       setTotalPages(data.pages || 1);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error('Error fetching leads');
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLeads();
// //   }, [month, teamName, username, page, limit]);

// //   const columns = [
// //     { id: 'name', header: 'Lead Name' },
// //     { id: 'email', header: 'Email ID' },
// //     { id: 'contactNumber', header: 'Phone Number' },
// //     { id: 'branch', header: 'Department/Branch' },
// //     { id: 'collegeName', header: 'College' },
// //     { id: 'domain1', header: 'Course Interest' },
// //     { id: 'yearOfStudy', header: 'Batch' },
// //     { id: 'status', header: 'Status' },
// //   ];

// //   // ✅ Pagination handlers
// //   const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));
// //   const handleNextPage = () => setPage(prev => Math.min(prev + 1, totalPages));

// //   return (
// //     <div className="mt-6 px-6">
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-xl font-sans">Lead Generation Info</h2>

// //         <div className="flex gap-3">
// //           <CustomSelect
// //             title="Month"
// //             options={[
// //               { id: 'January', label: 'January' },
// //               { id: 'February', label: 'February' },
// //               { id: 'March', label: 'March' },
// //               { id: 'April', label: 'April' },
// //               { id: 'May', label: 'May' },
// //               { id: 'June', label: 'June' },
// //               { id: 'July', label: 'July' },
// //               { id: 'August', label: 'August' },
// //               { id: 'September', label: 'September' },
// //               { id: 'October', label: 'October' },
// //               { id: 'November', label: 'November' },
// //               { id: 'December', label: 'December' },
// //             ]}
// //             value={month}
// //             onChange={e => setMonth(e.target.value)}
// //           />

// //           {(userDetails.role === 'Admin' || userDetails.role === 'Team Lead') && (
// //             <>
// //               <CustomSelect
// //                 title="Team Name"
// //                 options={teams}
// //                 value={teamName}
// //                 onChange={e => setTeamName(e.target.value)}
// //               />

// //               <CustomSelect
// //                 title="Team Member"
// //                 options={filteredMembers}
// //                 value={username}
// //                 onChange={e => setUsername(e.target.value)}
// //                 disabled={!teamName}
// //               />
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       <div className="mt-[0.5%]">
// //         <Table columns={columns} data={leadData} />
// //       </div>

// //       {/* ✅ Pagination Controls */}
// //       <div className="flex justify-between items-center mt-6">
// //         <button
// //           onClick={handlePrevPage}
// //           disabled={page === 1}
// //           className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
// //         >
// //           <FaArrowLeftLong /> Prev
// //         </button>

// //         <span className="text-gray-700">
// //           Page {page} of {totalPages}
// //         </span>

// //         <button
// //           onClick={handleNextPage}
// //           disabled={page === totalPages}
// //           className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
// //         >
// //           Next <FaArrowRightLong />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LeadAdmin;
// import React, { useState, useEffect } from 'react';
// import Table from '../table';
// import CustomSelect from '../button/CustomSelect';
// import useAuth from '../../context/AuthContext';
// import toast from 'react-hot-toast';
// import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

// // Month options must match backend expected keys (Month name)
// const monthOptions = [
//     { id: 'January', label: 'January' },
//     { id: 'February', label: 'February' },
//     { id: 'March', label: 'March' },
//     { id: 'April', label: 'April' },
//     { id: 'May', label: 'May' },
//     { id: 'June', label: 'June' },
//     { id: 'July', label: 'July' },
//     { id: 'August', label: 'August' },
//     { id: 'September', label: 'September' },
//     { id: 'October', label: 'October' },
//     { id: 'November', label: 'November' },
//     { id: 'December', label: 'December' },
// ];

// const LeadAdmin = () => {
//   const { userDetails } = useAuth();
//   const [leadData, setLeadData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [teamName, setTeamName] = useState('');
//   // 'username' state holds the selected Employee ID (string)
//   const [username, setUsername] = useState(''); 
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);

//   const [teams, setTeams] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   // State for members to display in the dropdown
//   const [filteredMembers, setFilteredMembers] = useState([]); 

//   // 1. Fetch all teams
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team`);
//         if (!res.ok) throw new Error('Failed to fetch teams');
//         const data = await res.json();

//         const formattedTeams = data.map(team => ({
//           id: team.name,
//           label: team.name,
//           _id: team._id,
//         }));
//         setTeams(formattedTeams);
//       } catch (error) {
//         console.error("Error fetching teams:", error);
//       }
//     };
//     fetchTeams();
//   }, []);

//   // 2. Fetch team members when teamName changes
//   useEffect(() => {
//     if (!teamName) {
//       setTeamMembers([]);
//       return;
//     }

//     const selectedTeam = teams.find(t => t.id === teamName);
//     if (!selectedTeam) {
//       setTeamMembers([]);
//       return;
//     }

//     const fetchTeamMembers = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team/${selectedTeam._id}`);
//         if (!res.ok) throw new Error('Failed to fetch team members');
//         const data = await res.json();
        
//         // Ensure employees exist and is an array before mapping
//         const employees = data?.employees || [];

//         const formattedMembers = employees.map(member => ({
//           id: member._id, // Value is the employee ID
//           label: member.username, // Display name
//         }));
//         setTeamMembers(formattedMembers);
//       } catch (error) {
//         console.error("Error fetching team members:", error);
//       }
//     };

//     fetchTeamMembers();
//   }, [teamName, teams]);

//   // 3. Update filtered members list and reset username if selected member leaves team
//   useEffect(() => {
//     setFilteredMembers(teamMembers);
//     // Check if the currently selected username (ID) is still in the new teamMembers list
//     if (username && !teamMembers.find(m => m.id === username)) {
//       setUsername('');
//     }
//   }, [teamMembers]);

//   // 4. Fetch Leads (with pagination and filters)
//   const fetchLeads = async () => {
//     try {
//       const params = new URLSearchParams();
//       
//       if (month) params.append('month', month);
//       if (teamName) params.append('teamName', teamName);
//       
//       // ✅ FIX 1: Change parameter name from 'username' to 'employeeId'
//       // 'username' state holds the Employee ID
//       if (username) params.append('employeeId', username); 

//       // If the employee parameter is used, you might need a different endpoint.
//       // Assuming /leadgen/all handles the employeeId query correctly:
//       // ✅ FIX 2: Correct the fetch URL to remove the duplicate segment if needed
//       const url = `${import.meta.env.VITE_BACKEND_URL}/leadgen/leadgen/all?page=${page}&limit=${limit}&${params.toString()}`;
      
//       console.log("LeadAdmin Fetching URL:", url);

//       const res = await fetch(url);

//       if (!res.ok) {
//           // If the backend returns a 404/500, we catch it here.
//           const errorData = await res.json();
//           throw new Error(errorData.message || `Failed to fetch leads with status ${res.status}`);
//       }

//       const data = await res.json();
      
//       // ✅ FIX 3: Robustly check the expected data properties from the backend
//       const fetchedLeads = data.leads || data.data || [];
//       if (fetchedLeads.length === 0 && (month || teamName || username)) {
//            toast('No leads found for selected filters.', { icon: '🔍' });
//       }
      
//       setLeadData(fetchedLeads); 
//       setTotalPages(data.pages || Math.ceil((data.total || 1) / limit)); // Better total page fallback
//     } catch (error) {
//       console.error("Fetch Leads Error:", error);
//       setLeadData([]);
//       setTotalPages(1);
//       toast.error('Error fetching leads: ' + error.message);
//     }
//   };

//   useEffect(() => {
//     // Reset page to 1 when filters change
//     if (page === 1) {
//         fetchLeads();
//     } else {
//         setPage(1);
//     }
//   }, [month, teamName, username]); 
  
//   // Refetch only when page/limit changes
//   useEffect(() => {
//       fetchLeads();
//   }, [page, limit]);

//   const columns = [
//     { id: 'name', header: 'Lead Name' },
//     { id: 'email', header: 'Email ID' },
//     { id: 'contactNumber', header: 'Phone Number' },
//     { id: 'branch', header: 'Department/Branch' },
//     { id: 'collegeName', header: 'College' },
//     { id: 'domain1', header: 'Course Interest' },
//     { id: 'yearOfStudy', header: 'Batch' },
//     { id: 'status', header: 'Status' },
//   ];

//   // ✅ Pagination handlers
//   const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));
//   const handleNextPage = () => setPage(prev => Math.min(prev + 1, totalPages));

//   return (
//     <div className="mt-6 px-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-sans">Lead Generation Info</h2>

//         <div className="flex gap-3">
//           <CustomSelect
//             title="Month"
//             options={monthOptions}
//             value={month}
//             onChange={e => setMonth(e.target.value)}
//           />

//           {(userDetails.role === 'Admin' || userDetails.role === 'Team Lead') && (
//             <>
//               <CustomSelect
//                 title="Team Name"
//                 options={teams}
//                 value={teamName}
//                 onChange={e => {
//                       setTeamName(e.target.value);
//                       setUsername(''); // Clear employee filter when team changes
//                   }}
//               />

//               <CustomSelect
//                 title="Team Member"
//                 options={filteredMembers}
//                 value={username}
//                 onChange={e => setUsername(e.target.value)}
//                 disabled={!teamName || filteredMembers.length === 0}
//               />
//             </>
//           )}
//         </div>
//       </div>

//       <div className="mt-[0.5%]">
//         <Table columns={columns} data={leadData} />
//         {leadData.length === 0 && <p className="text-center text-lg text-gray-500 mt-10">No lead data found.</p>}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={handlePrevPage}
//           disabled={page === 1}
//           className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
//         >
//           <FaArrowLeftLong /> Prev
//         </button>

//         <span className="text-gray-700">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           onClick={handleNextPage}
//           disabled={page === totalPages}
//           className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
//         >
//           Next <FaArrowRightLong />
//         </button>
//       </div>
//       )}
//     </div>
//   );
// };

// export default LeadAdmin;