import React, { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import cross from '../../assets/cross.png'
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
                   <button onClick={onClose}><img src={cross} alt="Close" className="w-8 h-8 cursor-pointer hover:opacity-80"/></button>
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