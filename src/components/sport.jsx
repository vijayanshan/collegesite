import React from "react";

const SportsPersonspage= () => {
  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      backgroundImage: `url('your-background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 35, 82, 0.9)',
        padding: '20px 10px'
      }}>
        <h1 style={{ margin: 0 }}>Shanmuga Industries Arts and Science College</h1>
        <h2 style={{ fontWeight: 'normal' }}>Sports Achievers - Batch Records</h2>
      </div>

      {/* Batch Cards */}
      <div style={{ padding: "40px 10px" }}>
        {[
          { batch: "2024 - 2025", pdf: "sports_2024_2025.pdf" },
          { batch: "2023 - 2024", pdf: "sports_2023_2024.pdf" },
          { batch: "2022 - 2023", pdf: "sports_2022_2023.pdf" }
        ].map((item, index) => (
          <div key={index} style={{
            background: "rgba(255, 255, 255, 0.85)",
            color: "#002352",
            padding: "20px",
            margin: "20px auto",
            maxWidth: "600px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3>{item.batch} - Sports Achievers</h3>
            <a
              href={item.pdf}
              download
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#e53935",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold"
              }}
            >
              🏅 Download PDF
            </a>
          </div>
        ))}
        <button
          onClick={() => window.location.href = "/"}
          style={{
            marginTop: "30px",
            padding: "8px 16px",
            backgroundColor: "#002352",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>
      </div>

      <footer style={{
        backgroundColor: "#002352",
        padding: "10px",
        color: "#fff",
        fontSize: "14px",
        position: "relative",
        bottom: 0
      }}>
        © 2025 Shanmuga Industries Arts and Science College
      </footer>
    </div>
  );
};

export default SportsPersonspage;
