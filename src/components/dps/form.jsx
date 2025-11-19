// import React, { useState } from "react";
// import cross from "../../assets/cross.png";
// import useAuth from "../../context/AuthContext";

// const DpsForm = () => {
//   const [showCreate, setShowCreate] = useState(false);
//   const handleOpen = () => setShowCreate(true);
//   const handleClose = () => setShowCreate(false);
//   const { userDetails } = useAuth();
//   const token = JSON.parse(localStorage.getItem("session_token"));

//   const [formData, setFormData] = useState({
//     studentName: "",
//     studentEmail: "",
//     studentContact: "",
//     studentWhatsapp: "",
//     studyDepartment: "",
//     yearOfStudy: "",
//     domainCourse: "",
//     preferredMonth: "",
//     amountPitched:0,
//       amountPaid:0,
//       employee:""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       studentName: "",
//       studentEmail: "",
//       studentContact: "",
//       studentWhatsapp: "",
//       studyDepartment: "",
//       yearOfStudy: "",
//       domainCourse: "",
//       preferredMonth: "",
//       amountPitched:0,
//       amountPaid:0,
//       employee:""

//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       studentName: formData.studentName,
//       studentEmail: formData.studentEmail,
//       studentContactNo: formData.studentContact,
//       studentWhatsAppNo: formData.studentWhatsapp,
//       studyDepartment: formData.studyDepartment,
//       yearOfStudy: formData.yearOfStudy,
//       domainCourseOpted: formData.domainCourse,
//       preferredProgramMonth: formData.preferredMonth, 
//       amountPitched:formData.amountPitched,
//       amountPaid:formData.amountPaid,
//       employee:userDetails._id
//     };

//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Form submitted successfully!");
//         handleReset();
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white text-xl rounded-xl ">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Fill DPS Data</h2>
//         {/* <button onClick={handleClose}>
//           <img src={cross} alt="Close" className="w-8 h-8 cursor-pointer hover:opacity-80"/>
//         </button> */}
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-white">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
//           <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" />
//           <input type="email" name="studentEmail" placeholder="Student Email ID" value={formData.studentEmail} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input type="tel" name="studentContact" placeholder="Student Contact Number" value={formData.studentContact} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
//           <input type="tel" name="studentWhatsapp" placeholder="Student WhatsApp Number" value={formData.studentWhatsapp} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input type="text" name="studyDepartment" placeholder="Study Department" value={formData.studyDepartment} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
//           <select name="yearOfStudy"  value={formData.yearOfStudy}  onChange={handleChange} className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700 ${formData.yearOfStudy === "" ? "text-blue-900" : "text-gray-700"}`}>
//             <option value="" disabled>Year of Study</option>
//             <option value="1">1st Year</option>
//             <option value="2">2nd Year</option>
//             <option value="3">3rd Year</option>
//             <option value="4">4th Year</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <select name="domainCourse"  value={formData.domainCourse} onChange={handleChange} className={`w-full p-2 placeholder-blue-900 border-blue-700 border rounded-lg focus:ring focus:ring-blue-200 ${formData.domainCourse === "" ? "text-blue-900" : "text-gray-700"}`}>
//             <option value="" disabled>Domain/Course Opted</option>
//             <option value="cs">Computer Science</option>
//             <option value="it">Information Technology</option>
//             <option value="ece">Electronics</option>
//             <option value="mech">Mechanical</option>
//           </select>
//           <select name="preferredMonth" value={formData.preferredMonth} onChange={handleChange} className={`w-full p-2 border-blue-700 border rounded-lg focus:ring focus:ring-blue-200 ${formData.preferredMonth === "" ? "text-blue-900" : "text-gray-700"}`}>
//             <option value="">Preferred Program Month</option>
//             <option value="January">January</option>
//             <option value="February">February</option>
//             <option value="March">March</option>
//             <option value="April">April</option>
//             <option value="May">May</option>
//             <option value="June">June</option>
//             <option value="July">July</option>
//             <option value="August">August</option>
//             <option value="September">September</option>
//             <option value="October">October</option>
//             <option value="November">November</option>
//             <option value="December">December</option>
//           </select>
//         </div>
//          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input type="number" name="amountPitched" placeholder="Amount Pitched" value={formData.amountPitched} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
//           <input type="number" name="amountPaid" placeholder="Amount Paid" value={formData.amountPaid} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
//         </div>
//         <div className="flex justify-between pt-4">
//           <button type="button" onClick={handleReset} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Reset Form</button>
//           <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Add</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DpsForm;
import React, { useState } from "react";
import useAuth from "../../context/AuthContext";
import toast, { Toaster } from 'react-hot-toast'; 

const DpsForm = () => {
    const { userDetails } = useAuth();
    
    const [formData, setFormData] = useState({
        studentName: "",
        studentEmail: "",
        studentContact: "",
        studentWhatsapp: "",
        studyDepartment: "",
        yearOfStudy: "",
        domainCourse: "",
        preferredMonth: "",
        amountPitched: 0, 
        amountPaid: 0,    
        employee: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "amountPitched" || name === "amountPaid") {
            const numericValue = value === "" ? 0 : Number(value);
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
        } else if (name === "studentContact" || name === "studentWhatsapp") {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
        }
        else if (name === "studentName") {
            // NEW: Allow only letters and spaces, limit to 16 characters (for input control)
            const cleanedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 16);
            setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        }
        else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleReset = () => {
        setFormData({
            studentName: "",
            studentEmail: "",
            studentContact: "",
            studentWhatsapp: "",
            studyDepartment: "",
            yearOfStudy: "",
            domainCourse: "",
            preferredMonth: "",
            amountPitched: 0,
            amountPaid: 0,
            employee: ""
        });
    };
    
    const validateForm = (payload) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!payload.studentName || !payload.studentEmail || !payload.studentContactNo || !payload.studyDepartment || !payload.yearOfStudy || !payload.domainCourseOpted || !payload.preferredProgramMonth) {
            toast.error("Please fill in all required fields.");
            return false;
        }

        // MODIFIED: Student Name validation (3-16 chars, letters/spaces only)
        if (payload.studentName.length < 3 || payload.studentName.length > 16) {
            toast.error("Student Name must be between 3 and 16 characters.");
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(payload.studentName)) {
            toast.error("Student Name must contain only letters and spaces.");
            return false;
        }


        if (!emailRegex.test(payload.studentEmail)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (payload.studentContactNo.length !== 10) {
            toast.error("Contact Number must be exactly 10 digits.");
            return false;
        }

        if (payload.studentWhatsAppNo && payload.studentWhatsAppNo.length !== 10) {
            toast.error("WhatsApp Number must be exactly 10 digits if provided.");
            return false;
        }
        
        if (!payload.employee) {
            toast.error("Employee ID is missing. Please log in again.");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            studentName: formData.studentName,
            studentEmail: formData.studentEmail,
            studentContactNo: formData.studentContact,
            studentWhatsAppNo: formData.studentWhatsapp || null,
            studyDepartment: formData.studyDepartment,
            yearOfStudy: formData.yearOfStudy,
            domainCourseOpted: formData.domainCourse,
            preferredProgramMonth: formData.preferredMonth, 
            amountPitched: formData.amountPitched, 
            amountPaid: formData.amountPaid, 
            employee: userDetails?._id 
        };
        
        if (!validateForm(payload)) {
            return;
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dps/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Form submitted successfully!"); 
                handleReset();
            } else {
                toast.error(`Submission Error: ${data.error || data.message || "Server Validation Failed"}`); 
            }
        } catch (err) {
            console.error("Submission error:", err);
            toast.error("Network Error: Could not connect to the server!"); 
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white text-xl rounded-xl">
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Fill DPS Data</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                    <input 
                        type="text" 
                        name="studentName" 
                        placeholder="Student Name" 
                        value={formData.studentName} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" 
                        required
                    />
                    <input type="email" name="studentEmail" placeholder="Student Email ID" value={formData.studentEmail} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" required/>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" name="studentContact" placeholder="Student Contact Number" value={formData.studentContact} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" pattern="\d{10}" title="Must be 10 digits" required/>
                    <input type="tel" name="studentWhatsapp" placeholder="Student WhatsApp Number" value={formData.studentWhatsapp} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" pattern="\d{10}" title="Must be 10 digits"/>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="studyDepartment" placeholder="Study Department" value={formData.studyDepartment} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" required/>
                    <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700 ${formData.yearOfStudy === "" ? "text-blue-900" : "text-gray-700"}`} required>
                        <option value="" disabled>Year of Study</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select name="domainCourse" value={formData.domainCourse} onChange={handleChange} className={`w-full p-2 placeholder-blue-900 border-blue-700 border rounded-lg focus:ring focus:ring-blue-200 ${formData.domainCourse === "" ? "text-blue-900" : "text-gray-700"}`} required>
                        <option value="" disabled>Domain/Course Opted</option>
                        <option value="cs">Computer Science</option>
                        <option value="it">Information Technology</option>
                        <option value="ece">Electronics</option>
                        <option value="mech">Mechanical</option>
                    </select>
                    <select name="preferredMonth" value={formData.preferredMonth} onChange={handleChange} className={`w-full p-2 border-blue-700 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700 ${formData.preferredMonth === "" ? "text-blue-900" : "text-gray-700"}`} required>
                        <option value="">Preferred Program Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="number" name="amountPitched" placeholder="$ Amount Pitched" value={formData.amountPitched} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" min="0" required/>
                    <input type="number" name="amountPaid" placeholder="$ Amount Paid" value={formData.amountPaid} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" min="0" required/>
                </div>
                
                <div className="flex justify-between pt-4">
                    <button type="button" onClick={handleReset} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Reset Form</button>
                    <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Add</button>
                </div>
            </form>
        </div>
    );
};

export default DpsForm;