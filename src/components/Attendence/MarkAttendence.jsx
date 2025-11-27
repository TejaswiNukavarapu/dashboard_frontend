// import React, { useEffect, useState } from "react";
// import CustomSelect from "../button/CustomSelect";
// import CustomInput from "../ui/CustomInput";
// import useFetchEmployees from "../../utils/useFetchEmployeesUtils";
// import useAuth from "../../context/AuthContext"; 

// function MarkAttendance() {
//     const { userDetails, loading: authLoading } = useAuth();

//     const hrLocation = userDetails?.officeLocation || null;
//     const hrName = userDetails?.username || "HR";
//     const {
//         data,
//         loading: employeesLoading,
//         message,
//     } = useFetchEmployees(hrLocation);

//     const [employees, setEmployees] = useState([]);
//     useEffect(() => {
//         if (data?.users && Array.isArray(data.users) && data.users.length > 0) {
//             const formatted = data.users.map((emp) => ({
//                 employeeId: emp.employeeId,
//                 employee: emp._id,
//                 empname: emp.username,
//                 attendance: "Present",
//                 remark: "No",
//             }));

//             setEmployees(formatted);
//         } else {
//             setEmployees([]);
//         }
//     }, [data]);
//     const handleChange = (id, field, value) => {
//         setEmployees((prev) =>
//             prev.map((emp) =>
//                 emp.employee === id ? { ...emp, [field]: value } : emp
//             )
//         );
//     };
//     const handleSave = async () => {
//         try {
//             const payload = employees.map((emp) => ({
//                 employee: emp.employee,
//                 attendance: emp.attendance,
//                 remark: emp.remark,
//                 officeLocation: hrLocation,
//             }));

//             const res = await fetch(
//                 `${import.meta.env.VITE_BACKEND_URL}/attendence/attendence`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 }
//             );

//             const result = await res.json();

//             if (res.ok) {
//                 alert("Attendance saved successfully!");
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
//             alert("Something went wrong while saving attendance!!");
//         }
//     };
//     if (authLoading) return <p>Loading HR details...</p>;

//     if (!hrLocation)
//         return (
//             <p className="text-red-600 font-bold">  HR office location missing. Cannot load employees.</p>
//         );

//     if (employeesLoading)
//         return <p>Loading employees for {hrLocation}...</p>;

//     if (message)
//         return (
//             <p className="text-red-600 font-semibold"> {message}</p>
//         );
//     return (
//         <div className="p-4">
//             <h2 className="text-[#444444] text-xl font-DMSans p-1">Mark Attendance </h2>
//             <p className="text-sm text-gray-500 mb-4">Showing employees for office: <b>{hrLocation}</b></p>
//             <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
//                 <div className="flex flex-col gap-4">
//                     {employees.length === 0 ? (
//                         <p className="text-gray-500">No active employees in <b>{hrLocation}</b>.</p>
//                     ) : (
//                         employees.map((emp) => (
//                             <div key={emp.employee} className="flex items-center justify-between pb-3 gap-2 border-b border-gray-200" >
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
//                                     onChange={(e) => handleChange(  emp.employee, "attendance", e.target.value )}
//                                 />
//                                 <CustomInput type="text" title="Remark" value={emp.remark}
//                                     onChange={(e) => handleChange( emp.employee, "remark", e.target.value )}
//                                     placeholder={emp.attendance !== "Present"? "Reason": "No"  }
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
import useAuth from "../../context/AuthContext";

function MarkAttendance() {
    const { userDetails, loading: authLoading } = useAuth();

    const userRole = userDetails?.role || "HR"; // ROLE: Admin / HR
    const hrLocation = userDetails?.officeLocation || null;

    // HR → fixed location
    // Admin → selectable location
    const [selectedLocation, setSelectedLocation] = useState(
        userRole === "HR" ? hrLocation : ""
    );

    // Fetch employees based on location
    const {
        data,
        loading: employeesLoading,
        message,
    } = useFetchEmployees(selectedLocation);

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (data?.users && Array.isArray(data.users)) {
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

    const handleChange = (id, field, value) => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.employee === id ? { ...emp, [field]: value } : emp
            )
        );
    };

    const handleSave = async () => {
        try {
            const payload = employees.map((emp) => ({
                employee: emp.employee,
                attendance: emp.attendance,
                remark: emp.remark,
                officeLocation: selectedLocation,
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
            alert("Something went wrong!!");
        }
    };

    if (authLoading) return <p>Loading HR/Admin details...</p>;

    return (
        <div className="p-4">
            <h2 className="text-[#444444] text-xl font-DMSans p-1">
                Mark Attendance
            </h2>

            {/* -------------------------------------- */}
            {/* LOCATION SELECTOR */}
            {/* -------------------------------------- */}
            <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600">
                    Select Location:
                </label>

                <select
                    className="w-full border rounded p-2 mt-1"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    disabled={userRole === "HR"}   // HR cannot change
                >
                    <option value="">-- Select Location --</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Banglore">Bangalore</option>
                </select>

                {userRole === "HR" && (
                    <p className="text-xs text-blue-500 mt-1">
                        (Location locked because you are HR)
                    </p>
                )}
            </div>

            {/* No location selected */}
            {userRole === "Admin" && !selectedLocation && (
                <p className="text-gray-500 text-sm">
                    Please select a location to load employees.
                </p>
            )}

            {/* Loading employees */}
            {employeesLoading && selectedLocation && (
                <p>Loading employees for {selectedLocation}...</p>
            )}

            {/* No employees found */}
            {message && <p className="text-red-600 font-semibold">{message}</p>}

            {/* Employees List */}
            {selectedLocation && !employeesLoading && employees.length > 0 && (
                <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
                    <div className="flex flex-col gap-4">
                        {employees.map((emp) => (
                            <div
                                key={emp.employee}
                                className="flex items-center justify-between pb-3 gap-2 border-b border-gray-200"
                            >
                                <div className="flex flex-col text-[#444444] w-[180px]">
                                    <p className="font-semibold">{emp.employeeId}</p>
                                    <p className="text-sm">{emp.empname}</p>
                                </div>

                                <CustomSelect
                                    title="Attendance"
                                    options={[
                                        { id: "Present", label: "Present" },
                                        { id: "Absent", label: "Absent" },
                                        { id: "Leave", label: "Leave" },
                                    ]}
                                    value={emp.attendance}
                                    onChange={(e) =>
                                        handleChange(emp.employee, "attendance", e.target.value)
                                    }
                                />

                                <CustomInput
                                    type="text"
                                    title="Remark"
                                    value={emp.remark}
                                    onChange={(e) =>
                                        handleChange(emp.employee, "remark", e.target.value)
                                    }
                                    placeholder={
                                        emp.attendance !== "Present" ? "Reason" : "No"
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save Button */}
            {selectedLocation && (
                <div className="mt-6 text-right">
                    <button
                        onClick={handleSave}
                        disabled={employees.length === 0}
                        className="bg-[#004AAD] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#003377] transition-all disabled:bg-gray-400"
                    >
                        Save Attendance
                    </button>
                </div>
            )}
        </div>
    );
}

export default MarkAttendance;
