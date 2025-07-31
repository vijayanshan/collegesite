import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SportsPersonspage = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const batches = [
    { batch: "2024 - 2025", pdf: "sports_2024_2025.pdf" },
    { batch: "2023 - 2024", pdf: "sports_2023_2024.pdf" },
    { batch: "2022 - 2023", pdf: "sports_2022_2023.pdf" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: `url('/your-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <header
        data-aos="fade-down"
        style={{
          padding: "50px 20px",
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            letterSpacing: "1px",
            color: "#00e5ff",
            marginBottom: "10px",
          }}
        >
          🏆 Shanmuga Industries Arts and Science College
        </h1>
        <p style={{ fontSize: "1.4rem", color: "#ffffffb3" }}>
          Celebrating the Champions: Sports Achievers by Batch
        </p>
      </header>

      {/* Batch Cards */}
      <main style={{ padding: "40px 20px", flex: 1 }}>
        {batches.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "30px",
              margin: "30px auto",
              maxWidth: "700px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.15)",
              transition: "transform 0.3s ease",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "20px",
                color: "#00e5ff",
              }}
            >
              🎖 {item.batch}
            </h2>
            <a
              href={item.pdf}
              download
              style={{
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: "50px",
                fontWeight: 600,
                fontSize: "16px",
                color: "#fff",
                background:
                  "linear-gradient(135deg, #00e5ff, #00b8d4, #00acc1)",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.6)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              ⬇ Download Record
            </a>
          </div>
        ))}

        {/* Back Button */}
        <div style={{ textAlign: "center" }} data-aos="fade-up">
          <button
            onClick={() => window.location.href = "/"}
            style={{
              marginTop: "50px",
              padding: "12px 32px",
              fontSize: "16px",
              background: "linear-gradient(to right, #1de9b6, #00e5ff)",
              color: "#000",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.6)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ⬅ Back to Home
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "20px 0",
          textAlign: "center",
          color: "#999",
          fontSize: "14px",
          letterSpacing: "0.5px",
          boxShadow: "0 -2px 10px rgba(0, 255, 255, 0.1)",
        }}
      >
        © 2025 Shanmuga Industries Arts and Science College. All Rights Reserved.
      </footer>
    </div>
  );
};

export default SportsPersonspage;
