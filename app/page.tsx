"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  const navLinks = [
    { name: "Home", action: () => setCurrentPage("home") },
    { name: "About Us", action: () => { 
        setCurrentPage("home"); 
        setTimeout(() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }), 100); 
    }},
    { name: "Events", action: () => {} },
    { name: "Team", action: () => {} },
    { name: "Contact Us", action: () => setCurrentPage("contact") },
  ];

  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "#000000", color: "#ffffff", fontFamily: "sans-serif" }}>
      
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div>
          
          {/* NAVIGATION BAR */}
          <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", borderBottom: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(50, 30, 0, 0.7)", padding: "1rem 4rem", zIndex: 40, backdropFilter: "blur(15px)", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
             
             <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <img 
                   src="/logo.png" 
                   alt="Think India Logo" 
                   style={{ height: "4rem", width: "auto", objectFit: "contain" }} 
                   onError={(e) => e.currentTarget.style.display = 'none'} 
                />
                <div style={{ fontSize: "1.4rem", fontWeight: "900", letterSpacing: "0.05em", color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                   Think India NIT Silchar
                </div>
             </div>

             <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                {navLinks.map((link) => (
                  <button 
                    key={link.name} 
                    onClick={link.action}
                    style={{ color: "#ffffff", textTransform: "uppercase", fontSize: "0.9rem", fontWeight: "800", letterSpacing: "0.1em", textDecoration: "none", transition: "color 0.3s ease", textShadow: "0 1px 2px rgba(0,0,0,0.3)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {link.name}
                  </button>
                ))}
             </div>
          </nav>
          
          {/* PAGE ROUTING */}
          {currentPage === "home" ? (
            <>
              {/* TRICOLOR HERO SECTION */}
              <section id="home" style={{ 
                height: "100vh", 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center",
                padding: "0 2rem", 
                background: "linear-gradient(180deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
                position: "relative",
                overflow: "hidden"
              }}>
                
                {/* Left Chakra */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                   style={{ position: "absolute", left: "-10%", width: "600px", height: "600px", opacity: 0.15, pointerEvents: "none" }}
                >
                   <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="0.5">
                      <circle cx="50" cy="50" r="48" />
                      <circle cx="50" cy="50" r="10" />
                      {[...Array(24)].map((_, i) => (
                        <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                      ))}
                   </svg>
                </motion.div>

                {/* Right Chakra */}
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                   style={{ position: "absolute", right: "-10%", width: "600px", height: "600px", opacity: 0.15, pointerEvents: "none" }}
                >
                   <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="0.5">
                      <circle cx="50" cy="50" r="48" />
                      <circle cx="50" cy="50" r="10" />
                      {[...Array(24)].map((_, i) => (
                        <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                      ))}
                   </svg>
                </motion.div>

                <div style={{ zIndex: 1, color: "#333", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h1 style={{ fontSize: "7rem", fontWeight: "900", lineHeight: 0.9 }}>
                    <span style={{ color: "#FF9933" }}>Think </span>
                    <span style={{ color: "#138808" }}>India</span>
                  </h1>
                  <p style={{ fontSize: "1.5rem", maxWidth: "50rem", marginTop: "1.5rem", lineHeight: 1.6, fontWeight: "500" }}>
                    A pan-India initiative empowering students with a 'Nation First' mindset. Join the country's brightest young minds in nation-building and intellectual engagement.
                  </p>
                  <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem" }}>
                    <button style={{ padding: "1.2rem 2.5rem", backgroundColor: "#FF9933", border: "none", borderRadius: "0.5rem", fontWeight: "bold", color: "#fff", cursor: "pointer", fontSize: "1.1rem" }}>Join Our Mission</button>
                    <button style={{ padding: "1.2rem 2.5rem", backgroundColor: "#138808", border: "none", borderRadius: "0.5rem", fontWeight: "bold", color: "#fff", cursor: "pointer", fontSize: "1.1rem" }}>Learn More</button>
                  </div>
                </div>
              </section>

              {/* ABOUT US SECTION */}
              <section id="about-us" style={{ padding: "6rem 2rem", background: "#FCE5C9" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                  <h2 style={{ fontSize: "3.5rem", fontWeight: "900", color: "#2d2a25", textAlign: "center", marginBottom: "4rem" }}>About Us</h2>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    {[
                      { title: "Introduction", text: "Think India is a pan-India initiative bringing together the best minds from premier institutes. We are a dynamic forum designed to bind the students of national institutes with a common vision of nation-building." },
                      { title: "What We Do", text: "We catalyze innovation and leadership through multidisciplinary collaboration, organizing national-level conclaves and internships to bridge academia and reality." },
                      { title: "Our Goal", text: "Our goal is to forge an unbreakable network of brilliance by breaking down institutional silos, fostering visionary leaders committed to India's global prominence." }
                    ].map((item, idx) => (
                      <div key={idx} style={{ 
                        alignSelf: idx % 2 === 0 ? "flex-start" : "flex-end", 
                        width: "70%", 
                        padding: "0.5rem", 
                        borderRadius: "0.75rem", 
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        background: "linear-gradient(90deg, #FF9933 33%, #FFFFFF 33% 66%, #138808 66%)"
                      }}>
                        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", padding: "2rem", borderRadius: "0.25rem", position: "relative", overflow: "hidden" }}>
                          
                          {/* ASHOKA CHAKRA WATERMARK IN THE MIDDLE */}
                          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "180px", height: "180px", opacity: 0.12, pointerEvents: "none", zIndex: 0 }}>
                             <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="1">
                                <circle cx="50" cy="50" r="48" />
                                <circle cx="50" cy="50" r="10" />
                                {[...Array(24)].map((_, i) => (
                                  <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                                ))}
                             </svg>
                          </div>

                          {/* CONTENT */}
                          <div style={{ position: "relative", zIndex: 1 }}>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#2d2a25", marginBottom: "1rem" }}>{item.title}</h3>
                            <p style={{ color: "#2d2a25", fontSize: "1.1rem", fontWeight: "500", lineHeight: "1.6" }}>{item.text}</p>
                          </div>
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            
            /* CONTACT US SECTION */
            <section style={{ minHeight: "100vh", backgroundColor: "#0b162c", color: "#ffffff", padding: "10rem 4rem 4rem" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
                    
                    {/* Left Column: Text & Socials */}
                    <div>
                        <h1 style={{ fontSize: "3rem", fontWeight: "900" }}>GET IN TOUCH</h1>
                        <div style={{ height: "4px", width: "100px", background: "linear-gradient(90deg, #FF9933 33%, #FFFFFF 33% 66%, #138808 66%)", margin: "1rem 0 2rem" }}></div>
                        <p style={{ color: "#9ca3af", marginBottom: "3rem", lineHeight: "1.6", fontSize: "1.1rem" }}>
                            Interested in joining us but do not know where to start? Do you have a mind-blowing idea that you need help with? Reach out to us, we are happy to help!
                        </p>
                        <p style={{ fontWeight: "700", marginBottom: "1.5rem", fontSize: "1.2rem" }}>Connect On</p>
                        
                        {/* Circular Glowing Social Buttons using react-icons */}
                        <div style={{ display: "flex", gap: "1.5rem" }}>
                            <a 
                               href="https://www.instagram.com/thinkindianits/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.8rem", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(255,255,255,0.15)", textDecoration: "none" }}
                            >
                                <FaInstagram />
                            </a>
                            <a 
                               href="https://www.facebook.com/ThinkindiaNITS/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.8rem", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(255,255,255,0.15)", textDecoration: "none" }}
                            >
                                <FaFacebookF />
                            </a>
                            <a 
                               href="https://www.linkedin.com/company/thinkindianits/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.8rem", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(255,255,255,0.15)", textDecoration: "none" }}
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div style={{ backgroundColor: "#ffffff", padding: "2.5rem", borderRadius: "1rem", color: "#1a1a1a", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>Name</label>
                            <input type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", outline: "none" }} />
                        </div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>Email *</label>
                            <input type="email" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", outline: "none" }} />
                        </div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>Message *</label>
                            <textarea rows={5} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", outline: "none", resize: "vertical" }} />
                        </div>
                        <button style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: "#1a1a1a", color: "#ffffff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginTop: "1rem" }}>
                            →
                        </button>
                    </div>

                </div>
            </section>
          )}

        </div>
      )}
    </main>
  );
}