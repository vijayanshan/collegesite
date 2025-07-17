import React, { useState, useEffect } from 'react';
import './css/StudentLogin.css';
import API_BASE_URL from './config';

const Student_Login = () => {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    department: "",
    year: "",
    leaveDate: "",
    reason: "",
    staffId: "",
    staffName: ""
  });

  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      userId: parseInt(formData.userId),
      staffId: parseInt(formData.staffId),
      status: "PENDING",
      approvedBy: "",
      rejectedBy: "",
      decisionDate: ""
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/leaves/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        setMessage("✅ Leave application submitted successfully.");
        setFormData({
          userId: "",
          name: "",
          email: "",
          department: "",
          semester: "",
          leaveDate: "",
          reason: "",
          staffId: "",
          staffName: ""
        });
      } else {
        setMessage("❌ Failed to submit. Please try again.");
      }
    } catch (err) {
      setMessage("⚠️ Server error or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-bg">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="form-container">
        <h2>Leave Application Form</h2>
        <form className="leave-form" onSubmit={handleSubmit}>
          <input name="userId" value={formData.userId} onChange={handleChange} placeholder="Student ID" required />
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Student Name" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="MCA">MCA</option>

            <option value="CS">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="Commerce">Commerce</option>
            <option value="English">English</option>
          </select>

          <select name="semester" value={formData.semester} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="I Year">I Year</option>
            <option value="II Year">II Year</option>
          </select>

          <select name="reason" value={formData.reason} onChange={handleChange} required>
            <option value="">Select Reason</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Personal Work">Personal Work</option>
            <option value="Family Emergency">Family Emergency</option>
            <option value="Function or Ceremony">Function or Ceremony</option>
            <option value="Project Work">Project Work</option>
            <option value="Other">Other</option>
          </select>

          <input name="leaveDate" type="date" value={formData.leaveDate} onChange={handleChange} min={minDate} required />
          <input name="staffId" value={formData.staffId} onChange={handleChange} placeholder="Staff ID" required />
          <input name="staffName" value={formData.staffName} onChange={handleChange} placeholder="Staff Name" required />
          <button type="submit">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Student_Login;
