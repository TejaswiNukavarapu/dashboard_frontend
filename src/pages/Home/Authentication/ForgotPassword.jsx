// import React, { useEffect, useState } from 'react'
// import CustomInput from '../../../components/ui/CustomInput'
// import { FaRegUserCircle } from "react-icons/fa";
// import CustomButton from '../../../components/ui/CustomButton';
// import { MdOutlinePassword } from "react-icons/md";
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router';

// const forgotList  = {
//     intialise:"INTIALISE" , 
//     inProgess:"INPROGESS" , 
//     emailSent:"EMAILSENT" , 
//     verf:"NEW" , 
//     Verified:"Verified",
//     error:"ERROR",
//     success:"SUCCESS"
// }

// const ForgotPassword = () => {

    

//     const [email ,setEmail] = useState("")
//     const [forgotStatus, setForgotStatus] = useState(forgotList.intialise)
//     const [otp , setOtp] = useState("")
//     const [loading , setLoading] = useState(false)
//     const [password, setPassword] = useState("")
//     const [confirm , setConfirm] = useState("")

//     const navigate = useNavigate()

//     useEffect(()=>{
//         function checkStatus(){
//             const status = localStorage.getItem("forgot_Pass" )
//             const statusValue = JSON.parse(status)
//             if(statusValue){
//                 setEmail(statusValue.email)
//                 setForgotStatus(statusValue.status)
//             }
//         }

//         checkStatus()
//     } , [])

//     async function sendOtp(){
//         try{
//             const options = {
//                 method:"POST", 
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify({email})
//             }
//             setForgotStatus(forgotList.inProgess)
//             setLoading(true)
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/send-otp` , options)
//             setLoading(false)
//             const result = await response.json()
//             console.log(result)
//             if(response.ok){
//                 setForgotStatus(forgotList.emailSent)
//                 localStorage.setItem("forgot_Pass" ,JSON.stringify({email , status:forgotList.emailSent}))
//                 toast.success(result.msg)
//             }else{
//                 setForgotStatus(forgotList.intialise)
//                 toast.error(result.msg)
//             }

//         }catch(error){
//             console.log("Error in verifying Email"  , error)
//             toast.error("Network error")
//         }
//     }

//     async function verifyOtp(){
//         try{
//             const options = {
//                 method:"POST" , 
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify({email , otp})
//             }
//             setLoading(true)
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verifyEmail` , options)
//             setLoading(false)
//             const result = await response.json()
//             if(response.ok){
//                 setForgotStatus(forgotList.Verified)
//                  localStorage.setItem("forgot_Pass" ,JSON.stringify({email , status:forgotList.Verified}))
//                 toast.success(result.msg)
//             }else{
//                 toast.error(result.msg)
//             }
//         }catch(error){
//             console.log("Error in verifying Email"  , error)
//             toast.error("Network error")
//         }
//     }

//     async function reset(){
//         try{
//             if(!password || !confirm){
//                 toast.error("Enter password")
//                 return
//             }
//             if(password===confirm){
//                 const options = {
//                     method:"PUT" , 
//                     headers:{
//                         'Content-Type':'application/json'
//                     },
//                     body:JSON.stringify({email , password})
//                 }
//                 setLoading(true)
//                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password` , options)
//                 setLoading(false)
//                 const result = await response.json()
//                 if(response.ok){
//                     toast.success(result.msg)
//                     navigate("/login")
//                     setForgotStatus(forgotList.intialise)
//                     localStorage.removeItem("forgot_Pass")
//                 }else{
//                     toast.error(result.msg)
//                     if(response.status === 401){
//                         navigate("/login")
//                         setForgotStatus(forgotList.intialise)
//                         localStorage.removeItem("forgot_Pass")
//                     }
//                 }
//             }else{
//                 toast.error("Password doesn't match")
//             }
//         }catch(error){
//             console.log("Error in Reset password"  , error)
//             toast.error("Network error")
//         }
//     }

//     function intialise(){

//         async function handleSubmitEmail(e){
//             e.preventDefault()
//             await sendOtp()
//         }

//         return <div className='p-5'>
//             <form className='flex flex-col gap-4'  onSubmit={handleSubmitEmail}>
//                 <CustomInput type={"text"} icon={<FaRegUserCircle/>} title="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
//                 <CustomButton  type={"submit"} isLoading={loading} title="Send OTP"/>
//             </form>
//         </div>
//     }

//     function emailOTP(){

//         async function handleOtpVerification(e){
//             e.preventDefault()
//             await verifyOtp()
//         }
//         return <div>
//                 <p className='text-gray-700 w-[250px] font-semibold mb-2 text-center'>Enter OTP sent to email {email}</p>
             
//             <form className='flex flex-col gap-4' onSubmit={handleOtpVerification}>
//                 <CustomInput type={"text"} icon={<MdOutlinePassword/>} title="XXXXXX" value={otp} onChange={e=>{setOtp(e.target.value)}}  />
//                 <CustomButton  type={"submit"} isLoading={loading} title="Verify OTP"/>
//             </form>
//         </div>
//     }

//     function resetPassword(){

//         async function handleReset(e){
//             console.log("reseting password...")
//             e.preventDefault()
//             await reset()
//         }
//         return <div>
//             <form className='flex flex-col gap-4' onSubmit={handleReset}>
//                 <CustomInput type={"text"} icon={<MdOutlinePassword/>} title="New Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
//                 <CustomInput type={"text"} icon={<MdOutlinePassword/>} title="Old Password" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}}  />
//                 <CustomButton isLoading={loading} type={"submit"} title="Save Password"/>
//             </form>
//         </div>
//     }

//     function renderFunction(){
//         switch (forgotStatus) {
//             case forgotList.intialise:
//                 return intialise()
//             case forgotList.emailSent:
//                 return emailOTP()
//             case forgotList.Verified:
//                 return resetPassword()
//             default:
//                 break;
//         }
//     }



//   return (
//     <div className='flex w-screen flex-col gap-3 justify-center items-center h-screen'>
//         <p className='font-semibold '>Forgot password don't worry..</p>
//       {renderFunction()}
//     </div>
//   )
// }

// export default ForgotPassword
import React, { useEffect, useState } from 'react'
import CustomInput from '../../../components/ui/CustomInput'
import { FaRegUserCircle } from "react-icons/fa";
import CustomButton from '../../../components/ui/CustomButton';
import { MdOutlinePassword } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
const forgotList  = {
    intialise:"INTIALISE" , 
    inProgess:"INPROGESS" , 
    emailSent:"EMAILSENT" , 
    verf:"NEW" , 
    Verified:"Verified",
    error:"ERROR", 
    success:"SUCCESS" 
}
const ForgotPassword = () => {

    const [email ,setEmail] = useState("")
    const [forgotStatus, setForgotStatus] = useState(forgotList.intialise)
    const [otp , setOtp] = useState("")
    const [loading , setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirm , setConfirm] = useState("")

    const navigate = useNavigate()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    useEffect(()=>{
        function checkStatus(){
            const status = localStorage.getItem("forgot_Pass" )
            const statusValue = JSON.parse(status)
            if(statusValue){
                setEmail(statusValue.email)
                setForgotStatus(statusValue.status)
            }
        }
        checkStatus()
    } , [])
    async function sendOtp(){
        if (!email || !emailRegex.test(email)) {
             toast.error("Please enter a valid email address.")
             return
        }

        try{
            const options = {
                method:"POST", 
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            }
            setForgotStatus(forgotList.inProgess)
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/send-otp` , options)
            setLoading(false)
            const result = await response.json()
            console.log(result)
            if(response.ok){
                setForgotStatus(forgotList.emailSent)
                localStorage.setItem("forgot_Pass" ,JSON.stringify({email , status:forgotList.emailSent}))
                toast.success(result.msg)
            }else{
                setForgotStatus(forgotList.intialise)
                toast.error(result.msg)
            }

        }catch(error){
            console.log("Error in verifying Email"  , error)
            toast.error("Network error")
        }
    }

    async function verifyOtp(){
        if (!otp || otp.length !== 6) {
             toast.error("Please enter the 6-digit OTP.")
             return
        }
        try{
            const options = {
                method:"POST" , 
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email , otp})
            }
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verifyEmail` , options)
            setLoading(false)
            const result = await response.json()
            if(response.ok){
                setForgotStatus(forgotList.Verified)
                localStorage.setItem("forgot_Pass" ,JSON.stringify({email , status:forgotList.Verified}))
                toast.success(result.msg)
            }else{
                toast.error(result.msg)
            }
        }catch(error){
            console.log("Error in verifying Email"  , error)
            toast.error("Network error")
        }
    }

    async function reset(){
        if (password.length < 6 || password.length > 12) {
             toast.error("Password must be between 6 and 12 characters.")
             return
        }
        if(!password || !confirm){
            toast.error("Enter new and confirmation password")
            return
        }
        if(password!==confirm){
            toast.error("Passwords do not match")
            return
        }
        
        try{
            const options = {
                method:"PUT" , 
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email , password})
            }
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password` , options)
            setLoading(false)
            const result = await response.json()
            
            if(response.ok){
                toast.success(result.msg)
                navigate("/login")
                setForgotStatus(forgotList.intialise)
                localStorage.removeItem("forgot_Pass")
            }else{
                toast.error(result.msg)
                if(response.status === 401){
                    navigate("/login")
                    setForgotStatus(forgotList.intialise)
                    localStorage.removeItem("forgot_Pass")
                }
            }
        }catch(error){
            console.log("Error in Reset password"  , error)
            toast.error("Network error")
        }
    }
    function intialise(){
        async function handleSubmitEmail(e){
            e.preventDefault()
            await sendOtp()
        }
        return (
            <form className='flex flex-col gap-4'  onSubmit={handleSubmitEmail}>
                <CustomInput type={"text"} icon={<FaRegUserCircle className='text-xl text-gray-500'/>} title="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <CustomButton  type={"submit"} isLoading={loading} title="Send OTP" 
                    className="w-full bg-[#004AAD] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg transition duration-200"
                />
            </form>
        )
    }

    function emailOTP(){
        async function handleOtpVerification(e){
            e.preventDefault()
            await verifyOtp()
        }
        return (
            <div>
                <p className='text-gray-700 font-semibold mb-4 text-center text-base'>
                    Enter OTP sent to <span className='text-[#004AAD] font-bold'>{email}</span>
                </p>
                <form className='flex flex-col gap-4' onSubmit={handleOtpVerification}>
                    <CustomInput 
                        type={"text"} 
                        icon={<MdOutlinePassword className='text-xl text-gray-500'/>} 
                        title="Enter OTP (XXXXXX)" 
                        value={otp} 
                        onChange={e=>{setOtp(e.target.value)}} 
                        maxLength={6}
                    />
                    <CustomButton  type={"submit"} isLoading={loading} title="Verify OTP"
                        className="w-full bg-[#004AAD] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg transition duration-200"
                    />
                </form>
            </div>
        )
    }

    function resetPassword(){
        async function handleReset(e){
            console.log("reseting password...")
            e.preventDefault()
            await reset()
        }
        return (
            <div>
                <p className='text-gray-700 font-semibold mb-4 text-center text-base'>
                   Set your new password (6-12 chars)
                </p>
                <form className='flex flex-col gap-4' onSubmit={handleReset}>
                    <CustomInput 
                        type={"password"} 
                        icon={<MdOutlinePassword className='text-xl text-gray-500'/>} 
                        title="New Password" 
                        value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}} 
                    />
                    <CustomInput 
                        type={"password"} 
                        icon={<MdOutlinePassword className='text-xl text-gray-500'/>} 
                        title="Confirm Password" 
                        value={confirm} 
                        onChange={(e)=>{setConfirm(e.target.value)}}  
                    />
                    <CustomButton 
                        isLoading={loading} 
                        type={"submit"} 
                        title="Save Password"
                        className="w-full bg-[#004AAD] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg transition duration-200"
                    />
                </form>
            </div>
        )
    }

    function renderFunction(){
        switch (forgotStatus) {
            case forgotList.intialise:
                return intialise()
            case forgotList.emailSent:
                return emailOTP()
            case forgotList.Verified:
                return resetPassword()
            default:
                 return (
                    <div className='text-center p-4'>
                        <p className='text-gray-500'>Something went wrong. Please refresh.</p>
                        <button 
                            onClick={() => setForgotStatus(forgotList.intialise)} 
                            className='text-[#004AAD] mt-2 underline'
                        >
                            Try again
                        </button>
                    </div>
                )
        }
    }
    return (
        <div className='h-screen w-screen flex'>
             <Toaster /> 
            <div className='flex-1 flex flex-col justify-center items-center bg-[#004AAD] text-white'>
                <div className='w-40 h-40 mb-4 flex justify-center items-center'>
                    <div className='relative w-full h-full flex justify-center items-center'>
                        <img src='/pursuit.png' alt="Pursuit Future Technologies Dashboard"/>
                    </div>
                </div>
                <h1 className='text-3xl font-normal tracking-wider'>PURSUIT FUTURE</h1>
                <p className='text-lg font-light tracking-widest'>TECHNOLOGIES</p>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center bg-white'>
                <div className='text-center mb-10'>
                    <p className='text-xl text-gray-700'>Trouble Logging In?</p>
                    <h2 className='text-4xl font-semibold text-gray-900'>Forgot Password</h2>
                </div>
                <div className='p-8 rounded-xl shadow-lg border-2 border-[#004AAD] bg-white min-w-[350px]'>
                    {renderFunction()}
                    <div className='mt-6 text-center'>
                        <button 
                            className='text-sm font-medium text-gray-500 hover:text-[#004AAD] transition-colors duration-150' 
                            onClick={()=>{navigate('/login')}}
                        >
                            ← Back to Login
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ForgotPassword