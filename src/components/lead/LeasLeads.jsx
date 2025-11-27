import React, { useEffect, useState } from "react";
import Table from "../table";
import CustomSelect from "../button/CustomSelect";
import useAuth from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const LeadLeads=()=>{
    const {userDetails}=useAuth();
    const [salesLeadData, setSalesLeadData]=useState([]);
    const [month, setMonth]=useState("");
    const [teamName, setTeamName]=useState("");
    const [username, setUsername]=useState("");
    const [statusFilter, setStatusFilter]=useState(''); // ⬅️ NEW State for Status Filter
    const [page, setPage]=useState(1);
    const [limit, setLimit]=useState(20);
    const [totalPages, setTotalPages]=useState(1);
    const [teams, setTeams]=useState([]);
    const [teamMembers, setTeamMembers]=useState([]);
    const [filteredMembers, setFilteredMembers]=useState([]);
    const [statusMap, setStatusMap]=useState({});
    const statusOptions = ['Not Interested', 'Answered', 'Follow Up', 'Parents Update', 'No Status', 'Not Answered'];


    useEffect(()=>{
        const fetchTeams=async()=>{
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team`);
                if(!res.ok) throw new Error("Failed to fetch items");
                const data = await res.json();
                const formattedTeams = data.map(team => ({
                    id:team.name,
                    label:team.name,
                    _id:team._id,
                }));
                setTeams(formattedTeams);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchTeams();
    },[]);

    useEffect(()=>{
        if(!teamName){
            setTeamMembers([]);
            return;
        }
        const selectedTeam=teams.find(t => t.id === teamName)
        if(!selectedTeam){
            setTeamMembers([]);
            return;
        }
        const fetchTeamMembers=async()=>{
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/team/${selectedTeam._id}`);
                if(!res.ok) throw new Error('Failed to fetch team members');
                const data = await res.json();
                const formattedMembers=data?.employees.map(member=>({
                    id:member._id,
                    label:member.username,
                }));
                setTeamMembers(formattedMembers);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchTeamMembers();
    },[teamName, teams]);

    useEffect(()=>{
        setFilteredMembers(teamMembers);
        if(!teamMembers.find(m => m.id === username)) setUsername('');
    },[teamMembers, username]);

const fetchSalesLead=async()=>{
    try{
        const params = new URLSearchParams();
        params.append('page', page); 
        params.append('limit', limit); 
        if(month) params.append('month', month);
        if(teamName) params.append('teamName', teamName);
        if(username) params.append('employeeId', username);
        if(statusFilter) params.append('status', statusFilter); // ⬅️ Apply status filter to API call

 const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leadgen/leadgen/all?${params.toString()}`,
 {
     headers: {Authorization: `Bearer ${localStorage.getItem('session_token')}`},
 signal: AbortSignal.timeout(5000)
});
            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Failed to fetch leads with status ${res.status}`);
            }
             const data = await res.json();
              const leads = data.leads || data.data || [];
               setSalesLeadData(leads);
               setTotalPages(data.pages || Math.ceil((data.total || 1) / limit)); 
               const initialStatus={};
               leads.forEach(item=>{
                initialStatus[item._id]=item.status || 'Not Answered';
            });
            setStatusMap(initialStatus);
        }catch(error){
             console.error("Error fetching leads:", error);
            toast.error(error.message || 'Cannot fetch lead data');
            setSalesLeadData([]);
            setTotalPages(1);
         }
         };

    useEffect(()=>{
        fetchSalesLead();
    },[month, teamName, username, statusFilter, page, limit]); // ⬅️ Added statusFilter dependency

    const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

    async function handleStatusChange(value,id){
        setStatusMap(prev=>({...prev, [id]:value}));

        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leadgen/leadgen/update/${id}`,
                {
                    method: 'PUT',
                    headers:{
                        'content-type':'application/json',
                    },
                    body: JSON.stringify({status:value}),
                }
            );
            if(!response.ok) throw new Error();
            toast.success('Status updated');
        }
        catch(error){
            toast.error(`Cannot update status: ${error}`);
        }
    }

     const columns = [
    { id: 'name', header: 'Lead Name' },
    { id: 'Email', header: 'Email ID' },
    { id: 'contactNumber', header: 'Phone Number' },
    { id: 'branch', header: 'Department/Branch' },
    { id: 'collegaName', header: 'College' },
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
            <span className="p-1 rounded bg-gray-100 text-gray-700 font-medium">
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
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );
      },
    },
  ];


  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Leads Info</h2>

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
                onChange={e => setTeamName(e.target.value)}
              />

              <CustomSelect
                title="Team Member"
                options={filteredMembers}
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={!teamName}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-[0.5%]">
        <Table columns={columns} data={salesLeadData} />
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

export default LeadLeads;