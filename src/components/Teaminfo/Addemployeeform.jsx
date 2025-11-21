import React, { useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import uploadProfile from '../../assets/Teaminfo/uploadProfile.png'
import cross from '../../assets/cross.png'
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
    const [password, setPassword] = useState("") 
    const [officeLocation, setOfficeLocation] = useState("Hyderabad")
    const [team, setTeam] = useState([]);
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
            const payload = {
                username,
                email,
                phone: Number(phone),
                password,
                officeLocation,
                whatsappNumber: whatsappNumber ? Number(whatsappNumber) : null,
                role,
                teamId: team,
                employeeId
            };

            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, fetchOptions)
            const result = await response.json()

            if (response.ok) {
                toast.success(result.msg)
                setUsername("")
                setPassword("")
                setEmail("")
                setOfficeLocation("Hyderabad")
                setTeam([])
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
        const value = e.target.value.replace(/\D/g, '').slice(0, 10); 
        setter(value);
    };

    const handleCharacterChange = (e) => {
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
                <div className='flex justify-end mb-2 justify-between mt-5'> 
                    <p className='font-semibold text-2xl text-[#004AAD] mb-3'>Add Employee</p> 
                    <button 
                        className='font-bold text-xl text-gray-500 hover:text-red-500 transition-colors' 
                        onClick={() => handleCloseModal()}
                    >
                       <img src={cross} alt="Close" className="w-8 h-8 cursor-pointer hover:opacity-80"/> 
                    </button>
                </div>
                
                
                
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