// // // import React, { useEffect, useState } from "react";
// // // import CustomSelect from "../button/CustomSelect";
// // // import CustomInput from "../ui/CustomInput";
// // // import useFetchEmployees from "../../utils/useFetchEmployeesUtils";

// // // function MarkAttendance() {
// // //   const { data, loading, message } = useFetchEmployees();
// // //   const [employees, setEmployees] = useState([]);

// // //   useEffect(() => {
// // //     if (data?.users && data.users.length > 0) {
// // //       console.log("Fetched employees data:", data);

// // //       const formatted = data.users.map((emp) => ({
// // //         employeeId: emp.employeeId,
// // //         employee: emp._id,
// // //         empname: emp.username,
// // //         attendance: "Present",
// // //         remark: "No",
// // //       }));

// // //       setEmployees(formatted);
// // //     }
// // //   }, [data]);

// // //   const handleChange = (id, field, value) => {
// // //     setEmployees((prev) =>
// // //       prev.map((emp) =>
// // //         emp.employee === id ? { ...emp, [field]: value } : emp
// // //       )
// // //     );
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/attendence/attendence`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(employees),
// // //       });

// // //       const result = await res.json();

// // //       if (res.ok) {
// // //         console.log("Attendance saved successfully", result);
// // //         alert("Attendance saved successfully!");

// // //         // Reset remarks only, keep attendance default as "Present"
// // //         setEmployees((prev) =>
// // //           prev.map((emp) => ({
// // //             ...emp,
// // //             attendance: "Present",
// // //             remark: "No",
// // //           }))
// // //         );
// // //       } else {
// // //         console.error("Error saving attendance", result);
// // //         alert(result.message || "Error saving attendance");
// // //       }
// // //     } catch (err) {
// // //       console.error("Error saving attendance:", err);
// // //       alert("Something went wrong while saving attendance");
// // //     }
// // //   };

// // //   if (loading) return <p>Loading employees...</p>;
// // //   if (message) return <p>{message}</p>;

// // //   return (
// // //     <div>
// // //       <h2 className="text-[#444444] text-xl font-DMSans p-1">
// // //         Mark Attendance
// // //       </h2>

// // //       <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
// // //         <div className="flex flex-col gap-4">
// // //           {employees.map((emp) => (
// // //             <div
// // //               key={emp.employee}
// // //               className="flex items-center justify-between pb-3 gap-2"
// // //             >
// // //               <div className="flex flex-col text-[#444444] w-[180px] h-[31px]">
// // //                 <p>{emp.employeeId}</p>
// // //                 <p>{emp.empname}</p>
// // //               </div>

// // //               <CustomSelect
// // //                 title="Attendance"
// // //                 options={[
// // //                   { id: "Present", label: "Present" },
// // //                   { id: "Absent", label: "Absent" },
// // //                   { id: "Leave", label: "Leave" },
// // //                 ]}
// // //                 value={emp.attendance}
// // //                 onChange={(e) =>
// // //                   handleChange(emp.employee, "attendance", e.target.value)
// // //                 }
// // //               />

// // //               <CustomInput
// // //                 type="text"
// // //                 title="Remark"
// // //                 value={emp.remark}
// // //                 onChange={(e) =>
// // //                   handleChange(emp.employee, "remark", e.target.value)
// // //                 }
// // //                 placeholder={
// // //                   emp.attendance === "Absent" ? "Reason for absence" : ""
// // //                 }
// // //               />
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <div className="mt-6 text-right">
// // //         <button
// // //           onClick={handleSave}
// // //           className="bg-[#004AAD] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#003377] transition-all"
// // //         >
// // //           Save
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default MarkAttendance;
// // import React, { useEffect, useState } from "react";
// // import CustomSelect from "../button/CustomSelect";
// // import CustomInput from "../ui/CustomInput";
// // import useFetchEmployees from "../../utils/useFetchEmployeesUtils"; 

// // // 🚨 ASSUMPTION: You must replace this with your actual authentication hook 
// // // that provides the logged-in user's details, including 'officeLocation'.
// // const useAuth = () => {
// //   // --- PLACEHOLDER START ---
// //   // Replace this placeholder object with your actual user context/state
// //   const user = {
// //     // Example: The HR is assigned to the "Hyderabad" office
// //     officeLocation: "Hyderabad", 
// //     username: "HR Manager",
// //   };
// //   const loading = false; // Set to true while fetching user data
// //   // --- PLACEHOLDER END ---
  
// //   return { user, loading };
// // };

// // function MarkAttendance() {
// //   // 1. Get the HR's assigned location from their user details
// //   const { user, loading: authLoading } = useAuth();
  
// //   // Use 'officeLocation' from the user schema you provided
// //   const hrLocationId = user?.officeLocation || null; 
// //   const hrLocationName = user?.officeLocation || "Unknown Location";

// //   // 2. Pass the HR's location ID to the custom hook
// //   const { 
// //     data, 
// //     loading: employeesLoading, 
// //     message 
// //   } = useFetchEmployees(hrLocationId);
  
// //   const [employees, setEmployees] = useState([]);

// //   // 📝 Effect to format the fetched employee data
// //   useEffect(() => {
// //     if (data?.users && data.users.length > 0) {
// //       console.log("Fetched employees data:", data);

// //       const formatted = data.users.map((emp) => ({
// //         employeeId: emp.employeeId,
// //         employee: emp._id, // Used as key/ID
// //         empname: emp.username,
// //         attendance: "Present",
// //         remark: "No",
// //       }));

// //       setEmployees(formatted);
// //     } else {
// //         setEmployees([]); // Clear employees if data is null or empty
// //     }
// //   }, [data]);

// //   // 🔄 Handler for updating attendance/remark state
// //   const handleChange = (id, field, value) => {
// //     setEmployees((prev) =>
// //       prev.map((emp) =>
// //         emp.employee === id ? { ...emp, [field]: value } : emp
// //       )
// //     );
// //   };

// //   // 💾 Handler for saving attendance to the backend
// //   const handleSave = async () => {
// //     try {
// //       const payload = employees.map(emp => ({
// //         ...emp,
// //         date: new Date().toISOString().split('T')[0],
// //         officeLocation: hrLocationId, // Include the location in the attendance record
// //       }));
      
// //       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/attendence/attendence`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const result = await res.json();

// //       if (res.ok) {
// //         console.log("Attendance saved successfully", result);
// //         alert("Attendance saved successfully!");
// //         setEmployees((prev) =>
// //           prev.map((emp) => ({
// //             ...emp,
// //             attendance: "Present",
// //             remark: "No",
// //           }))
// //         );
// //       } else {
// //         console.error("Error saving attendance", result);
// //         alert(result.message || "Error saving attendance");
// //       }
// //     } catch (err) {
// //       console.error("Error saving attendance:", err);
// //       alert("Something went wrong while saving attendance");
// //     }
// //   };

// //   // 🛑 Loading and Error States
// //   if (authLoading) return <p>Loading HR details...</p>; 
  
// //   if (!hrLocationId) return <p className="text-red-600 font-bold">Error: HR's office location is not defined. Cannot mark attendance.</p>;
  
// //   if (employeesLoading) return <p>Loading employees for {hrLocationName}...</p>;
// //   if (message) return <p className="text-red-600">{message}</p>;

// //   // 🖼️ Component Render
// //   return (
// //     <div>
// //       <h2 className="text-[#444444] text-xl font-DMSans p-1">
// //         Mark Attendance
// //       </h2>
// //       <p className="text-sm text-gray-500 mb-4">
// //         Showing employees for office: **{hrLocationName}**
// //       </p>

// //       <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
// //         <div className="flex flex-col gap-4">
// //           {employees.length === 0 ? (
// //             <p>No active employees found in the **{hrLocationName}** office location.</p>
// //           ) : (
// //             employees.map((emp) => (
// //               <div
// //                 key={emp.employee}
// //                 className="flex items-center justify-between pb-3 gap-2 border-b border-gray-200"
// //               >
// //                 <div className="flex flex-col text-[#444444] w-[180px]">
// //                   <p className="font-semibold">{emp.employeeId}</p>
// //                   <p className="text-sm">{emp.empname}</p>
// //                 </div>

// //                 <CustomSelect
// //                   title="Attendance"
// //                   options={[
// //                     { id: "Present", label: "Present" },
// //                     { id: "Absent", label: "Absent" },
// //                     { id: "Leave", label: "Leave" },
// //                   ]}
// //                   value={emp.attendance}
// //                   onChange={(e) =>
// //                     handleChange(emp.employee, "attendance", e.target.value)
// //                   }
// //                 />

// //                 <CustomInput
// //                   type="text"
// //                   title="Remark"
// //                   value={emp.remark}
// //                   onChange={(e) =>
// //                     handleChange(emp.employee, "remark", e.target.value)
// //                   }
// //                   placeholder={
// //                     emp.attendance === "Absent" || emp.attendance === "Leave" ? "Reason" : "No"
// //                   }
// //                 />
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>

// //       <div className="mt-6 text-right">
// //         <button
// //           onClick={handleSave}
// //           disabled={employees.length === 0}
// //           className="bg-[#004AAD] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#003377] transition-all disabled:bg-gray-400"
// //         >
// //           Save Attendance
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default MarkAttendance;

// import React, { useEffect, useState } from "react";
// import CustomSelect from "../button/CustomSelect";
// import CustomInput from "../ui/CustomInput";
// // 🚨 Ensure this path is correct for your project
// import useFetchEmployees from "../../utils/useFetchEmployeesUtils"; 

// // --- START: PLACEHOLDER HOOKS (Replace these) ---

// // 🚨 ASSUMPTION: Replace this with your actual authentication hook 
// const useAuth = () => {
//     const user = {
//         // SET THIS TO TEST LOCATION FILTERING (e.g., "Bangalore" or "Hyderabad")
//         officeLocation: "Bangalore", 
//         username: "HR Manager",
//     };
//     const loading = false;
//     return { user, loading }; 
// };

// // --- END: PLACEHOLDER HOOKS ---

// function MarkAttendance() {
//     // 1. Get the HR's assigned location from their user details
//     const { user, loading: authLoading } = useAuth();
    
//     const hrLocationId = user?.officeLocation || null; 
//     const hrLocationName = user?.officeLocation || "Unknown Location";

//     // 2. Pass the HR's location ID to the custom hook
//     const { 
//         data, 
//         loading: employeesLoading, 
//         message 
//     } = useFetchEmployees(hrLocationId);
    
//     const [employees, setEmployees] = useState([]);

//     // 📝 Effect to format the fetched employee data
//     useEffect(() => {
//         // ✅ DEFENSIVE CHECK: Ensure data and data.users exist before accessing
//         if (data?.users && Array.isArray(data.users) && data.users.length > 0) {
//             console.log("Fetched employees data for location:", hrLocationId, data);

//             const formatted = data.users.map((emp) => ({
//                 employeeId: emp.employeeId,
//                 employee: emp._id, // Used as key/ID
//                 empname: emp.username,
//                 attendance: "Present",
//                 remark: "No",
//             }));

//             setEmployees(formatted);
//         } else {
//             setEmployees([]); 
//         }
//     }, [data, hrLocationId]);

//     // 🔄 Handler for updating attendance/remark state
//     const handleChange = (id, field, value) => {
//         setEmployees((prev) =>
//             prev.map((emp) =>
//                 emp.employee === id ? { ...emp, [field]: value } : emp
//             )
//         );
//     };

//     // 💾 Handler for saving attendance to the backend
//     const handleSave = async () => {
//         try {
//             const payload = employees.map(emp => ({
//                 employee: emp.employee,
//                 attendance: emp.attendance,
//                 remark: emp.remark,
//                 officeLocation: hrLocationId, 
//             }));
            
//             const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/attendence/attendence`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             const result = await res.json();

//             if (res.ok) {
//                 alert("Attendance saved successfully!");
//                 // Reset state
//                 setEmployees((prev) =>
//                     prev.map((emp) => ({
//                         ...emp,
//                         attendance: "Present",
//                         remark: "No",
//                     }))
//                 );
//             } else {
//                 alert(result.message || "Error saving attendance");
//             }
//         } catch (err) {
//             console.error("Error saving attendance:", err);
//             alert("Something went wrong while saving attendance");
//         }
//     };
    
//     // --- Loading and Error States ---
//     if (authLoading) return <p>Loading HR details...</p>; 
    
//     // Handles the case where the HR user is invalid or missing location
//     if (!hrLocationId) return <p className="text-red-600 font-bold">Error: HR's office location is not defined. Cannot mark attendance.</p>;
    
//     if (employeesLoading) return <p>Loading employees for {hrLocationName}...</p>;

//     // Message handles non-loading errors from the API (e.g., "No active employees found")
//     if (message) return <p className="text-red-600">{message}</p>;

//     // 🖼️ Component Render
//     return (
//         <div className="p-4">
//             <h2 className="text-[#444444] text-xl font-DMSans p-1">
//                 Mark Attendance
//             </h2>
//             <p className="text-sm text-gray-500 mb-4">
//                 Showing employees for office: **{hrLocationName}**
//             </p>

//             <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
//                 <div className="flex flex-col gap-4">
//                     {employees.length === 0 ? (
//                         <p className="text-gray-500">No active employees found in the **{hrLocationName}** office location.</p>
//                     ) : (
//                         employees.map((emp) => (
//                             <div
//                                 key={emp.employee} // ✅ Added key prop fix here
//                                 className="flex items-center justify-between pb-3 gap-2 border-b border-gray-200"
//                             >
//                                 <div className="flex flex-col text-[#444444] w-[180px]">
//                                     <p className="font-semibold">{emp.employeeId}</p>
//                                     <p className="text-sm">{emp.empname}</p>
//                                 </div>

//                                 <CustomSelect
//                                     title="Attendance"
//                                     options={[
//                                         { id: "Present", label: "Present" },
//                                         { id: "Absent", label: "Absent" },
//                                         { id: "Leave", label: "Leave" },
//                                     ]}
//                                     value={emp.attendance}
//                                     onChange={(e) =>
//                                         handleChange(emp.employee, "attendance", e.target.value)
//                                     }
//                                 />

//                                 <CustomInput
//                                     type="text"
//                                     title="Remark"
//                                     value={emp.remark}
//                                     onChange={(e) =>
//                                         handleChange(emp.employee, "remark", e.target.value)
//                                     }
//                                     placeholder={
//                                         emp.attendance === "Absent" || emp.attendance === "Leave" ? "Reason" : "No"
//                                     }
//                                 />
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             <div className="mt-6 text-right">
//                 <button
//                     onClick={handleSave}
//                     disabled={employees.length === 0}
//                     className="bg-[#004AAD] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#003377] transition-all disabled:bg-gray-400"
//                 >
//                     Save Attendance
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default MarkAttendance;
import React, { useEffect, useState } from "react";
import CustomSelect from "../button/CustomSelect";
import CustomInput from "../ui/CustomInput";
import useFetchEmployees from "../../utils/useFetchEmployeesUtils";
import useAuth from "../../context/AuthContext"; // your real hook

function MarkAttendance() {
    // 1️⃣ Get HR details
    const { userDetails, loading: authLoading } = useAuth();

    const hrLocation = userDetails?.officeLocation || null;
    const hrName = userDetails?.username || "HR";

    // 2️⃣ Fetch employees for the HR's location
    const {
        data,
        loading: employeesLoading,
        message,
    } = useFetchEmployees(hrLocation);

    const [employees, setEmployees] = useState([]);

    // 3️⃣ Map backend data → local state
    useEffect(() => {
        if (data?.users && Array.isArray(data.users) && data.users.length > 0) {
            const formatted = data.users.map((emp) => ({
                employeeId: emp.employeeId,
                employee: emp._id,
                empname: emp.username,
                attendance: "Present",
                remark: "No",
            }));

            setEmployees(formatted);
        } else {
            setEmployees([]);
        }
    }, [data]);

    // 4️⃣ Update values (attendance / remark)
    const handleChange = (id, field, value) => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.employee === id ? { ...emp, [field]: value } : emp
            )
        );
    };

    // 5️⃣ Save attendance to backend
    const handleSave = async () => {
        try {
            const payload = employees.map((emp) => ({
                employee: emp.employee,
                attendance: emp.attendance,
                remark: emp.remark,
                officeLocation: hrLocation,
            }));

            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/attendence/attendence`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();

            if (res.ok) {
                alert("Attendance saved successfully!");
                setEmployees((prev) =>
                    prev.map((emp) => ({
                        ...emp,
                        attendance: "Present",
                        remark: "No",
                    }))
                );
            } else {
                alert(result.message || "Error saving attendance");
            }
        } catch (err) {
            console.error("Error saving attendance:", err);
            alert("Something went wrong while saving attendance!!");
        }
    };

    // ---------- UI STATES ----------
    if (authLoading) return <p>Loading HR details...</p>;

    if (!hrLocation)
        return (
            <p className="text-red-600 font-bold">
                HR office location missing. Cannot load employees.
            </p>
        );

    if (employeesLoading)
        return <p>Loading employees for {hrLocation}...</p>;

    if (message)
        return (
            <p className="text-red-600 font-semibold">
                {message}
            </p>
        );

    // ---------- MAIN UI ----------
    return (
        <div className="p-4">
            <h2 className="text-[#444444] text-xl font-DMSans p-1">
                Mark Attendance
            </h2>

            <p className="text-sm text-gray-500 mb-4">
                Showing employees for office: <b>{hrLocation}</b>
            </p>

            <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
                <div className="flex flex-col gap-4">
                    {employees.length === 0 ? (
                        <p className="text-gray-500">
                            No active employees in <b>{hrLocation}</b>.
                        </p>
                    ) : (
                        employees.map((emp) => (
                            <div
                                key={emp.employee}
                                className="flex items-center justify-between pb-3 gap-2 border-b border-gray-200"
                            >
                                {/* Employee Info */}
                                <div className="flex flex-col text-[#444444] w-[180px]">
                                    <p className="font-semibold">{emp.employeeId}</p>
                                    <p className="text-sm">{emp.empname}</p>
                                </div>

                                {/* Attendance Dropdown */}
                                <CustomSelect
                                    title="Attendance"
                                    options={[
                                        { id: "Present", label: "Present" },
                                        { id: "Absent", label: "Absent" },
                                        { id: "Leave", label: "Leave" },
                                    ]}
                                    value={emp.attendance}
                                    onChange={(e) =>
                                        handleChange(
                                            emp.employee,
                                            "attendance",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* Remark Input */}
                                <CustomInput
                                    type="text"
                                    title="Remark"
                                    value={emp.remark}
                                    onChange={(e) =>
                                        handleChange(
                                            emp.employee,
                                            "remark",
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        emp.attendance !== "Present"
                                            ? "Reason"
                                            : "No"
                                    }
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 text-right">
                <button
                    onClick={handleSave}
                    disabled={employees.length === 0}
                    className="bg-[#004AAD] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#003377] transition-all disabled:bg-gray-400"
                >
                    Save Attendance
                </button>
            </div>
        </div>
    );
}

export default MarkAttendance;
