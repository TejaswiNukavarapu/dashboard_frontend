// import React, { useEffect, useState } from 'react'
// import toast, {Toaster} from 'react-hot-toast'
// import { FaRegUserCircle } from "react-icons/fa";
// import CustomInput from '../../../components/ui/CustomInput';
// import { TbLockPassword } from "react-icons/tb";
// import CustomButton from '../../../components/ui/CustomButton';
// import useAuth from '../../../context/AuthContext';
// import { useNavigate } from 'react-router';



// const Signin = () => {

//     const [loginLoading , setLoginLoading] = useState(false)

//     const [username, setUsername] = useState("")
//     const [password , setPassword] = useState("")
//     const [isDisabled , setIsDisabled] = useState(true)

//     const {loginUser , loading , isLoggedIn , loadingAuth} = useAuth()
//     const navigate = useNavigate()


//      useEffect(() => {
//     if (!loadingAuth && isLoggedIn) {
//       navigate("/");
//     }
//   }, [isLoggedIn, loadingAuth, navigate]);

//     async function  onSubmitLogin(e){
//         e.preventDefault()
//         if(!password || !username){
//             toast.error("All fields are mandatory")
//             return 
//         }
        
//         console.log("this is running")
//         await loginUser({email:username , password})

//     }

//   return (
//     <div className='h-screen w-screen flex flex-col justify-center items-center '>
//       <h1 className='font-bold text-2xl mb-2'>Pursuit Future Dashboard</h1>
//       <p className='mb-2 text-gray-600'>From where everything Starts...</p>
//       <div  className='flex flex-col gap-4 items-center border-2 p-8 py-10 border-[#004AAD] rounded-xl'>
//       <form onSubmit={onSubmitLogin} className='flex flex-col gap-4 w-[250px]'>
//         <CustomInput type={"text"} title="Username" icon={<FaRegUserCircle className='text-xl text-[#004AAD]'/>} onChange={(e)=>setUsername(e.target.value)} value={username} />
//         <CustomInput type={"password"} title="Password" icon={<TbLockPassword className='text-xl text-[#004AAD]'/>} onChange={(e)=>setPassword(e.target.value)} value={password}/>
//         <CustomButton type={"submit"} isLoading={loading} title="Enter the portal"  />
//       </form>
//        <div className='-mt-2 flex'>
//             <button className='text-sm font-semibold text-[#004AAD]' onClick={()=>{navigate('/forgotPassword')}}>Forgot Password?</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signin
import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai"; 
import useAuth from '../../../context/AuthContext';
import { useNavigate } from 'react-router';

import CustomInput from '../../../components/ui/CustomInput'; 
import CustomButton from '../../../components/ui/CustomButton'; 


const Signin = () => {
    const [username, setUsername] = useState("")
    const [password , setPassword] = useState("")

    const {loginUser , loading , isLoggedIn , loadingAuth} = useAuth()
    const navigate = useNavigate()

    // Email validation regex (basic pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (!loadingAuth && isLoggedIn) {
          navigate("/"); 
        }
    }, [isLoggedIn, loadingAuth, navigate]);

    // Function to handle all front-end validation
    function validateInput() {
        if (!username || !password) {
            toast.error("All fields are mandatory.");
            return false;
        }

        // 1. Email Validation (using the basic regex)
        if (!emailRegex.test(username)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        // 2. Password Length Validation
        if (password.length < 2) {
            toast.error("Password must be at least 6 characters long.");
            return false;
        }
        if (password.length > 12) {
            toast.error("Password cannot exceed 12 characters.");
            return false;
        }
        
        return true;
    }

    async function onSubmitLogin(e){
        e.preventDefault()
        if (!validateInput()) {
            return;
        }
        
        console.log("Attempting login...")
        await loginUser({email:username , password})
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
            <div className='flex-1 flex flex-col justify-center items-center bg-white '>
                
                <div className='text-center mb-10'>
                    <p className='text-xl text-gray-700'>Hello Again!</p>
                    <h2 className='text-4xl font-semibold text-gray-900'>Login Here</h2>
                </div>
                <div className='p-8 rounded-xl shadow-lg border  bg-white border-[#004AAD] border-2 min-w-[350px]'>
                    
                    <form onSubmit={onSubmitLogin} className='flex flex-col gap-4'>
                        <CustomInput 
                            type={"text"} 
                            title="Email"
                            icon={<FaRegUserCircle className='text-xl text-gray-500'/>} 
                            onChange={(e)=>setUsername(e.target.value)} 
                            value={username} 
                        />
                        <CustomInput 
                            type={"password"} 
                            title="Password" 
                            icon={<TbLockPassword className='text-xl text-gray-500'/>} 
                            secondaryIcon={<AiOutlineEye className='text-xl text-gray-500 cursor-pointer'/>}
                            onChange={(e)=>setPassword(e.target.value)} 
                            value={password}
                        />
                        <CustomButton 
                            type={"submit"} 
                            isLoading={loading} 
                            title="Login" 
                            className="w-full bg-[#004AAD] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg transition duration-200"
                        />
                        
                    </form>
                    <div className='mt-4 text-center'>
                        <button 
                            className='text-sm font-medium text-[#004AAD] hover:underline' 
                            onClick={()=>{navigate('/forgotPassword')}}
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Signin