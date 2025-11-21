import React from "react";
import { useEffect } from "react";
import useAuth from "../context/AuthContext";
import { useState } from "react";
export default function useFetchEmployees(selectedLocation) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { userDetails } = useAuth();

  useEffect(() => {
    const location = selectedLocation || userDetails?.officeLocation;
    if (!location) return;

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setMessage("");

        const params = new URLSearchParams();
        params.append("location", location);

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/Allusers?${params.toString()}`;
        console.log("Fetching employees from:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Unable to load employees.");

        const json = await response.json();
        console.log("Fetched employees data:", json);

        if (!json.users || json.users.length === 0) {
          setData([]);
          setMessage("No employees found for this location.");
        } else {
          setData(json);
          setMessage("");
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setData([]);
        setMessage("Unable to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedLocation, userDetails]);

  return { data, loading, message };
}
