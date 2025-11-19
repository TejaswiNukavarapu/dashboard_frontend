import React, { useState } from "react";
import Button from "./Button";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import useAuth from "../../context/AuthContext";

export const Bottomnav = () => {
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    function handleLogout() {
        setShowLogoutModal(true);
    }
    function confirmLogout() {
        setShowLogoutModal(false);
        logout();
    }
    return (
        <>
            <div className="flex flex-col border-t mt-3 md:p-2">
                <Button className="bg-[#004aad]" onclick={() => {}} title="Support" icon={<MdOutlineSupportAgent className="h-7 w-7" />} />
                <Button className="bg-[#004aad] rounded-md " onclick={handleLogout} title="Log Out" icon={<IoIosLogOut className="h-7 w-7" />} />
            </div>
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3"> Confirm Logout </h3>
                        <p className="text-gray-600 mb-6"> Are you sure you want to log out of the dashboard? </p>
                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={() => setShowLogoutModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors" > Cancel </button>
                            <button type="button" onClick={confirmLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors" >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};