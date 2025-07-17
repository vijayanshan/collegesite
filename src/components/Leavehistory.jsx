// src/components/LeaveHistory.jsx
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../components/config";                // ✅ Corrected import path
import useDebounce from "./useDebounce";

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedUserId = useDebounce(userId.trim(), 500);

  useEffect(() => {
    let ignore = false;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/leaves/all-approved-rejected`
        );
        if (!res.ok) throw new Error("Failed to fetch leave history: " + res.status);
        const data = await res.json();
        if (!ignore) {
          setLeaveHistory(data);
          setFilteredHistory(data);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const id = debouncedUserId;
    const userLeaves = id
      ? leaveHistory.filter((req) => String(req.userId) === userId)
      : leaveHistory;

    setFilteredHistory(userLeaves);

    if (userLeaves.length > 0) {
      const { name, email, department, semester, leaveDate } = userLeaves[0];
      setStudentInfo({ name, email, department, semester, leaveDate });
    } else {
      setStudentInfo(null);
    }
  }, [debouncedUserId, leaveHistory]);

  return (
    <>
      <header style={{ backgroundColor: "#007BFF", padding: "1rem", color: "white", marginBottom: "1rem" }}>
        <h1>SHANMUGA INDUSTRIES ARTS AND SCIENCE COLLEGE</h1>
        <h2>Leave History Dashboard</h2>
      </header>

      <div style={{ padding: "0 1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="🔍 Search by User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "10px", width: "250px" }}
          />
          <button
            onClick={() => setUserId("")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {studentInfo && (
          <div style={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#f1faff",
          }}>
            <p><strong>👤userId:</strong> {studentInfo.userId}</p>
            <p><strong>👤 Name:</strong> {studentInfo.name}</p>
            <p><strong>📧 Email:</strong> {studentInfo.email}</p>
            <p><strong>🏢 Department:</strong> {studentInfo.department}</p>
            <p><strong>🎓 Semester:</strong> {studentInfo.semester}</p>
            <p><strong>🗓️ Leave Date:</strong> {studentInfo.leaveDate}</p>
          </div>
        )}

        {loading ? (
          <p>Loading leave history...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="table-container">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["User ID","Name","Email","Department","Semester","Date","Reason","Status"].map((h) => (
                    <th key={h}
                      style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f9f9f9" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length ? (
                  filteredHistory.map((req, idx) => (
                    <tr key={idx}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.userId}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.name}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.email}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.department}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.semester}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.leaveDate}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{req.reason}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <span className={`status ${req.status?.toLowerCase() || ""}`}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            backgroundColor:
                              req.status?.toLowerCase() === "approved" ? "#d4edda" :
                              req.status?.toLowerCase() === "rejected" ? "#f8d7da" :
                              "#ffeeba"
                          }}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "16px" }}>
                      No leave history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default LeaveHistory;
