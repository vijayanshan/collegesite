// LeaveApprovalDashboard.jsx
import React, { useEffect, useState } from "react";
import "../components/css/staffapprove.css"; // Scoped CSS
import { Link } from "react-router-dom";
import API_BASE_URL from "./config";

const LeaveApprovalDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [staffId, setStaffId] = useState("1111");
  const [approvedBy, setApprovedBy] = useState("");
  const [rejectedBy, setRejectedBy] = useState("");
  const [decisionDate, setDecisionDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!staffId) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/api/leaves/pending-by-staff/${staffId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pending leaves");
        return res.json();
      })
      .then((data) => {
        setLeaveRequests(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        alert("Error fetching leaves: " + err.message);
        setLeaveRequests([]);
      })
      .finally(() => setLoading(false));
  }, [staffId]);

  const updateStatus = (id, newStatus) => {
    const today = new Date().toISOString().split("T")[0];
    if (!decisionDate) return alert("❗ Please select decision date.");
    if (decisionDate <= today) return alert("❗ Decision date must be in the future.");


    const url =
      newStatus === "Approved"
        ? `${API_BASE_URL}/api/leaves/${id}/approve?staffId=${staffId}&decisionDate=${decisionDate}`
        : `${API_BASE_URL}/api/leaves/${id}/reject?staffId=${staffId}&decisionDate=${decisionDate}`;

    const options = newStatus === "Approved" ? { method: "GET" } : { method: "PUT" };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update leave status");
        return res.json();
      })
      .then(() => {
        setLeaveRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus.toUpperCase() } : r))
        );
        alert(`Leave ID ${id} marked as ${newStatus}.`);
      })
      .catch((err) => alert("Error updating leave status: " + err.message));
  };

  return (
    <div className="leave-approval-page">
      <header>
        <h1>SHANMUGA INDUSTRIES ARTS AND SCIENCE COLLEGE</h1>
        <h2>Staff Leave Approval Panel</h2>
      </header>

      <nav className="top-navbar">
        <ul className="top-nav-links">
          <li>
            <Link to="/LoginFormstaff/LeaveApprovalDashboard/LeaveHistory" className="nav-button">
              Leave History
            </Link>
          </li>
        </ul>
      </nav>

      <div className="form-section">
      
        <input
          type="date"
           placeholder="Dicision Date By"
          value={decisionDate}
          onChange={(e) => setDecisionDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <button className="loading-button" disabled>
            <span className="spinner"></span> Loading leave requests...
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.userId}</td>
                    <td>{req.name}</td>
                    <td>{req.email}</td>
                    <td>{req.department}</td>
                    <td>{req.semester}</td>
                    <td>{req.leaveDate}</td>
                    <td>{req.reason}</td>
                    <td>
                      <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
                    </td>
                    <td className="action-buttons">
                      <button onClick={() => updateStatus(req.id, "Approved")}>Approve</button>
                      <button onClick={() => updateStatus(req.id, "Rejected")}>Reject</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No pending leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveApprovalDashboard;
