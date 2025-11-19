// import React, { useEffect, useState } from 'react'
// import Teaminfo from './Teaminfo'
// import toast from 'react-hot-toast'
// import uploadProfile from '../../assets/Teaminfo/uploadProfile.png'
// import { useRef } from 'react'
// // import Select from 'react-select/base'

// const Addemployeeform = ({ teamsInfo, handleCloseModal }) => {

//     const filePath = useRef()
//     const handleEvent = () => {
//         filePath.current.click()
//     }

//     const [username, setUsername] = useState("")
//     const [email, setEmail] = useState("")
//     const [phone, setPhone] = useState("")
//     const [whatsappNumber, setWhatsappNumber] = useState("")
//     const [role, setRole] = useState("Intern")
//     const [password, setPassword] = useState("")
//     const [officeLocation, setOfficeLocation] = useState("Hyderabad")
//     const [openTeam , setOpenTeam] = useState(false)
//     const [team, setTeam] = useState([]);
//     const [employeeId , setEmployeeId] = useState("") 

//     const options = teamsInfo.map(item => ({
//         value: item._id,
//         label: item.name
//     }));

//     useEffect(()=>{} , [])

//     function TeamName(value){
//         const optionName = options.find(item=>item.value===value)
//         return optionName
//     }
//     const isDigitalMarketing = role==="Digital Marketing"
//     const isAdmin = role === "Admin"
    
//     async function handleCreateEmployee(e) {
//         e.preventDefault()
//         if (!username || !email || !phone || !officeLocation) {
//             toast.error("All Fields are mandatory")
//             return
//         }

//         try {
//             const options = {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ username, email, phone, password, officeLocation, whatsappNumber, role, teamId: team  , employeeId })
//             }
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, options)
//             const result = await response.json()
//             if (response.ok) {
//                 // console.log("form suser", result.data)
//                 toast.success(result.msg)
//                 setUsername("")
//                 setPassword("")
//                 setEmail("")
//                 setOfficeLocation("Hyderabad")
//                 setTeam("")
//                 setWhatsappNumber("")
//                 setRole("Intern")
//                 setPhone("")
//                 setEmployeeId("")
//                 handleCloseModal()
//             } else {
//                 toast.error(result.msg)
//             }
//         } catch (e) {
//             console.log("Error while creating Employee...", e)
//             toast.error("Network Error")
//         }
//     }

//     return (
//         <div className='flex justify-center items-center bg-black/75 w-screen h-screen fixed top-0 left-0' >
//             <div className='w-[850px]  p-6 bg-white border-2 fixed border-[#004AAD] rounded-lg'>
//                 <div className='absolute flex justify-end w-[93%] items-center'>
//                     <button className='font-bold text-xl ' onClick={() => handleCloseModal()}>X</button>
//                 </div>
//                 <form className='grid-cols-2 gap-4' onSubmit={handleCreateEmployee}>
//                     <p className='font-Regular font-family:DM Sans text-[#444444]'>Add Employee</p>
//                     <div className='flex '>
//                         <div className=' w-1/2 rounded-2xl '>
//                             <div className='flex  p-2 '>
//                                 {/* <input type="text" placeholder='Employee name' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' value={username} onChange={(e)=>setUsername(e.target.value)} /> */}
//                                 <select className="border border-[#004AAD] p-3 border-2 rounded-2xl text-lg w-full  " defaultValue="" value={role} onChange={e => setRole(e.target.value)} >
//                                     {/* <option value="" className="text-[#004AAD] ">Employee Type</option> */}
//                                     <option value="Intern" className='text-[#004AAD] '>Intern</option>
//                                     <option value="Admin" className='text-[#004AAD]'>Admin</option>
//                                     <option value="Operations" className='text-[#004AAD]'>Operations</option>
//                                     <option value="HR" className='text-[#004AAD]'>HR</option>
//                                     <option value="Team Lead" className='text-[#004AAD]'>Team Lead</option>
//                                     <option value="Post Sales" className='text-[#004AAD]'>Post Sales</option>
//                                     <option value="Digital Marketing" className='text-[#004AAD]'>Digital Marketing</option>
//                                 </select>

//                             </div>
//                             <div className='flex gap-3 p-2'>

//                                 <input type="text" placeholder='Employee Name' className='border-2 border-[#004AAD] p-3 rounded-2xl w-full placeholder:text-lg placeholder:border-2' value={username} onChange={(e) => setUsername(e.target.value)} />
//                                 {/* <input type="text" placeholder='Employee  WhatsApp Number' className='border-2 border-[#004AAD] p-3 rounded-lg w-full'  value={whatsappNumber} onChange={(e)=>setWhatsappNumber(e.target.value)}/> */}
//                             </div>
//                             {/* <div className='flex gap-3 p-2'>
//                                 <select
//                                     className="border border-[#004AAD] p-3 rounded-lg w-full text-[#004AAD]"
//                                     defaultValue="" value={role} onChange={e=>setRole(e.target.value)}>
//                                     <option value="Intern"  className='text-[#004AAD]'>Intern</option>
//                                     <option value="Admin"  className='text-[#004AAD]'>Admin</option>
//                                     <option value="Operations"  className='text-[#004AAD]'>Operations</option>
//                                     <option value="HR"  className='text-[#004AAD]'>HR</option>
//                                     <option value="Team Lead"  className='text-[#004AAD]'>Team Lead</option>
//                                     <option value="Post Sales"  className='text-[#004AAD]'>Post Sales</option>
//                                     <option value="Digital Marteking"  className='text-[#004AAD]'>Digital Marteking</option>
//                                 </select>
//                                 // <input value={password} onChange={e=>setPassword(e.target.value)} type="text" placeholder='Employee Password' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
//                             </div> */}
//                             <div className='flex gap-3 p-2'>

//                                 <input type="text" placeholder='Employee Email ID' className='border-2 border-[#004AAD] p-3 rounded-2xl w-full placeholder:text-lg' value={email} onChange={(e) => setEmail(e.target.value)} />

//                             </div>
//                              <div className='flex gap-3 p-2'>

//                                 <input type="text" placeholder='Employee ID' className='border-2 border-[#004AAD] p-3 rounded-2xl w-full placeholder:text-lg' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

//                             </div>
//                         </div>
//                         <div className='border-2 rounded-2xl border-[#004AAD] w-1/2  p-3 flex flex-col text-center'>
//                             <div className=' flex flex-col justify-center align-center h-full '>

//                                 <input type="file" name="" id="" ref={filePath} hidden />
//                                 <div className='flex flex-col justify-center align-center ' onClick={handleEvent}>
//                                     <p className='#444444 text-[16px]'>Upload Profile</p>
//                                     <div className=' flex justify-center align-center'>
//                                         <img src={uploadProfile} alt="" className=' w-10 h-10' />
//                                     </div>
//                                     <p className='text-[#888888]'>Supported  format png,jpg,or jpeg</p>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                     <div className='flex gap-3 p-2'>
//                         <input type="text" placeholder='Employee Contact Number' className='border-2 border-[#004AAD] p-3 rounded-2xl w-1/2 placeholder:text-lg' value={phone} onChange={(e) => setPhone(e.target.value)} />
//                         <input type="text" placeholder='Employee  WhatsApp Number' className='border-2 border-[#004AAD] p-3 rounded-2xl w-1/2' value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
//                     </div>
//                     <div className='flex gap-3 p-2'>
//                         <div className='flex flex-col border-2 border-[#004AAD] p-3 rounded-2xl  text-[#004AAD]'>
//                             <label htmlFor="selectTeam" className='w-full'>
//                             {team.map(item=><span className='m-1 border-2 p-1 rounded-full bg-slate-300'>{TeamName(item).label}</span>)}
//                         </label>
//                          <select
//                          id='selectTeam'
//                             className=" p-3  text-[#004AAD] "
//                              value={team} onChange={e => setTeam([...team , e.target.value])}
//                              disabled={isDigitalMarketing || isAdmin}>
//                             {options.filter(item=>team.includes(item.value)===false).map(item=> <option value={item.value} className="text-[#004AAD]">{item.label}</option>)}
//                         </select>
//                         </div>
//                         <select
//                             className="border-2 border-[#004AAD] p-3 rounded-2xl w-1/2 text-[#004AAD]"
//                             defaultValue="" value={officeLocation} 
//                             onChange={e => setOfficeLocation(e.target.value)}
//                             disabled={isDigitalMarketing || isAdmin} >
//                             <option value="Hyderabad" className="text-[#004AAD]">Hyderabad</option>
//                             <option value="Banglore" className="text-[#004AAD]">Banglore</option>
//                         </select>
//                     </div>
//                     <div className='flex justify-end'>
//                         <button type='submit' className='bg-[#004AAd] text-white p-2 px-4 rounded-lg'> Add </button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default Addemployeeform

// import React, { useEffect, useState } from 'react'
// import toast, {Toaster} from 'react-hot-toast'
// import uploadProfile from '../../assets/Teaminfo/uploadProfile.png'
// import { useRef } from 'react'

// const Addemployeeform = ({ teamsInfo, handleCloseModal }) => {

//     const filePath = useRef()
//     const handleEvent = () => {
//         filePath.current.click()
//     }

//     const [username, setUsername] = useState("")
//     const [email, setEmail] = useState("")
//     const [phone, setPhone] = useState("")
//     const [whatsappNumber, setWhatsappNumber] = useState("")
//     const [role, setRole] = useState("Intern")
//     const [password, setPassword] = useState("")
//     const [officeLocation, setOfficeLocation] = useState("Hyderabad")
//     const [team, setTeam] = useState([]);
//     const [employeeId , setEmployeeId] = useState("") 
//     const [isSaving, setIsSaving] = useState(false);

//     const options = teamsInfo.map(item => ({
//         value: item._id,
//         label: item.name
//     }));

//     function TeamName(value){
//         const optionName = options.find(item=>item.value===value)
//         return optionName || {label: 'Unknown Team'}
//     }
    
//     const isDigitalMarketing = role==="Digital Marketing"
//     const isAdmin = role === "Admin"

//     const validateForm = () => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const employeeIdRegex = /^[a-zA-Z0-9]{3,16}$/;

//         if (!username || !email || !phone || !officeLocation || !employeeId) {
//             toast.error("All Fields are mandatory (excluding password/whatsapp).")
//             return false
//         }
//         if (username.length < 3 || username.length > 30) {
//             toast.error("Employee Name must be between 3 and 30 characters.")
//             return false
//         }
//         if (!/^[a-zA-Z\s]+$/.test(username)) {
//             toast.error("Employee Name must contain only letters and spaces.")
//             return false
//         }
//         if (!emailRegex.test(email)) {
//             toast.error("Please enter a valid email address.")
//             return false
//         }
//         if (!employeeIdRegex.test(employeeId)) {
//             toast.error("Employee ID must be 3-16 characters long and can only contain letters and numbers.")
//             return false
//         }
//         if (!/^\d{10}$/.test(phone)) {
//             toast.error("Contact Number must be exactly 10 digits.")
//             return false
//         }
//         if (whatsappNumber && !/^\d{10}$/.test(whatsappNumber)) {
//             toast.error("WhatsApp Number must be exactly 10 digits if provided.")
//             return false
//         }
//         if (!isDigitalMarketing && !isAdmin && team.length === 0) {
//             toast.error("Please select at least one team.")
//             return false
//         }
        
//         return true
//     }
//     async function handleCreateEmployee(e) {
//         e.preventDefault()
        
//         if (!validateForm()) {
//             return
//         }

//         setIsSaving(true);

//         try {
//             const options = {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ 
//                     username, 
//                     email, 
//                     phone: Number(phone), 
//                     password, 
//                     officeLocation, 
//                     whatsappNumber: whatsappNumber ? Number(whatsappNumber) : null,
//                     role, 
//                     teamId: team, 
//                     employeeId 
//                 })
//             }
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, options)
//             const result = await response.json()
            
//             if (response.ok) {
//                 toast.success(result.msg)
//                 setUsername("")
//                 setPassword("")
//                 setEmail("")
//                 setOfficeLocation("Hyderabad")
//                 setTeam([])
//                 setWhatsappNumber("")
//                 setRole("Intern")
//                 setPhone("")
//                 setEmployeeId("")
//                 handleCloseModal()
//             } else {
//                 toast.error(result.msg || "Failed to create employee.")
//             }
//         } catch (e) {
//             console.error("Error while creating Employee:", e)
//             toast.error("Network Error")
//         } finally {
//             setIsSaving(false);
//         }
//     }
//     const handleNumericChange = (setter) => (e) => {
//         const value = e.target.value.replace(/\D/g, '').slice(0, 10);
//         setter(value);
//     };
//     const handleCharacterChange = (e) => {
//         const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 30);
//         setUsername(value);
//     };
//     const removeTeam = (teamIdToRemove) => {
//         setTeam(team.filter(id => id !== teamIdToRemove));
//     };


//     return (
//         <div className='flex justify-center items-start p-4 bg-black/75 w-screen h-screen fixed top-0 left-0 z-50 overflow-y-auto' >
//             <Toaster />
//             <div className='w-[850px] p-4 bg-white border-2 border-[#004AAD] rounded-lg shadow-2xl mt-8 mb-4'> 
//                 <div className='flex justify-end mb-2'> 
//                     <button 
//                         className='font-bold text-xl text-gray-500 hover:text-red-500 transition-colors' 
//                         onClick={() => handleCloseModal()}
//                     >
//                         &times;
//                     </button>
//                 </div>
                
//                 <p className='font-semibold text-xl text-[#004AAD] mb-3'>Add Employee</p> 
                
//                 <form className='flex flex-col gap-3' onSubmit={handleCreateEmployee}> 
//                     <div className='flex gap-4'>
//                         <div className='w-1/2 flex flex-col gap-3'>
//                             <select 
//                                 className="border-2 border-[#004AAD] p-3 rounded-xl text-lg w-full text-gray-700" 
//                                 value={role} 
//                                 onChange={e => setRole(e.target.value)} 
//                             >
//                                 <option value="Intern" className='text-[#004AAD] '>Intern</option>
//                                 <option value="Admin" className='text-[#004AAD]'>Admin</option>
//                                 <option value="Operations" className='text-[#004AAD]'>Operations</option>
//                                 <option value="HR" className='text-[#004AAD]'>HR</option>
//                                 <option value="Team Lead" className='text-[#004AAD]'>Team Lead</option>
//                                 <option value="Post Sales" className='text-[#004AAD]'>Post Sales</option>
//                                 <option value="Digital Marketing" className='text-[#004AAD]'>Digital Marketing</option>
//                             </select>
//                             <input 
//                                 type="text" 
//                                 placeholder='Employee Name' 
//                                 className='border-2 border-[#004AAD] p-3 rounded-xl w-full placeholder:text-lg text-gray-700' 
//                                 value={username} 
//                                 onChange={handleCharacterChange} 
//                                 required
//                             />
//                             <input 
//                                 type="email" 
//                                 placeholder='Employee Email ID' 
//                                 className='border-2 border-[#004AAD] p-3 rounded-xl w-full placeholder:text-lg text-gray-700' 
//                                 value={email} 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                                 required
//                             />
                            
//                             <input 
//                                 type="text" 
//                                 placeholder='Employee ID ' 
//                                 className='border-2 border-[#004AAD] p-3 rounded-xl w-full placeholder:text-lg text-gray-700' 
//                                 value={employeeId} 
//                                 onChange={(e) => setEmployeeId(e.target.value.slice(0, 16))}
//                                 required
//                             />
                             
//                         </div>
//                         <div className='w-1/2 border-2 rounded-xl border-[#004AAD] p-4 flex flex-col items-center justify-center cursor-pointer' onClick={handleEvent}>
//                             <input type="file" name="" id="" ref={filePath} hidden accept="image/*" />
//                             <div className='flex flex-col justify-center items-center h-full'>
//                                 <p className='text-[#444444] text-[16px] font-semibold mb-2'>Upload Profile</p>
//                                 <img src={uploadProfile} alt="Upload Icon" className='w-12 h-12 mb-2' />
//                                 <p className='text-[#888888] text-sm'>Supported format png, jpg, or jpeg</p>
//                             </div>
//                         </div>

//                     </div>
//                     <div className='flex gap-4'>
//                         <input 
//                             type="tel" 
//                             placeholder='Employee Contact Number' 
//                             className='border-2 border-[#004AAD] p-3 rounded-xl w-1/2 placeholder:text-lg text-gray-700' 
//                             value={phone} 
//                             onChange={handleNumericChange(setPhone)}
//                             required
//                         />
//                         <input 
//                             type="tel" 
//                             placeholder='Employee WhatsApp Number' 
//                             className='border-2 border-[#004AAD] p-3 rounded-xl w-1/2 placeholder:text-lg text-gray-700' 
//                             value={whatsappNumber} 
//                             onChange={handleNumericChange(setWhatsappNumber)} 
//                         />
//                     </div>
//                     <div className='flex gap-4'>
//                         <div className='flex flex-col border-2 border-[#004AAD] p-3 rounded-xl w-1/2 text-[#004AAD]'>
                            
//                             <div className='mb-2 min-h-[2rem] flex flex-wrap items-center'>
//                                 {team.map(id => (
//                                     <span 
//                                         key={id} 
//                                         className='m-1 border border-blue-400 p-1 text-xs rounded-full bg-blue-100 text-[#004AAD] flex items-center cursor-pointer'
//                                         onClick={() => removeTeam(id)}
//                                     >
//                                         {TeamName(id).label} 
//                                         <span className='ml-1 font-bold'>&times;</span>
//                                     </span>
//                                 ))}
//                                 {team.length === 0 && <span className='text-gray-500 text-sm'>Select Teams</span>}
//                             </div>
//                             <select
//                                 id='selectTeam'
//                                 className="p-1 border-t border-gray-200 mt-1 focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
//                                 value={team.length === 0 ? "" : "ADD_NEW"}
//                                 onChange={e => {
//                                     if (e.target.value) {
//                                         setTeam(prev => [...prev, e.target.value])
//                                     }
//                                 }}
//                                 disabled={isDigitalMarketing || isAdmin}
//                             >
//                                 <option value="" disabled>
//                                     {isDigitalMarketing || isAdmin ? 'N/A' : 'Add Team...'}
//                                 </option>
//                                 {options
//                                     .filter(item => !team.includes(item.value))
//                                     .map(item => (
//                                         <option key={item.value} value={item.value} className="text-[#004AAD]">
//                                             {item.label}
//                                         </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <select
//                             className="border-2 border-[#004AAD] p-3 rounded-xl w-1/2 text-[#004AAD] text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
//                             value={officeLocation} 
//                             onChange={e => setOfficeLocation(e.target.value)}
//                             disabled={isDigitalMarketing || isAdmin} >
//                             <option value="Hyderabad" className="text-[#004AAD]">Hyderabad</option>
//                             <option value="Banglore" className="text-[#004AAD]">Banglore</option>
//                         </select>
//                     </div>
//                     <div className='flex justify-end pt-2'>
//                         <button 
//                             type='submit' 
//                             className='bg-[#004AAD] text-white p-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50'
//                             disabled={isSaving}
//                         > 
//                             {isSaving ? 'Adding...' : 'Add Employee'}
//                         </button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default Addemployeeform

import React, { useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import uploadProfile from '../../assets/Teaminfo/uploadProfile.png'

const Addemployeeform = ({ teamsInfo, handleCloseModal }) => {

    const filePath = useRef()
    const handleEvent = () => {
        filePath.current.click()
    }

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [whatsappNumber, setWhatsappNumber] = useState("")
    const [role, setRole] = useState("Intern")
    // Password state is kept but not used for auto-generated password logic on backend
    const [password, setPassword] = useState("") 
    const [officeLocation, setOfficeLocation] = useState("Hyderabad")
    const [team, setTeam] = useState([]); // State for multiple team IDs
    const [employeeId, setEmployeeId] = useState("") 
    const [isSaving, setIsSaving] = useState(false);

    const options = teamsInfo.map(item => ({
        value: item._id,
        label: item.name
    }));

    function TeamName(value) {
        const optionName = options.find(item => item.value === value)
        return optionName || { label: 'Unknown Team' }
    }

    const isDigitalMarketing = role === "Digital Marketing"
    const isAdmin = role === "Admin"

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const employeeIdRegex = /^[a-zA-Z0-9]{3,16}$/;
        
        // Added check for employeeId in mandatory fields
        if (!username || !email || !phone || !officeLocation || !employeeId) {
            toast.error("All fields (Name, Email, Phone, ID, Location) are mandatory.")
            return false
        }
        
        if (username.length < 3 || username.length > 30) {
            toast.error("Employee Name must be between 3 and 30 characters.")
            return false
        }
        if (!/^[a-zA-Z\s]+$/.test(username)) {
            toast.error("Employee Name must contain only letters and spaces.")
            return false
        }
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.")
            return false
        }
        if (!employeeIdRegex.test(employeeId)) {
            toast.error("Employee ID must be 3-16 characters long and can only contain letters and numbers.")
            return false
        }
        if (!/^\d{10}$/.test(phone)) {
            toast.error("Contact Number must be exactly 10 digits.")
            return false
        }
        if (whatsappNumber && !/^\d{10}$/.test(whatsappNumber)) {
            toast.error("WhatsApp Number must be exactly 10 digits if provided.")
            return false
        }
        
        if (!isDigitalMarketing && !isAdmin && team.length === 0) {
            toast.error("Please select at least one team.")
            return false
        }
        
        return true
    }

    async function handleCreateEmployee(e) {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSaving(true);

        try {
            // ✅ FIX: Convert phone numbers to Number type. Send null for empty whatsapp.
            const payload = {
                username,
                email,
                phone: Number(phone),
                password,
                officeLocation,
                whatsappNumber: whatsappNumber ? Number(whatsappNumber) : null,
                role,
                teamId: team, // team is already an array of IDs
                employeeId
            };

            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
            
            // The request hits the router.post("/user", RegisterUser) endpoint
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, fetchOptions)
            const result = await response.json()

            if (response.ok) {
                toast.success(result.msg)
                setUsername("")
                setPassword("")
                setEmail("")
                setOfficeLocation("Hyderabad")
                setTeam([]) // ✅ FIX: Reset to empty array
                setWhatsappNumber("")
                setRole("Intern")
                setPhone("")
                setEmployeeId("")
                handleCloseModal()
            } else {
                console.error("Server Error Details:", result);
                toast.error(result.msg || "Failed to create employee.")
            }
        } catch (e) {
            console.error("Error while creating Employee:", e)
            toast.error("Network Error")
        } finally {
            setIsSaving(false);
        }
    }

    const handleNumericChange = (setter) => (e) => {
        // Enforce max 10 digits
        const value = e.target.value.replace(/\D/g, '').slice(0, 10); 
        setter(value);
    };

    const handleCharacterChange = (e) => {
        // Enforce max 30 chars and only letters/spaces
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 30);
        setUsername(value);
    };
    
    const removeTeam = (teamIdToRemove) => {
        setTeam(team.filter(id => id !== teamIdToRemove));
    };


    return (
        <div className='flex justify-center items-start p-4 bg-black/75 w-screen h-screen fixed top-0 left-0 z-50 overflow-y-auto' >
            <Toaster />
            <div className='w-[850px] p-4 bg-white border-2 border-[#004AAD] rounded-lg shadow-2xl mt-8 mb-4'> 
                <div className='flex justify-end mb-2'> 
                    <button 
                        className='font-bold text-xl text-gray-500 hover:text-red-500 transition-colors' 
                        onClick={() => handleCloseModal()}
                    >
                        &times;
                    </button>
                </div>
                
                <p className='font-semibold text-xl text-[#004AAD] mb-3'>Add Employee</p> 
                
                <form className='flex flex-col gap-3' onSubmit={handleCreateEmployee}> 
                    <div className='flex gap-4'>
                        <div className='w-1/2 flex flex-col gap-3'>
                            <select 
                                className="border-2 border-[#004AAD] p-3 rounded-xl text-lg w-full text-gray-700" 
                                value={role} 
                                onChange={e => setRole(e.target.value)} 
                            >
                                <option value="Intern" className='text-[#004AAD] '>Intern</option>
                                <option value="Admin" className='text-[#004AAD]'>Admin</option>
                                <option value="Operations" className='text-[#004AAD]'>Operations</option>
                                <option value="HR" className='text-[#004AAD]'>HR</option>
                                <option value="Team Lead" className='text-[#004AAD]'>Team Lead</option>
                                <option value="Post Sales" className='text-[#004AAD]'>Post Sales</option>
                                <option value="Digital Marketing" className='text-[#004AAD]'>Digital Marketing</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder='Employee Name' 
                                className='border-2 border-[#004AAD] p-3 rounded-xl w-full placeholder:text-lg text-gray-700' 
                                value={username} 
                                onChange={handleCharacterChange} 
                                required
                            />
                            <input 
                                type="email" 
                                placeholder='Employee Email ID' 
                                className='border-2 border-[#004AAD] p-3 rounded-xl w-full placeholder:text-lg text-gray-700' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                            
                            <input 
                                type="text" 
                                placeholder='Employee ID ' 
                                className='border-2 border-[#004AAD] p-3 rounded-xl w-full placeholder:text-lg text-gray-700' 
                                value={employeeId} 
                                onChange={(e) => setEmployeeId(e.target.value.slice(0, 16))}
                                required
                            />
                             
                        </div>
                        <div className='w-1/2 border-2 rounded-xl border-[#004AAD] p-4 flex flex-col items-center justify-center cursor-pointer' onClick={handleEvent}>
                            <input type="file" name="" id="" ref={filePath} hidden accept="image/*" />
                            <div className='flex flex-col justify-center items-center h-full'>
                                <p className='text-[#444444] text-[16px] font-semibold mb-2'>Upload Profile</p>
                                <img src={uploadProfile} alt="Upload Icon" className='w-12 h-12 mb-2' />
                                <p className='text-[#888888] text-sm'>Supported format png, jpg, or jpeg</p>
                            </div>
                        </div>

                    </div>
                    <div className='flex gap-4'>
                        <input 
                            type="tel" 
                            placeholder='Employee Contact Number' 
                            className='border-2 border-[#004AAD] p-3 rounded-xl w-1/2 placeholder:text-lg text-gray-700' 
                            value={phone} 
                            onChange={handleNumericChange(setPhone)}
                            required
                        />
                        <input 
                            type="tel" 
                            placeholder='Employee WhatsApp Number' 
                            className='border-2 border-[#004AAD] p-3 rounded-xl w-1/2 placeholder:text-lg text-gray-700' 
                            value={whatsappNumber} 
                            onChange={handleNumericChange(setWhatsappNumber)} 
                        />
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col border-2 border-[#004AAD] p-3 rounded-xl w-1/2 text-[#004AAD]'>
                            
                            <div className='mb-2 min-h-[2rem] flex flex-wrap items-center'>
                                {team.map(id => (
                                    <span 
                                        key={id} 
                                        className='m-1 border border-blue-400 p-1 text-xs rounded-full bg-blue-100 text-[#004AAD] flex items-center cursor-pointer'
                                        onClick={() => removeTeam(id)}
                                    >
                                        {TeamName(id).label} 
                                        <span className='ml-1 font-bold'>&times;</span>
                                    </span>
                                ))}
                                {team.length === 0 && <span className='text-gray-500 text-sm'>Select Teams</span>}
                            </div>
                            <select
                                id='selectTeam'
                                className="p-1 border-t border-gray-200 mt-1 focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                                // Set value to a placeholder string for controlled select when no team is selected
                                value={team.length === options.length ? "" : "ADD_NEW"} 
                                onChange={e => {
                                    if (e.target.value !== "" && e.target.value !== "ADD_NEW") {
                                        setTeam(prev => [...prev, e.target.value])
                                    }
                                }}
                                disabled={isDigitalMarketing || isAdmin}
                            >
                                <option value="" disabled>
                                    {isDigitalMarketing || isAdmin ? 'N/A' : 'Add Team...'}
                                </option>
                                {options
                                    .filter(item => !team.includes(item.value))
                                    .map(item => (
                                        <option key={item.value} value={item.value} className="text-[#004AAD]">
                                            {item.label}
                                        </option>
                                ))}
                            </select>
                        </div>
                        <select
                            className="border-2 border-[#004AAD] p-3 rounded-xl w-1/2 text-[#004AAD] text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                            value={officeLocation} 
                            onChange={e => setOfficeLocation(e.target.value)}
                            disabled={isDigitalMarketing || isAdmin} >
                            <option value="Hyderabad" className="text-[#004AAD]">Hyderabad</option>
                            <option value="Banglore" className="text-[#004AAD]">Banglore</option>
                        </select>
                    </div>
                    <div className='flex justify-end pt-2'>
                        <button 
                            type='submit' 
                            className='bg-[#004AAD] text-white p-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50'
                            disabled={isSaving}
                        > 
                            {isSaving ? 'Adding...' : 'Add Employee'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Addemployeeform