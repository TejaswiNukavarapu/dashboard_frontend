import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { CiSearch } from "react-icons/ci";
import { FaFileCsv } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"; 
import useAuth from "../../context/AuthContext"; 
import { IoIosArrowDown } from "react-icons/io"; 

export default function Studentdata() {
    const { userDetails } = useAuth(); 

    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [course, setCourse] = useState('');
    const [month, setMonth] = useState("");
    const [programType, setProgramType] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const disableCsvUpload = userDetails?.role === "Post Sales" || userDetails?.role === "Intern";
    
    const disablePaymentStatus = userDetails?.role === "Operations" || userDetails?.role === "Intern";
    const fetchStudents = async () => {
        console.log("Studentdata: Starting data fetch..."); 
        setIsLoading(true); 
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/student/allstudent?search=${search}&course=${course}&programType=${programType}&month=${month}&page=${page}&limit=${limit}`;
            const res = await fetch(url);
            
            if (res.ok) {
                const result = await res.json();
                console.log("Studentdata: Success! Data received. Total records:", result.total); 
                setData(result.allstudent || []);
                setTotalPages(Math.ceil(result.total / limit) || 0);
            } else {
                console.error("Studentdata: Failed to fetch student info. Status:", res.status);
                toast.error("Failed to load student data.");
                setData([]);
            }
        } catch (error) {
            console.error("Studentdata: Network error or component crash during fetch:", error); 
            toast.error("Network error while fetching data.");
            setData([]);
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [search, course, month, programType, page, limit]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };
    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        await handleUpload(selectedFile);
    };

    const handleUpload = async (selectedFile) => {
        const fileToUpload = selectedFile || file;
        if (!fileToUpload) {
            toast.error("Please select the file");
            return;
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student/studentinfo`, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                toast.success("CSV file uploaded successfully");
                fetchStudents();
            } else {
                toast.error("Failed to upload CSV file");
            }
        } catch (error) {
            toast.error("Error uploading CSV file");
        }
    };

    const handleChange = async (e, id) => {
        const newStatus = e.target.value;

        try {
            const update = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student/student/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentStatus: newStatus }),
            });

            if (!update.ok) throw new Error("Failed to update status");
            toast.success("Status updated successfully");
            fetchStudents();
        } catch (error) {
            toast.error("Failed to update status");
            console.error("Failed to update:", error);
        }
    };

    const columns = [
        { id: "name", header: "Student Name" },
        { id: "phoneNumber", header: "Contact Number" },
        { id: "PricePitched", header: "Price Pitched" },
        { id: "courseOpted", header: "Course Opted" },
        { id: "Registration", header: "Registration Date" },
        { id: "programType", header: "programType" },
        { id: "employeeIdemail", header: "Employee Email" },
        {
            header: "Payment Status",
            cell: (row) => {
                const statusClasses = {
                    "Paid": "bg-green-100 text-green-700 border-green-700",
                    "Not Paid": "bg-red-100 text-red-700 border-red-700",
                    "Pending": "bg-yellow-100 text-yellow-700 border-yellow-700",
                    "Partial": "bg-orange-100 text-orange-700 border-orange-700",
                    "Full Payment": "bg-blue-100 text-blue-700 border-blue-700",
                    "Status": "bg-gray-100 text-gray-700 border-gray-400",
                };
                const currentStatus = row.paymentStatus || "Status";
                const baseClasses = `appearance-none rounded-full px-3 py-1 text-sm font-semibold border-2 cursor-pointer focus:outline-none `;
                
                return (
                    <div className="text-center relative">
                        <select
                            value={currentStatus}
                            onChange={(e) => handleChange(e, row._id)}
                            disabled={disablePaymentStatus} 
                            className={`${baseClasses} ${statusClasses[currentStatus]} ${
                                disablePaymentStatus
                                    ? "opacity-80 cursor-not-allowed"
                                    : "hover:opacity-90"
                            } pr-7`} 
                        >
                            <option value="Status" disabled>Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Not Paid">Not Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Partial">Partial</option>
                            <option value="Full Payment">Full Payment</option>
                        </select>
                        <IoIosArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none" />
                    </div>
                );
            },
        },
    ];

    const renderTableContent = () => {
        if (isLoading) {
            return (
                 <div className="text-center text-[#004AAD] font-bold text-xl py-10">
                    Loading student data...
                </div>
            );
        }
        
        try {
            if (data.length > 0) {
                return <Table columns={columns} data={data} />;
            }
        } catch (error) {
             console.error("Studentdata: Crash detected inside Table render:", error);
             return (
                 <div className="text-center text-red-600 font-bold text-xl py-10">
                    Error rendering data. Check console.
                </div>
             )
        }

        return (
             <div className="text-center text-[#444444] font-semibold text-lg py-10">
                No student data available.
            </div>
        );
    };
    const renderHeader = () => {
        const SelectAsButton = ({ title, value, onChange, options }) => (
            <div className="relative">
                <select 
                    className="appearance-none border-2 border-[#004AAD] rounded-full px-3 py-1 bg-[#004AAD] text-white font-medium cursor-pointer text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 pr-7"
                    value={value} 
                    onChange={onChange}
                >
                    <option value="" disabled>{title}</option>
                    {options}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-base pointer-events-none" />
            </div>
        );

         try {
            const monthOptions = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
            ].map((m) => <option key={m} value={m}>{m}</option>);

            return (
                <div className="flex flex-col p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
                            
                            <h1 className="font-semibold text-xl text-gray-800 mr-2">Students Info</h1>
                            
                            <SelectAsButton title="Employee Name" value={userDetails?.name || ""} onChange={() => {}} options={<option value="">All Employees</option>} />

                            <SelectAsButton
                                title="Course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                options={
                                    <>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Cloud Computing">Cloud Computing</option>
                                    </>
                                }
                            />

                            <SelectAsButton
                                title="Program Type"
                                value={programType}
                                onChange={(e) => setProgramType(e.target.value)}
                                options={
                                    <>
                                        <option value="Self Paced">Self Paced</option>
                                        <option value="Mentor-Led">Mentor-Led</option>
                                    </>
                                }
                            />

                            <SelectAsButton
                                title={month || "August"} 
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                options={monthOptions}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative border-2 border-[#004AAD] rounded-full shadow-sm w-[180px]">
                                <input
                                    type="text"
                                    placeholder="Search Here"
                                    value={search}
                                    onChange={handleSearch}
                                    className="w-full h-8 text-sm pl-4 pr-9 bg-white text-gray-800 rounded-full focus:outline-none placeholder:text-gray-400"
                                />
                                <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#004AAD] text-xl" />
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                                id="csvUpload"
                                disabled={disableCsvUpload}
                            />
                             <label
                                htmlFor="csvUpload"
                                className={`rounded-full px-3 py-2 text-sm flex items-center justify-center gap-2 font-semibold transition-colors
                                ${disableCsvUpload
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-[#004AAD] text-white cursor-pointer hover:bg-blue-700"
                                }`}
                            >
                                Import CSV File
                                <FaFileCsv className="text-xl" />
                            </label>
                        </div>
                    </div>
                </div>
            );
        } catch (error) {
            console.error("Studentdata: Crash detected inside Header render:", error);
            return (
                 <div className="p-4 bg-red-100 text-red-700 font-bold rounded-lg mb-4">
                    Error loading filters/header. Check console.
                </div>
            )
        }
    }


    return (
        <>
            <Toaster />
            <div className="px-6"> 
                {renderHeader()}
            </div>
            <div className="mx-4 md:mx-6"> 
                {renderTableContent()}
            </div>
            <div className="flex justify-between items-center mt-6 gap-4 px-7 mb-5">
                <span className="text-lg text-[#444444] font-medium">
                    Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className={`p-2 bg-[#004AAD] rounded-full transition-opacity ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
                    >
                        <FaArrowLeftLong className="text-xl text-white" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages || totalPages === 0}
                        className={`p-2 bg-[#004AAD] rounded-full transition-opacity ${(page === totalPages || totalPages === 0) ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
                    >
                        <FaArrowRightLong className="text-xl text-white" />
                    </button>
                </div>
            </div>
        </>
    );
}