
// // import React, { useState, useEffect } from 'react';
// // import Table from '../table';
// // import CustomSelect from '../button/CustomSelect';
// // import useAuth from '../../context/AuthContext';
// // import toast from 'react-hot-toast';

// // const SalesLeads = () => {
// //   const { userDetails } = useAuth();
// //   const [salesLeadData, setSalesLeadData] = useState([]);
// //   const [month, setMonth] = useState('');
// //   const [teamName, setTeamName] = useState('');
// //   const [username, setUsername] = useState('');
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(5);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const [teams, setTeams] = useState([]);
// //   const [teamMembers, setTeamMembers] = useState([]);
// //   const [filteredMembers, setFilteredMembers] = useState([]);

// //   const [statusMap, setStatusMap] = useState({});


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

  
// //   useEffect(() => {
// //     setFilteredMembers(teamMembers);
// //     if (!teamMembers.find(m => m.id === username)) setUsername('');
// //   }, [teamMembers, username]);

 
// //   const fetchSalesLead = async () => {
// //     try {
// //       const params = new URLSearchParams();
// //       if (month) params.append('month', month);
// //       if (teamName) params.append('teamName', teamName);
// //       if (username) params.append('username', username);

// //       const res = await fetch(
// //         `${import.meta.env.VITE_BACKEND_URL}/saleslead/allLeads?page=${page}&limit=${limit}&${params.toString()}`,
// //         {
// //           headers: { Authorization: `Bearer ${localStorage.getItem('session_token')}` },
// //         }
// //       );

// //       const data = await res.json();
// //       setSalesLeadData(data.salesLeads);
// //       setTotalPages(data.pages);


// //       const initialStatus = {};
// //       data.salesLeads.forEach(item => {
// //         initialStatus[item._id] = item.status;
// //       });
// //       setStatusMap(initialStatus);

// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSalesLead();
// //   }, [month, teamName, username, page, limit]);

 
// //   async function handleStatusChange(value, id) {
  
// //     setStatusMap(prev => ({ ...prev, [id]: value }));

// //     try {
// //       const response = await fetch(
// //         `${import.meta.env.VITE_BACKEND_URL}/saleslead/status/update/${id}`,
// //         {
// //           method: 'PUT',
// //           headers: {
// //             'content-type': 'application/json',
// //           },
// //           body: JSON.stringify({ status: value }),
// //         }
// //       );

// //       if (!response.ok) throw new Error();

// //       toast.success('Status updated');
// //     } catch (error) {
// //       toast.error('Cannot update status');
// //     }
// //   }

// //   const columns = [
// //     { id: 'name', header: 'Lead Name' },
// //     { id: 'Email', header: 'Email ID' },
// //     { id: 'contactNumber', header: 'Phone Number' },
// //     { id: 'branch', header: 'Department/Branch' },
// //     { id: 'collegaName', header: 'College' },
// //     { id: 'domain1', header: 'Course Interest' },
// //     { id: 'yearOfStudy', header: 'Batch' },

// //     {
// //       id: 'status',
// //       header: 'Status',
// //       cell: row => (
// //         <select
// //           className="border p-1 rounded"
// //           value={statusMap[row._id] || 'No Status'}
// //           onChange={e => handleStatusChange(e.target.value, row._id)}
// //         >
// //           {['Not Interested', 'Answered', 'Follow Up', 'Parents Update'].map(o => (
// //             <option key={o} value={o}>
// //               {o}
// //             </option>
// //           ))}
// //         </select>
// //       ),
// //     },
// //   ];


// //   return (
// //     <div className="mt-6 px-6">
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-xl font-sans">Leads Info</h2>

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
// //         <Table columns={columns} data={salesLeadData} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default SalesLeads;
// import React, { useState, useEffect } from 'react';
// import Table from '../table';
// import CustomSelect from '../button/CustomSelect';
// import useAuth from '../../context/AuthContext';
// import toast from 'react-hot-toast';
// import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'; // ⬅️ Imported for pagination

// const SalesLeads = () => {
//   const { userDetails } = useAuth();
//   const [salesLeadData, setSalesLeadData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [teamName, setTeamName] = useState('');
//   const [username, setUsername] = useState('');
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [teams, setTeams] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [statusMap, setStatusMap] = useState({});
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team`);
//         if (!res.ok) throw new Error('Failed to fetch teams');
//         const data = await res.json();
//         const formattedTeams = data.map(team => ({
//           id: team.name,
//           label: team.name,
//           _id: team._id,
//         }));
//         setTeams(formattedTeams);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTeams();
//   }, []);

//   useEffect(() => {
//     if (!teamName) {
//       setTeamMembers([]);
//       return;
//     }

//     const selectedTeam = teams.find(t => t.id === teamName);
//     if (!selectedTeam) {
//       setTeamMembers([]);
//       return;
//     }

//     const fetchTeamMembers = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team/${selectedTeam._id}`);
//         if (!res.ok) throw new Error('Failed to fetch team members');
//         const data = await res.json();

//         const formattedMembers = data?.employees.map(member => ({
//           id: member._id,
//           label: member.username,
//         }));
//         setTeamMembers(formattedMembers);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTeamMembers();
//   }, [teamName, teams]);
//   useEffect(() => {
//     setFilteredMembers(teamMembers);
//     if (!teamMembers.find(m => m.id === username)) setUsername('');
//   }, [teamMembers, username]);


//  const fetchSalesLead = async () => {
//  try {
//  const params = new URLSearchParams();
//       params.append('page', page);
//       params.append('limit', limit);
      
//  if (month) params.append('month', month);
//  if (teamName) params.append('teamName', teamName);
//  if (username) params.append('employeeId', username);

//  const res = await fetch(
//  `${import.meta.env.VITE_BACKEND_URL}/saleslead/allLeads?${params.toString()}`, // Cleaned URL join
//  {
//  headers: { Authorization: `Bearer ${localStorage.getItem('session_token')}` },
//  } );
      
//       if (!res.ok) {
//            const errorData = await res.json();
//            throw new Error(errorData.message || `Failed to fetch sales leads with status ${res.status}`);
//       }

//  const data = await res.json();
//  setSalesLeadData(data.salesLeads || data.data || []);
//  setTotalPages(data.pages || Math.ceil((data.total || 1) / limit)); // Robust page calculation

//  const initialStatus = {};
//  (data.salesLeads || data.data || []).forEach(item => {
//  initialStatus[item._id] = item.status || 'Not Answered';
//  });
//  setStatusMap(initialStatus);

//  } catch (error) {
//  console.error("Error fetching sales leads:", error);
//       toast.error(error.message || 'Error fetching sales leads');
//       setSalesLeadData([]);
//       setTotalPages(1);
//  }
//  };
//   useEffect(() => {
//  fetchSalesLead();
//  }, [month, teamName, username, page, limit]); 
//  const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));
//   const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));
//    async function handleStatusChange(value, id) {
//     setStatusMap(prev => ({ ...prev, [id]: value }));

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/saleslead/status/update/${id}`,
//         {
//            method: 'PUT',
//            headers: {
//             'content-type': 'application/json',
//           },
//           body: JSON.stringify({ status: value }),
//         }
//       );

//       if (!response.ok) throw new Error();

//       toast.success('Status updated');
//     } catch (error) {
//       toast.error(`Cannot update status: ${error}`);
//     }
//   }

//   const columns = [
//     { id: 'name', header: 'Lead Name' },
//     { id: 'email', header: 'Email ID' }, 
//     { id: 'contactNumber', header: 'Phone Number' },
// { id: 'branch', header: 'Department/Branch' },
// { id: 'collegeName', header: 'College' }, 
// { id: 'domain1', header: 'Course Interest' },
// { id: 'yearOfStudy', header: 'Batch' },

// {
//   id: 'status',
// header: 'Status',
// cell: row => {
//   const isAdmin = userDetails.role === 'Admin';
//   const currentValue = statusMap[row._id] || 'Not Answered';

//   if (isAdmin) {
//      return (
//        <span className="p-1 rounded bg-gray-100 text-gray-700">
//          {currentValue}
//           </span>
//            );
//            }
//            return (
//              <select
//               className="border p-1 rounded"
//                value={currentValue}
//                onChange={e => handleStatusChange(e.target.value, row._id)}
//                >{['Interested', 'Not Interested', 'Not Answered', 'Follow Up', 'Parents Update'].map(o => (
//                <option key={o} value={o}>{o}</option>
//                ))}
//                </select>
//                );
// },
// },
// ];


// return (
// <div className="mt-6 px-6">
// <div className="flex items-center justify-between mb-4">
// <h2 className="text-xl font-sans">Sales Leads Info</h2>

// <div className="flex gap-3">
// <CustomSelect
//  title="Month"
//  options={[
//   { id: 'January', label: 'January' },
// { id: 'February', label: 'February' },
// { id: 'March', label: 'March' },
// { id: 'April', label: 'April' },
// { id: 'May', label: 'May' },
// { id: 'June', label: 'June' },
// { id: 'July', label: 'July' },
// { id: 'August', label: 'August' },
// { id: 'September', label: 'September' },
// { id: 'October', label: 'October' },
// { id: 'November', label: 'November' },
// { id: 'December', label: 'December' },
// ]}
// value={month}
//  onChange={e => setMonth(e.target.value)}
// />

// {(userDetails.role === 'Admin' || userDetails.role === 'Team Lead') && (
// <>
// <CustomSelect
// title="Team Name"
// options={teams}
// value={teamName}
// onChange={e => {
//                     setTeamName(e.target.value);
//                     setUsername('');
//                 }}
// />

// <CustomSelect
// title="Team Member"
// options={filteredMembers}
// value={username}
// onChange={e => setUsername(e.target.value)}
// disabled={!teamName || filteredMembers.length === 0}
// />
// </>
// )}
// </div>

// </div>

// <div className="mt-[0.5%]">
//         {salesLeadData.length > 0 ? (
// <Table columns={columns} data={salesLeadData} />
//         ) : (
//              <p className="text-center text-lg text-gray-500 mt-10">No sales lead data found.</p>
//         )}
// </div>

// {(totalPages > 1 && salesLeadData.length > 0) && (
// <div className="flex justify-between items-center mt-6">
// <button
// onClick={handlePrevious}
// disabled={page === 1}
//  className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
// >
// <FaArrowLeftLong /> Prev
// </button>

// <span className="text-gray-700">
// Page {page} of {totalPages}
// </span>

// <button
// onClick={handleNext}
// disabled={page === totalPages}
// className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
// >
// Next <FaArrowRightLong />
// </button>
// </div>
// )}
// </div>
// );
// };

// export default SalesLeads;

import React, { useState, useEffect } from 'react';
import Table from '../table';
import CustomSelect from '../button/CustomSelect';
import useAuth from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const SalesLeads = () => {
  const { userDetails } = useAuth();
  const [salesLeadData, setSalesLeadData] = useState([]);
  const [month, setMonth] = useState('');
  const [teamName, setTeamName] = useState('');
  const [username, setUsername] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // ⬅️ NEW State for Status Filter
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team`);
        if (!res.ok) throw new Error('Failed to fetch teams');
        const data = await res.json();
        const formattedTeams = data.map(team => ({
          id: team.name,
          label: team.name,
          _id: team._id,
        }));
        setTeams(formattedTeams);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (!teamName) {
      setTeamMembers([]);
      return;
    }

    const selectedTeam = teams.find(t => t.id === teamName);
    if (!selectedTeam) {
      setTeamMembers([]);
      return;
    }

    const fetchTeamMembers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team/${selectedTeam._id}`);
        if (!res.ok) throw new Error('Failed to fetch team members');
        const data = await res.json();

        const formattedMembers = data?.employees.map(member => ({
          id: member._id,
          label: member.username,
        }));
        setTeamMembers(formattedMembers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamMembers();
  }, [teamName, teams]);

  useEffect(() => {
    setFilteredMembers(teamMembers);
    if (!teamMembers.find(m => m.id === username)) setUsername('');
  }, [teamMembers, username]);


 const fetchSalesLead = async () => {
 try {
 const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);

 if (month) params.append('month', month);
 if (teamName) params.append('teamName', teamName);
 if (username) params.append('employeeId', username);
 if (statusFilter) params.append('status', statusFilter); // ⬅️ ADDED Status Filter to params

 const res = await fetch(
 `${import.meta.env.VITE_BACKEND_URL}/saleslead/allLeads?${params.toString()}`,
 {
 headers: { Authorization: `Bearer ${localStorage.getItem('session_token')}` },
 } );

      if (!res.ok) {
           const errorData = await res.json();
           throw new Error(errorData.message || `Failed to fetch sales leads with status ${res.status}`);
      }

 const data = await res.json();
 const leads = data.salesLeads || data.data || [];
 setSalesLeadData(leads);
 setTotalPages(data.pages || Math.ceil((data.total || 1) / limit));

 const initialStatus = {};
 leads.forEach(item => {
 initialStatus[item._id] = item.status || 'Not Answered';
 });
 setStatusMap(initialStatus);

 } catch (error) {
 console.error("Error fetching sales leads:", error);
      toast.error(error.message || 'Error fetching sales leads');
      setSalesLeadData([]);
      setTotalPages(1);
 }
 };

  useEffect(() => {
 // Re-fetch data whenever any filter or pagination state changes
 fetchSalesLead();
 }, [month, teamName, username, statusFilter, page, limit]); // ⬅️ ADDED statusFilter to dependency array

 const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));
 const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

   async function handleStatusChange(value, id) {
    setStatusMap(prev => ({ ...prev, [id]: value }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/saleslead/status/update/${id}`,
        {
           method: 'PUT',
           headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ status: value }),
        }
      );

      if (!response.ok) throw new Error();

      toast.success('Status updated');
    } catch (error) {
      toast.error(`Cannot update status: ${error}`);
    }
  }

  const statusOptions = ['Interested', 'Not Interested', 'Not Answered', 'Follow Up', 'Parents Update'];

  const columns = [
    { id: 'name', header: 'Lead Name' },
    { id: 'email', header: 'Email ID' },
    { id: 'contactNumber', header: 'Phone Number' },
    { id: 'branch', header: 'Department/Branch' },
    { id: 'collegeName', header: 'College' },
    { id: 'domain1', header: 'Course Interest' },
    { id: 'yearOfStudy', header: 'Batch' },

    {
      id: 'status',
      header: 'Status',
      cell: row => {
        const isAdmin = userDetails.role === 'Admin';
        const currentValue = statusMap[row._id] || 'Not Answered';

        if (isAdmin) {
          return (
            <span className="p-1 rounded bg-gray-100 text-gray-700">
              {currentValue}
            </span>
          );
        }
        return (
          <select
            className="border p-1 rounded"
            value={currentValue}
            onChange={e => handleStatusChange(e.target.value, row._id)}
          >
            {statusOptions.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        );
      },
    },
  ];


return (
<div className="mt-6 px-6">
<div className="flex items-center justify-between mb-4">
<h2 className="text-xl font-sans">Sales Leads Info</h2>

<div className="flex gap-3">
<CustomSelect
 title="Month"
 options={[
  { id: 'January', label: 'January' },
{ id: 'February', label: 'February' },
{ id: 'March', label: 'March' },
{ id: 'April', label: 'April' },
{ id: 'May', label: 'May' },
{ id: 'June', label: 'June' },
{ id: 'July', label: 'July' },
{ id: 'August', label: 'August' },
{ id: 'September', label: 'September' },
{ id: 'October', label: 'October' },
{ id: 'November', label: 'November' },
{ id: 'December', label: 'December' },
]}
value={month}
 onChange={e => setMonth(e.target.value)}
/>

{/* ⬅️ NEW Status Filter */}
<CustomSelect
 title="Filter by Status"
 options={statusOptions.map(s => ({ id: s, label: s }))}
value={statusFilter}
 onChange={e => setStatusFilter(e.target.value)}
/>

{(userDetails.role === 'Admin' || userDetails.role === 'Team Lead') && (
<>
<CustomSelect
title="Team Name"
options={teams}
value={teamName}
onChange={e => {
                    setTeamName(e.target.value);
                    setUsername('');
                }}
/>

<CustomSelect
title="Team Member"
options={filteredMembers}
value={username}
onChange={e => setUsername(e.target.value)}
disabled={!teamName || filteredMembers.length === 0}
/>
</>
)}
</div>

</div>

<div className="mt-[0.5%]">
        {salesLeadData.length > 0 ? (
<Table columns={columns} data={salesLeadData} />
        ) : (
             <p className="text-center text-lg text-gray-500 mt-10">No sales lead data found.</p>
        )}
</div>

{(totalPages > 1 && salesLeadData.length > 0) && (
<div className="flex justify-between items-center mt-6">
<button
onClick={handlePrevious}
disabled={page === 1}
 className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
>
<FaArrowLeftLong /> Prev
</button>

<span className="text-gray-700">
Page {page} of {totalPages}
</span>

<button
onClick={handleNext}
disabled={page === totalPages}
className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
>
Next <FaArrowRightLong />
</button>
</div>
)}
</div>
);
};

export default SalesLeads;