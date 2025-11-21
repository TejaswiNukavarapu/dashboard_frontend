import React, { useRef, useState, useEffect } from "react";
import { FaFileCsv } from "react-icons/fa6";
import useAuth from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LeadUploadForm({ token = "", role = "Admin" }) {
  const { userDetails } = useAuth();
  const [leadType, setLeadType] = useState("Sales Lead");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const BE = import.meta.env.VITE_BACKEND_URL || "";

  const roleNorm = (userDetails?.role || "").toString().toLowerCase().replace(/\s+/g, "");
  const isPostSales = (roleNorm === "postsales" || roleNorm === "postsales");

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (isPostSales) {
      toast.error("post sales cannot import CSV files");
      return;
    }
    setFile(f);
  };

  const onUpload = async () => {
    if (!file) return toast.error("Pick file");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("leadType", leadType);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student/studentinfo`, {
        method: "POST",
        headers: { "x-user-id": userDetails?._id || "" },
        body: form,
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Upload failed");
      toast.success("Uploaded");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    }
  };

  return (
    <div className="p-3 border rounded">
      <h4>Upload Leads CSV</h4>
      <div className="mt-2">
        <select value={leadType} onChange={(e) => setLeadType(e.target.value)}>
          <option>Sales Lead</option>
          <option>Lead Gen</option>
        </select>
      </div>

      <div className="mt-2">
        <input ref={fileInputRef} type="file" accept=".csv" onChange={onFileChange} />
      </div>

      <div className="mt-2">
        <button onClick={onUpload} disabled={isPostSales} className={`px-3 py-1 rounded ${isPostSales ? "opacity-50 cursor-not-allowed" : "bg-blue-600 text-white"}`}>
          Upload
        </button>
        {isPostSales && <div className="text-sm text-red-600 mt-1">CSV import disabled for post sales</div>}
      </div>
    </div>
  );
}
