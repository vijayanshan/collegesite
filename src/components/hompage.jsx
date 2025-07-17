import React, { useEffect, useRef, useState } from 'react';
import '../components/css/homepage.css';
import bodybg from '../components/assets/bodybg.jpg';
import bg1 from '../components/assets/bg1.jpeg';
import bg2 from '../components/assets/bg2.jpg';
import bg3 from '../components/assets/bg3.jpg';
import bg4 from '../components/assets/bg4.jpeg';
import bg5 from '../components/assets/bg5.jpg';
import bg6 from '../components/assets/bg6.jpeg';
import bg7 from '../components/assets/bg7.jpg';
import bg8 from '../components/assets/bg8.jpeg';
import bg9 from '../components/assets/bg9.jpeg';
import prefooterimage from '../components/assets/download.jpeg';
import student_icon from '../components/assets/student_icon.png';
import staff_icon from '../components/assets/staff_icon.png';
import header_icon from '../components/assets/header_icon.png';
import OfflineForms from "../components/offline_forms";
import SportsPersonPage from"../components/sport";  
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

import CountUp from 'react-countup';
import {
  FaGraduationCap,
  FaUserGraduate,
  FaBookOpen,
  FaUsers,
  FaChalkboardTeacher,
  FaUserTie,
  FaUserCog,
} from 'react-icons/fa';
import secretaryImage from "../components/assets/faculty/secretary.jpg";
import principalImage from "../components/assets/faculty/principal.jpg";
import chairmanImage from "../components/assets/faculty/chairman.jpg";
import treasurerImage from "../components/assets/faculty/treasurer.jpg";
import dean from "../components/assets/faculty/dean.jpg"

const HomePage = () => {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const legacySliderRef = useRef(null);
  const [legacyIndex, setLegacyIndex] = useState(0);

  const handleStaffLogin = () => navigate('/LoginFormstaff');
  const handleStudentLogin = () => navigate('/LoginForm');
  const handleOfflineForms = () => navigate('/offline_forms')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 3) % 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideWidth = sliderRef.current?.clientWidth / 1;
    if (sliderRef.current && slideWidth) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLegacyIndex(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (legacySliderRef.current) {
      const slideWidth = legacySliderRef.current.clientWidth / 4;
      legacySliderRef.current.scrollTo({
        left: legacyIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [legacyIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const dotStyle = isActive => ({
    height: '12px',
    width: '12px',
    margin: '0 5px',
    backgroundColor: isActive ? '#f1c40f' : 'transparent',
    borderRadius: '50%',
    border: '2px solid #f1c40f',
    display: 'inline-block',
    transition: 'background-color 0.3s ease'
  });

  const legacyCards = [
    {
      title: "SECRETARY SPEAKS",
      name: "Mr. L. VIJAY ANAND B.COM.",
      dept: "SECRETARY & CORRESPONDENT",
      quote: "Education is the most powerful tool...",
      img: secretaryImage
    },
    {
      title: "PRINCIPAL SPEAKS",
      name: "Dr. K. Anandaraj",
      dept: "PRINCIPAL",
      quote: "‘Education is the route of enlightment’",
      img: principalImage
    },
    {
      title: "CHAIRMAN SPEAKS",
      name: "Mr. M.N. PALANI",
      dept: "CHAIRMAN",
      quote: "Leading with vision and dedication...",
      img: chairmanImage
    },
    {
      title: "TREASURER SPEAKS",
      name: "Mr. E. SRIDHAR",
      dept: "TREASURER",
      quote: "Guiding growth with purpose and understanding.",
      img: treasurerImage
    }, {
      title: "Academic Dean SPEAKS",
      name: "Prof. A.L. UDAYAPPAN, M.Sc., M.Phil., F.I.C.S",
      dept: "Academic Dean",
      quote: "Education is the route of enlightmen.",
      img: dean
    }, {
      title: "TREASURER SPEAKS",
      name: "Mr. E. SRIDHAR",
      dept: "TREASURER",
      quote: "Guiding growth with purpose and understanding.",
      img: treasurerImage
    }, {
      title: "TREASURER SPEAKS",
      name: "Mr. E. SRIDHAR",
      dept: "TREASURER",
      quote: "Guiding growth with purpose and understanding.",
      img: treasurerImage
    }

  ];

  return (
    <>  
      <div className="top-header-bar">
        <div>
          <a href="#">About Us</a>
           <a href="SportsPersonPage"> Sports </a>
          <a href="#Programmes-Offered">Programmes Offered</a>
          <a href="OfflineForms">Offline Leave Forms</a>
          <a href="#contact-section">Contact</a>

        </div>
      </div>

      <header className="header-container">
        <img src={header_icon} alt="College Header" className="header-image" />
      </header>

      <div style={{
        backgroundColor: '#fff',
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center'
      }}>

        <marquee direction="left" scrollamount="5" src={require('../components/assets/newIcon.png')} style={{ color: 'darkblue', fontSize: '16px' }}>
          ⚠   மாணவர்கள் விடுமுறைக்கு விண்ணப்பிக்க கீழே  உள்ள  STUDENT LOGINயை  கிளிக் செய்யவும்  !  |     Students, Please Click on the STUDENT LOGIN below to Apply for Leave.!      ||     ⚠     2025 - 2026 ஆம் கல்வி ஆண்டிற்கான மாணவர்கள் சேர்க்கை நடை பெறுகிறது. மேலும் தகவல்களுக்கு தலைமை அலுவலகத்தை தொடர்பு கொள்ளவும்.
        </marquee>

      </div>


      <div
        className="login-section"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '200px',
          margin: '5px 0',
          backgroundImage: `url(${bodybg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '100px 0', // optional, for spacing
        }}
      >
        <div className="login-box">
          <button className="login-btn student-btn" onClick={handleStudentLogin}>
            <img src={student_icon} alt="Student Icon" />
          </button>
          <div className="login-label">STUDENT LOGIN</div>
        </div>
        <div className="login-box">
          <button className="login-btn staff-btn" onClick={handleStaffLogin}>
            <img src={staff_icon} alt="Staff Icon" />
          </button>
          <div className="login-label">STAFF LOGIN</div>
        </div>
      </div>


      <div style={{}}>
        <div style={{}}>

        </div>

        <div className='collge-summary'>
          {/* Left: College Info Summary */}
          <div style={{ flex: '0 0 30%', paddingRight: '20px' }}>
            <h3 style={{ color: 'dark red' }}>College Summary</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
              SIASC is one among the leading institutions in the country to have been awarded with ISO 9001: 2000 certificates in recognition of its quality standards and Certified under section 2(f) & 12B of the UGC Act 1956. SIASC is permanently affiliated to Thiruvalluvar University. We feel proud to provide such good education which will serve as a vision and a mission for the student’s future. Definitely, the opportunities for their career will change their life forever. It trumps their looks, wealth and skills. By getting our education, our students will be opening so many doors for their shining future.
            </p>
          </div>

          {/* Right: Slider - 70% of width */}
          <div style={{
            flex: '0 0 70%',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '40px',
            overflow: 'hidden',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div className="slider" style={{
              width: '100%',
              overflow: 'hidden',
              borderRadius: '12px',
            }}>
              <div
                className="slider-wrapper"
                ref={sliderRef}
                style={{
                  display: 'flex',
                  transition: 'transform 1s ease-in-out',
                }}
              >
                <img src={bg1} alt="Slide 1" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg2} alt="Slide 2" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg3} alt="Slide 3" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg4} alt="Slide 4" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg5} alt="Slide 5" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg6} alt="Slide 6" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg7} alt="Slide 7" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg8} alt="Slide 8" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />
                <img src={bg9} alt="Slide 9" className="slider-image" style={{ width: '100%', flexShrink: 0 }} />

              </div>
            </div>
            <div className="slider-dots" style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <span key={i} style={dotStyle(i === currentIndex)} />)}
            </div>
          </div>
        </div>
      </div>

   

      <div ref={statsRef} className="full-width-stats">
        <div className="stat-item">
          <FaGraduationCap size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={24} duration={8} />}+</h2>
          <p>UG Programs</p>
        </div>
        <div className="stat-item">
          <FaUserGraduate size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={21} duration={6} />}+</h2>
          <p>PG Programs</p>
        </div>
        <div className="stat-item">
          <FaBookOpen size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={15} duration={7} />}+</h2>
          <p>PhD Programs</p>
        </div>
        <div className="stat-item">
          <FaUsers size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={9244} duration={6} />}+</h2>
          <p>Students</p>
        </div>
        <div className="stat-item">
          <FaChalkboardTeacher size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={434} duration={7} />}+</h2>
          <p>Faculty Members</p>
        </div>
        <div className="stat-item">
          <FaUserTie size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={250} duration={7} />}+</h2>
          <p>Faculty With Ph.D</p>
        </div>
        <div className="stat-item">
          <FaUserCog size={30} style={{ marginBottom: '10px' }} />
          <h2>{startCount && <CountUp end={191} duration={7} />}+</h2>
          <p>Administrative Staff</p>
        </div>
      </div>


      {/* Legacy Section */}
      <div className="legacy-container">
        <h2 className="legacy-heading">Legacy of SIASC</h2>
        <div className="legacy-slider-wrapper" ref={legacySliderRef} style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: '30px', padding: '20px' }}>
          {legacyCards.map((card, index) => (
            <div key={index} className="legacy-card" style={{
              minWidth: '300px',
              background: 'linear-gradient(135deg,rgba(68, 6, 6, 0.92),rgb(10, 26, 105))', // Cyan Blue
              color: '#ffffff',
              padding: '20px',
              borderRadius: '10px',
              scrollSnapAlign: 'start',
              flexShrink: 0
            }}>
              <h5>{card.title}</h5>
              <img src={card.img} alt={card.name} style={{ borderRadius: '100%', width: '120px', height: '160', objectFit: 'cover', margin: '0px auto' }} />
              <h4>{card.name}</h4>
              <p style={{ fontStyle: 'bold', fontSize: '16px' }}>{card.dept}</p>
              <p style={{ marginTop: '10px' }}>{card.quote}</p>
              <div style={{ color: '#ffffff', marginTop: '5px' }}>⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          {legacyCards.map((_, i) => <span key={i} style={dotStyle(i === legacyIndex)} />)}
        </div>
      </div>



      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>SIASC Events</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>

          {/* Video Box 1 */}
          <iframe
            width="360"
            height="215"
            src="https://www.youtube.com/embed/BwturvXp9dc"
            title="YouTube video 1"
            style={{ border: 'none', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Video Box 2 */}
          <iframe
            width="360"
            height="215"
            src="https://www.youtube.com/embed/MfP-Cd1oxn0?start=5964"
            title="YouTube video 2"
            style={{ border: 'none', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Video Box 3 */}
          <iframe
            width="360"
            height="215"
            src="https://www.youtube.com/embed/G92-VQH6Acw?start=2953"
            title="YouTube video 3"
            style={{ border: 'none', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>
      </div>


      <div className="pre-footer" style={{
        backgroundColor: '#f9f1ff',

        padding: '10px',
        textAlign: 'center',

      }}>
        <h3 style={{ color: '#6a1b9a', fontWeight: 'bold' }}>Stay Connected with SIASC</h3>
        <p>Follow us on social media and stay updated with our latest news and updates.</p>
        <div style={{ fontSize: '1.8rem', display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <a href="#" style={{ color: '#4267B2' }}><FaFacebookF /></a>
          <a href="#" style={{ color: '#1DA1F2' }}><FaTwitter /></a>
          <a href="#" style={{ color: '#E1306C' }}><FaInstagram /></a>
          <a href="#" style={{ color: '#FF0000' }}><FaYoutube /></a>
        </div>
      </div>


      <div className="social-sidebar">
        <a href="https://facebook.com" className="facebook" target="_blank" rel="noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" className="twitter" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com" className="linkedin" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
        <a href="https://youtube.com" className="youtube" target="_blank" rel="noreferrer"><FaYoutube /></a>
        <a href="https://instagram.com" className="instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
      </div>

      
      {/* Pre-footer area */}
      <div
        style={{
          backgroundColor: 'rgba(10, 25, 102, 0.85)',
          backgroundImage: `url(${prefooterimage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          color: '#fff',
          padding: '40px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        {/* Courses / Departments */}
        <div style={{ flex: '1 1 200px' }}>
          <h2>Courses</h2>
          <p>Master of Computer Application</p>
          <p>M.Sc. Computer Science</p>
          <p>M.Sc. Mathematics</p>
          <p>M.Sc. Physics</p>
          <p>M.A. English Literature</p>
          <p>M.A. Tamil</p>
          <p>B.Com</p>
          <p>BBA</p>
          <p>BCA</p>
          <p>B.Sc. Computer Science</p>
          <p>B.Sc. Biochemistry</p>
          <p>B.Sc. Microbiology</p>
        </div>

        {/* Centers & Clubs */}
        <div style={{ flex: '1 1 200px' }}>
          <h2>Centers &amp; Clubs</h2>
          <p>NSS</p>
          <p>YRC / RRC</p>
          <p>Placement Cell</p>
          <p>IQAC</p>
          <p>Research &amp; Development</p>
        </div>

        {/* Leadership */}
        <div style={{ flex: '1 1 200px' }}>
          <h2>Leadership</h2>
          <p><strong>Dr. K. Anandaraj</strong><br/>Principal</p>
          <p><strong>Dr. P. Murugan</strong><br/>IQAC Co-Ordinator</p>
          <p><strong>Dr. K. Annamalai</strong><br/>Vice Principal</p>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1 1 250px' }}>
          <h2>Contact</h2>
          <p>Shanmuga Industries Arts and Science College</p>
          <p>Mathur, Tiruvannamalai – 606603</p>
          <p>Phone: +91 04175 - 236654, 235295</p>
          <p>
            Email: <a href="mailto:shanmugacollege@gmail.com" style={{ color: '#00d8ff' }}>
              shanmugacollege@gmail.com
            </a>
          </p>
        </div>

        {/* Google Map */}
    {/* Google Map */}
<div style={{ flex: '1 1 300px', minWidth: '300px', height: '250px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d499233.41828076215!2d78.55407207098813!3d12.162620288579689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacbf7be57a0c05%3A0x2759a1bfa19d370d!2sShanmuga%20Industries%20Arts%20%26%20Science%20College!5e0!3m2!1sen!2sin!4v1749615595507!5m2!1sen!2sin"
    width="600"
    height="450"
    style={{ border: 0 }} // ✅ fixed here
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      </div>

      {/* Footer Bottom Bar */}
      <div style={{ backgroundColor: '#000d2e', color: '#bbb', textAlign: 'center', padding: '15px', fontSize: '14px' }}>
        © 2025 Shanmuga Industries Arts and Science College, Tiruvannamalai. All Rights Reserved.
      </div>
      <div style={{ backgroundColor: '#00264d', color: '#fff', textAlign: 'center', padding: '10px', fontSize: '14px' }}>
        Maintained by MCA DEP
      </div>
    </>
  );
};

export default HomePage;