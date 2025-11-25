import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import arrow from "../assets/arrow.png";
import Delete from "../assets/Teaminfo/delete.svg";
import toast from "react-hot-toast";
import Table from "./table";

const Employees = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const team = location.state; 
  const navigate = useNavigate();

  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);


  console.log("teamid......this is the team id", teamId);
  const TeamsEmployee = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user?role=${teamId}`);
      const data = await res.json();
      setTeams(data.data);
      console.log("teamemployee", data);
    } catch (error) {
      console.error("Error fetching team employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    TeamsEmployee();
  }, [team]);

  if (loading) {
    return <p className="text-center mt-10">Loading employees...</p>;
  }

  if (!teams) {
    return <p>No team data found. Go back and try again.</p>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Employee deleted successfully");
          TeamsEmployee(); 
        } else {
          toast.error("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error during deletion:", error);
        toast.error("Something went wrong");
      }
    }
  };

//   const category = "Digital Marketing";
// const clean = category.replace(/\s+/g, "-");
// // "Digital-Marketing"
// navigate(`/spf/${clean}/abcdef`);


  const columns = [
    {
      id: "username",
      header: "Employee Name",
      cell: (row) => (
        
          <div className="flex justify-center items-center gap-2">
            <p className="text-[#004aad]">{row.username}</p>
            {/* <img src={arrow} alt="arrow" className="w-3 h-3" /> */}
          </div>
      ),
    },
    { id: "email", header: "Email" },
    { id: "phone", header: "Contact" },
    { id: "whatsappNumber", header: "WhatsApp" },
    { id: "officeLocation", header: "Location" },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-5 ml-5">
          <button onClick={() => handleDelete(row._id)}>
            <img src={Delete} className="w-5 h-6" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">{teamId} Team</h2>

      <Table data={teams} columns={columns} />
    </div>
  );
};

export default Employees;
