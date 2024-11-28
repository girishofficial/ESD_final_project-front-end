
import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { getTokenFromLocalStorage } from "../utils/tokenUtil";
import { useNavigate } from "react-router-dom";




import StudentTable from "../Components/StudentTable";
import FilterControls from "../Components/FilterControls";

const Dashboard= () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [domainFilter, setDomainFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const apiUrl = "http://localhost:8000/api/v1/student";
    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        setError("Authorization required. Please log in.");
        setLoading(false);
        return;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch student data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Students updated:", data);
      setStudents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDomainChange = async (event) => {
    console.log("domain change")
    const domain = event.target.value;
    setDomainFilter(domain);
    if (domain === "all") {
      fetchStudents();
      return;
    }
    try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8000/api/v1/student/domain/${domain}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error(`Failed to fetch students by domain: ${response.statusText}`);
            }
      
            const data = await response.json();
            setStudents(data);
          } catch (error) {
            console.error("Error fetching students by domain:", error);
            setError("Failed to filter students by domain.");
          }
  };

  const handleSpecializationChange = async (event) => {
    const specialization = event.target.value;
    setSpecializationFilter(specialization);
    if (specialization === "all") {
      fetchStudents();
      return;
    }
    try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
              `http://localhost:8000/api/v1/student/specialization/${specialization}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
      
            if (!response.ok) {
              throw new Error(`Failed to fetch students by specialization: ${response.statusText}`);
            }
      
            const data = await response.json();
            setStudents(data);
          } catch (error) {
            console.error("Error fetching students by specialization:", error);
            setError("Failed to filter students by specialization.");
          }
  };

  const handleRecalculateSpecializations = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await fetch("http://localhost:8000/api/v1/student/calculate", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to calculate specializations: ${response.statusText}`);
      }
      alert("Specialization calculation completed successfully.");
      fetchStudents();
    } catch (error) {
      setError("Failed to calculate specializations.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center">Student Dashboard</h1>
      <FilterControls
        domainFilter={domainFilter}
        specializationFilter={specializationFilter}
        onDomainChange={handleDomainChange}
        onSpecializationChange={handleSpecializationChange}
        onRecalculateSpecializations={handleRecalculateSpecializations}
        onLogout={handleLogout}
      />
      <StudentTable students={students} />
    </div>
  );
};

export default Dashboard;