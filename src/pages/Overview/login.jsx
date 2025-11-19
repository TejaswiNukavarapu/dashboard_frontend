import { useState } from "react"
// import pursuit from '../../assets/pursuit.png'
import Signin from "../Home/Authentication/Signin"
function Authentication(){

    const [isSignup , setIsSignup] = useState(false)

    function toggleSignup(){
        setIsSignup(!isSignup)
    }

    return <div className="grid lg:grid-cols-2 h-screen grid-cols-1">
       <div className="bg-mom flex justify-center items-center">
        <div className="flex-col justify-center items-center">
            <img src='/pursuit.png' alt="Pursuit Future Technologies" />
            <p className="text-center text-[white] font-bold text-5xl">mom <br /> dashboard</p>
        </div>
       </div>
       <div className="p-10 flex justify-center items-center">
            <div>
                <Signin/>
            </div>
       </div>
    </div>
}

export default Authentication