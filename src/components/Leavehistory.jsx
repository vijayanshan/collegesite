import React, { useEffect, useState } from "react";
import axios from "axios";
import header_icon from '../components/assets/header_icon.png';
import bg1 from '../components/assets/bg1.jpeg';
const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8081/leavehistory");
        const data = response.data || [];
        setLeaveHistory(data);
        setFilteredHistory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave history:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (userId.trim() === "") {
      setFilteredHistory(leaveHistory);
      setStudentInfo(null);
    } else {
      const filtered = leaveHistory.filter((entry) =>
        entry.userId.toLowerCase().includes(userId.toLowerCase())
      );
      setFilteredHistory(filtered);
      setStudentInfo(filtered.length > 0 ? filtered[0] : null);
    }
  }, [userId, leaveHistory]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#fff'
    }}>
        
      <header
  style={{
    width: "100%",
    backgroundColor: "#f1eeeeff",
    padding: "1rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderBottom: "4px solid #0b0627ff"
  }}
>
  <img
    src={header_icon}
    alt="College Header"
    style={{
      maxWidth: "90%",
      height: "auto",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)"
    }}
  />
</header>




      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "0 1rem",
      }}>
<div
    style={{
      display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    marginTop: "1cm",         // 1 cm below top bar
    marginRight: "1rem",      // Padding from right edge
  }}
>
  <input
    type="text"
    placeholder="Search by User ID"
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
    style={{
      padding: "10px",
      width: "250px",
      height: "40px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px"
    }}
  />
  <button
    onClick={() => setUserId("")}
    style={{
      height: "40px",
      padding: "0 20px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer"
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
            <p><strong>👤 User ID:</strong> {studentInfo.userId}</p>
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
                  {[
                    "User ID", "Name", "Email", "Department",
                    "Semester", "Date", "Reason", "Status"
                  ].map((h) => (
                    <th key={h} style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f9f9f9"
                    }}>{h}</th>
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
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor:
                            req.status?.toLowerCase() === "approved" ? "#d4edda" :
                            req.status?.toLowerCase() === "rejected" ? "#f8d7da" :
                            "#ffeeba"
                        }}>
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

      <footer style={{
        backgroundColor: '#1e67b4ff',
        color: '#fff',
        padding: '1.5rem 0',
        textAlign: 'center',
        borderTop: '4px solid #2b0707ff'
      }}>
        <div>
          <h4>Shanmuga Industries Arts and Science College</h4>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
          <p>
            Contact: <a href="mailto:info@shanmugacollege.edu.in" style={{ color: '#fff', textDecoration: 'underline' }}>info@shanmugacollege.edu.in</a> |
            Phone: <a href="tel:+914345123456" style={{ color: '#fff', textDecoration: 'underline' }}>+91 4345 123 456</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LeaveHistory;
