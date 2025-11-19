// import React, { useState, useEffect } from 'react'
// import toast, {Toaster} from 'react-hot-toast'



// const Addteamform = ({ onClose, editAddteam }) => {
//     const [loading, setLoading] = useState(true)
//     const [formData, setFormData] = useState({
//         location: '',
//         name: '',
//         contact: ''
//     });

//     useEffect(() => {
//         if (editAddteam) {
//             setFormData({
//                 location: editAddteam.location,
//                 name: editAddteam.name,
//                 contact: editAddteam.contact,
//             });
//         }
//     }, [editAddteam])

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };


//     const createFunction = async (e) => {
//         e.preventDefault();
//         try {
//             const method = editAddteam ? 'PUT' : 'POST';
//             const url = editAddteam ? `${import.meta.env.VITE_BACKEND_URL}/team/team/${editAddteam._id}`
//                 : `${import.meta.env.VITE_BACKEND_URL}/team/team`;

//             const response = await fetch(url, {
//                 method: method,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     contact: Number(formData.contact),
//                 })
//             });

//             if (response) {
//                 console.log(response)
//                toast.success(editAddteam ? 'Team updated successfully' : 'Team added successfully');
//                 if (onClose) onClose();
//             } else {
//                 const errorData = await response.json();
//                toast.error('Failed to add team.');
//             }
//         } catch (e) {
//             console.log('Data not added', e);
//             toast.error('Error connecting to the server.');
//         }
//     };



//     return (
//         <div className='flex justify-center fixed z-10 inset-[220px]'>
//             <div className=' p-6 bg-white border border-[#004AAD] rounded-lg'>
//                 <div className='flex justify-end'>
//                     <button className="close-button " onClick={onClose}> X </button>
//                 </div>
//                 <form onSubmit={createFunction} className='grid-cols-2 gap-4'>
//                     <div className='flex gap-3 p-2'>
//                         <p className='font-Regular font-family:DM Sans text-[#444444] flex-1  text-2xl'>Adding Team </p>
//                         <div>
//                             <select
//                                 name="location"
//                                 value={formData.location}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-[#004AAD] p-3 w-full rounded-lg text-[#004AAD]">
//                                 <option value="" disabled>
//                                     Select Office Location
//                                 </option>
//                                 <option value="Hyderabad">Hyderabad</option>
//                                 <option value="Bangalore">Bangalore</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="flex gap-3 w-full p-2">
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Team name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="border-2 border-[#004AAD] p-3 rounded-lg w-full"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="contact"
//                             placeholder="Team Contact Number"
//                             value={formData.contact}
//                             onChange={handleChange}
//                             className="border-2 border-[#004AAD] p-3 rounded-lg w-full"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <button type='submit' className='bg-[#004AAd] text-white p-2 rounded-lg ml-80' >Add Team</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Addteamform
import React, { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
// Removed all Firebase imports
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
// import { getFirestore, collection, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Removed Firebase initialization logic
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
// const app = Object.keys(firebaseConfig).length > 0 ? initializeApp(firebaseConfig) : null;
// const db = app ? getFirestore(app) : null;
// const auth = app ? getAuth(app) : null;
// let userId = 'mock-user-id'; 

// if (auth && typeof __initial_auth_token !== 'undefined') {
//     signInWithCustomToken(auth, __initial_auth_token).then(userCred => {
//         userId = userCred.user.uid;
//     }).catch(() => {
//         signInAnonymously(auth).then(userCred => {
//             userId = userCred.user.uid;
//         });
//     });
// } else if (auth) {
//     signInAnonymously(auth).then(userCred => {
//         userId = userCred.user.uid;
//     });
// }


const Addteamform = ({ onClose, editAddteam }) => {
    const [isSaving, setIsSaving] = useState(false); 
    const [formData, setFormData] = useState({
        location: '',
        name: '',
        contact: ''
    });

    useEffect(() => {
        if (editAddteam) {
            setFormData({
                location: editAddteam.location,
                name: editAddteam.name,
                contact: String(editAddteam.contact),
            });
        }
    }, [editAddteam])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.location || !formData.name || !formData.contact) {
            toast.error('All fields are required.');
            return false;
        }
        if (formData.name.length > 16) {
             toast.error('Team name cannot exceed 16 characters.');
             return false;
        }
        const contactString = String(formData.contact).trim();
        if (!/^\d{10}$/.test(contactString)) {
             toast.error('Contact number must be exactly 10 digits.');
             return false;
        }

        return true;
    }

    const createFunction = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const contactNumber = Number(formData.contact);
        setIsSaving(true);
        
        try {
            const method = editAddteam ? 'PUT' : 'POST';
            const url = editAddteam 
                ? `${import.meta.env.VITE_BACKEND_URL}/team/team/${editAddteam._id}`
                : `${import.meta.env.VITE_BACKEND_URL}/team/team`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    contact: contactNumber,
                })
            });
            if (response.ok) {
               toast.success(editAddteam ? 'Team updated successfully' : 'Team added successfully');
               if (onClose) onClose();
            } else {
                const errorData = await response.json();
                toast.error(errorData.msg || 'Failed to save team.');
            }
            
        } catch (e) {
            console.error('Data not added (Network Error):', e);
            toast.error('Error connecting to the server.');
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <Toaster />
            <div className='p-6 bg-white border border-[#004AAD] rounded-lg w-full max-w-lg shadow-xl'>
                <div className='flex justify-between items-center mb-4'>
                    <p className='font-semibold text-2xl text-[#004AAD]'>
                        {editAddteam ? 'Edit Team' : 'Add New Team'}
                    </p>
                    <button 
                        className="text-xl text-gray-500 hover:text-red-600 transition-colors" 
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={createFunction} className='flex flex-col gap-4'>
                    <div className='flex gap-3 items-center'>
                        <p className='font-normal text-[#444444] text-lg flex-1'>Adding Team</p>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="border border-[#004AAD] p-3 w-1/2 rounded-lg text-gray-700 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Select Office Location
                            </option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                    </div>
                    <div className="flex gap-3 w-full">
                        <input
                            type="text"
                            name="name"
                            placeholder="Team name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={16} 
                            className="border-2 border-[#004AAD] p-3 rounded-lg w-full"
                            required
                        />
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Team Contact Number"
                            value={formData.contact}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); 
                                setFormData((prev) => ({ ...prev, contact: value.slice(0, 10) }));
                            }}
                            maxLength={10}
                            className="border-2 border-[#004AAD] p-3 rounded-lg w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-2">
                        <button 
                            type='submit' 
                            disabled={isSaving}
                            className='bg-[#004AAD] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50' 
                        >
                            {isSaving ? 'Saving...' : (editAddteam ? 'Update Team' : 'Add Team')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addteamform;