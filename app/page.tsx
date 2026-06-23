"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import SplashScreen from "@/components/ui/SplashScreen";
import TeamCard from "@/components/ui/TeamCard";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  // State to track the current page view
  const [currentPage, setCurrentPage] = useState("home");

  // Form State for Contact Us
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Navigation Links
  const navLinks = [
    { name: "Home", action: () => setCurrentPage("home") },
    { name: "About Us", action: () => setCurrentPage("about") },
    { name: "Events", action: () => setCurrentPage("events") },
    { name: "Team", action: () => setCurrentPage("team") },
    { name: "Contact Us", action: () => setCurrentPage("contact") },
  ];

  // Handle Form Submission via Web3Forms
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e1185f1a-f92c-4103-bd17-d5e94573ac8d", // Your unique key is now integrated
          subject: "New Message from Think India Website",
          from_name: "Think India Website Contact Form",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", cursor: "pointer" }} onClick={() => setCurrentPage("home")}>
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
                  style={{
                    color: currentPage === link.name.toLowerCase().replace(" us", "") ? "#FF9933" : "#ffffff",
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    fontWeight: "800",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </nav>

          {/* PAGE ROUTING LOGIC */}

          {/* 1. HOME VIEW */}
          {currentPage === "home" && (
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
                  <button onClick={() => setCurrentPage("contact")} style={{ padding: "1.2rem 2.5rem", backgroundColor: "#FF9933", border: "none", borderRadius: "0.5rem", fontWeight: "bold", color: "#fff", cursor: "pointer", fontSize: "1.1rem" }}>Join Our Mission</button>
                  <button onClick={() => setCurrentPage("about")} style={{ padding: "1.2rem 2.5rem", backgroundColor: "#138808", border: "none", borderRadius: "0.5rem", fontWeight: "bold", color: "#fff", cursor: "pointer", fontSize: "1.1rem" }}>Learn More</button>
                </div>
              </div>
            </section>
          )}

          {/* 2. ABOUT US VIEW */}
          {currentPage === "about" && (
            <section style={{ minHeight: "100vh", padding: "10rem 2rem 6rem", background: "#FCE5C9" }}>
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
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "180px", height: "180px", opacity: 0.12, pointerEvents: "none", zIndex: 0 }}>
                          <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="1">
                            <circle cx="50" cy="50" r="48" />
                            <circle cx="50" cy="50" r="10" />
                            {[...Array(24)].map((_, i) => (
                              <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                            ))}
                          </svg>
                        </div>
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
          )}

          {/* 3. CONTACT US VIEW */}
          {currentPage === "contact" && (
            <section style={{ minHeight: "100vh", backgroundColor: "#0b162c", color: "#ffffff", padding: "10rem 4rem 4rem" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
                <div>
                  <h1 style={{ fontSize: "3rem", fontWeight: "900" }}>GET IN TOUCH</h1>
                  <div style={{ height: "4px", width: "100px", background: "linear-gradient(90deg, #FF9933 33%, #FFFFFF 33% 66%, #138808 66%)", margin: "1rem 0 2rem" }}></div>
                  <p style={{ color: "#9ca3af", marginBottom: "3rem", lineHeight: "1.6", fontSize: "1.1rem" }}>
                    Interested in joining us but do not know where to start? Do you have a mind-blowing idea that you need help with? Reach out to us, we are happy to help!
                  </p>
                  <p style={{ fontWeight: "700", marginBottom: "1.5rem", fontSize: "1.2rem" }}>Connect On</p>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <a href="https://www.instagram.com/thinkindianits/" target="_blank" rel="noopener noreferrer" style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.8rem", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(255,255,255,0.15)", textDecoration: "none" }}><FaInstagram /></a>
                    <a href="https://www.facebook.com/ThinkindiaNITS/" target="_blank" rel="noopener noreferrer" style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.8rem", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(255,255,255,0.15)", textDecoration: "none" }}><FaFacebookF /></a>
                    <a href="https://www.linkedin.com/company/thinkindianits/" target="_blank" rel="noopener noreferrer" style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.8rem", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(255,255,255,0.15)", textDecoration: "none" }}><FaLinkedinIn /></a>
                  </div>
                </div>
                <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "2.5rem", borderRadius: "1rem", color: "#1a1a1a", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>Your Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", outline: "none" }} />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>Your Email ID *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", outline: "none" }} />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>Drop your Message *</label>
                    <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", outline: "none", resize: "vertical" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button type="submit" disabled={isSubmitting} style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: isSubmitting ? "#9ca3af" : "#1a1a1a", color: "#ffffff", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginTop: "1rem", transition: "background-color 0.3s" }}>{isSubmitting ? "..." : "→"}</button>
                    {submitStatus === "success" && <span style={{ color: "#15803d", fontWeight: "bold", marginTop: "1rem" }}>Message sent successfully!</span>}
                    {submitStatus === "error" && <span style={{ color: "#ef4444", fontWeight: "bold", marginTop: "1rem" }}>Failed to send. Please try again.</span>}
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* 4. EVENTS VIEW */}
          {currentPage === "events" && (
            <section style={{ minHeight: "100vh", padding: "9rem 2rem 6rem", background: "linear-gradient(180deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)", position: "relative", overflow: "hidden" }}>

              {/* Left rotating Ashoka Chakra */}
              {/* <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                style={{ position: "absolute", left: "-10%", top: "10%", width: "600px", height: "600px", opacity: 0.15, pointerEvents: "none" }}
              >
                <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="48" />
                  <circle cx="50" cy="50" r="10" />
                  {[...Array(24)].map((_, i) => (
                    <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                  ))}
                </svg>
              </motion.div> */}

              {/* Right counter-rotating Ashoka Chakra */}
              {/* <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                style={{ position: "absolute", right: "-10%", top: "10%", width: "600px", height: "600px", opacity: 0.15, pointerEvents: "none" }}
              >
                <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="48" />
                  <circle cx="50" cy="50" r="10" />
                  {[...Array(24)].map((_, i) => (
                    <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                  ))}
                </svg>
              </motion.div> */}

              <div style={{ maxWidth: "950px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* ========= UPCOMING EVENTS ========= */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ marginBottom: "5rem" }}
                >
                  {/* Section heading */}
                  <div style={{ marginBottom: "2.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.25em", color: "#c45c00", textTransform: "uppercase", margin: "0 0 0.5rem" }}>What's Coming</p>
                    <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", color: "#1a1a1a", margin: "0 0 0.15rem", lineHeight: 1 }}>UPCOMING</h2>
                    <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", color: "#000000ff", margin: "0", lineHeight: 1 }}>EVENTS</h2>
                    <div style={{ height: "4px", width: "140px", background: "linear-gradient(90deg, #FF9933 33%, #1a1a1a 33% 66%, #138808 66%)", borderRadius: "2px", marginTop: "1rem" }} />
                  </div>

                  {/* Event list */}
                  <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.08)" }}>
                    {[
                      { day: "SAT", date: "12/07", title: "National Conclave on Policy Reforms", desc: "Keynote by Dr. Arvind Sharma", shade: "rgba(255,153,51,0.35)" },
                      { day: "SUN", date: "20/07", title: "Tech & Governance Workshop", desc: "with Prof. Meena Krishnan", shade: "rgba(255,153,51,0.2)" },
                      { day: "FRI", date: "01/08", title: "Think India NIT Silchar Annual Meet", desc: "Open to all Chapter Members", shade: "rgba(255,255,255,0.55)" },
                      { day: "SAT", date: "16/08", title: "Independence Day Special Debate", desc: "Panel of Student Leaders Across India", shade: "rgba(19,136,8,0.12)" },
                    ].map((ev, i) => (
                      <div
                        key={i}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.filter = "brightness(0.94)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.filter = "brightness(1)"}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "1.5rem 2rem",
                          background: ev.shade,
                          borderBottom: "1px solid rgba(0,0,0,0.07)",
                          gap: "1.75rem",
                          cursor: "pointer",
                          transition: "filter 0.2s ease",
                        }}
                      >
                        {/* Date block */}
                        <div style={{ minWidth: "60px", textAlign: "center", flexShrink: 0 }}>
                          <div style={{ fontSize: "0.65rem", fontWeight: "800", letterSpacing: "0.12em", color: "#555", textTransform: "uppercase" }}>{ev.day}</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: "900", color: "#c45c00", lineHeight: 1.1 }}>{ev.date}</div>
                        </div>

                        {/* Tricolor vertical bar */}
                        <div style={{ width: "4px", height: "48px", background: "linear-gradient(180deg, #FF9933 33%, #1a1a1a 33% 66%, #138808 66%)", borderRadius: "2px", flexShrink: 0 }} />

                        {/* Text */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#1a1a1a" }}>{ev.title}</div>
                          <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "0.2rem" }}>{ev.desc}</div>
                        </div>

                        {/* Chevron */}
                        <div style={{ fontSize: "1.5rem", color: "rgba(0,0,0,0.25)", flexShrink: 0 }}>›</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ========= PAST EVENTS ========= */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Section heading */}
                  <div style={{ marginBottom: "2.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.25em", color: "#0a5c04", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Our Legacy</p>
                    <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", color: "#1a1a1a", margin: "0 0 0.15rem", lineHeight: 1 }}>PAST</h2>
                    <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", color: "#138808", margin: "0", lineHeight: 1 }}>EVENTS</h2>
                    <div style={{ height: "4px", width: "140px", background: "linear-gradient(90deg, #138808 33%, #1a1a1a 33% 66%, #FF9933 66%)", borderRadius: "2px", marginTop: "1rem" }} />
                  </div>

                  {/* Past events grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                    {[
                      { title: "Think India Annual Conclave 2024", date: "15 Nov 2024", tag: "Conclave", count: "200+" },
                      { title: "Young India Leadership Summit", date: "3 Sep 2024", tag: "Summit", count: "150+" },
                      { title: "Policy Hackathon NIT Silchar", date: "18 Jul 2024", tag: "Hackathon", count: "80+" },
                      { title: "Bharat Bodh Quiz Competition", date: "26 Jan 2024", tag: "Quiz", count: "300+" },
                      { title: "Governance & Democracy Workshop", date: "5 Dec 2023", tag: "Workshop", count: "60+" },
                      { title: "Nation Builders Orientation 2023", date: "12 Aug 2023", tag: "Orientation", count: "120+" },
                    ].map((ev, i) => (
                      <div
                        key={i}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.18)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
                        style={{
                          padding: "4px",
                          borderRadius: "0.75rem",
                          background: "linear-gradient(135deg, #FF9933 33%, #ffffff 33% 66%, #138808 66%)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                          transition: "transform 0.25s ease, box-shadow 0.25s ease",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ backgroundColor: "rgba(255,255,255,0.92)", borderRadius: "0.5rem", padding: "1.5rem", position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box", backdropFilter: "blur(8px)" }}>

                          {/* Tag pill */}
                          <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", background: "rgba(255,153,51,0.15)", border: "1px solid rgba(255,153,51,0.4)", borderRadius: "999px", fontSize: "0.65rem", fontWeight: "800", color: "#c45c00", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{ev.tag}</div>

                          <div style={{ fontSize: "1rem", fontWeight: "800", color: "#1a1a1a", lineHeight: 1.45, marginBottom: "1.25rem" }}>{ev.title}</div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "0.78rem", color: "#888" }}>{ev.date}</div>
                            <div style={{ fontSize: "0.78rem", color: "#138808", fontWeight: "700" }}>{ev.count} attended</div>
                          </div>

                          {/* Corner watermark */}
                          <div style={{ position: "absolute", bottom: "-18px", right: "-18px", width: "80px", height: "80px", opacity: 0.08, pointerEvents: "none" }}>
                            <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="2">
                              <circle cx="50" cy="50" r="48" />
                              <circle cx="50" cy="50" r="10" />
                              {[...Array(24)].map((_, j) => (
                                <line key={j} x1="50" y1="50" x2={50 + 48 * Math.cos(j * Math.PI / 12)} y2={50 + 48 * Math.sin(j * Math.PI / 12)} />
                              ))}
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </section>
          )}

          {/* 5. TEAM VIEW */}
          {currentPage === "team" && (
            <section style={{ minHeight: "100vh", padding: "9rem 2rem 6rem", background: "#FCE5C9", position: "relative", overflow: "hidden" }}>

              {/* Background Ashoka Chakra watermark */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "700px", opacity: 0.05, pointerEvents: "none", zIndex: 0 }}>
                <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="0.6">
                  <circle cx="50" cy="50" r="48" />
                  <circle cx="50" cy="50" r="10" />
                  {[...Array(24)].map((_, i) => (
                    <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                  ))}
                </svg>
              </div>

              <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "3.2rem", fontWeight: "900", color: "#2d2a25", margin: 0 }}>Meet Our Team</h2>
                  <div style={{ height: "5px", width: "120px", background: "linear-gradient(90deg, #FF9933 33%, #FFFFFF 33% 66%, #138808 66%)", margin: "1rem auto 0", borderRadius: "3px" }} />
                </div>
                <p style={{ textAlign: "center", color: "#5a5550", fontSize: "1.05rem", maxWidth: "650px", margin: "0 auto 3.5rem", lineHeight: 1.7, fontWeight: 500 }}>
                  The passionate minds behind Think India NIT Silchar — driven by a vision of a stronger, united, and intellectually vibrant nation.
                </p>

                {/* Card Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
                  {[
                    { name: "Aarav Mehta", role: "President", quote: "Leadership is service to the nation. Every step we take at Think India is a step toward a stronger Bharat.", initials: "AM", color: "#FF9933" },
                    { name: "Priya Sharma", role: "Vice President", quote: "Empowering young minds is the most powerful investment we can make for India's future.", initials: "PS", color: "#138808" },
                    { name: "Rohan Das", role: "Secretary", quote: "Organisation and clarity are the backbone of every great movement. I strive to keep ours strong.", initials: "RD", color: "#000080" },
                    { name: "Sneha Iyer", role: "Technical Head", quote: "Technology and patriotism are not separate — we can code our way to nation-building.", initials: "SI", color: "#FF9933" },
                    { name: "Kabir Singh", role: "Events Head", quote: "Every event we organise plants a seed of national consciousness in another young mind.", initials: "KS", color: "#138808" },
                    { name: "Ananya Bose", role: "Design Head", quote: "Great design communicates ideas across barriers. Our identity must inspire at first glance.", initials: "AB", color: "#000080" },
                    { name: "Vikram Nair", role: "Outreach Head", quote: "Change begins when conversations spread. Outreach is how we turn ideas into movements.", initials: "VN", color: "#FF9933" },
                    { name: "Diya Patel", role: "Social Media Head", quote: "A single story, shared widely, can shift perspectives across the country.", initials: "DP", color: "#138808" },
                  ].map((member, idx) => (
                    <TeamCard key={idx} member={member} />
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      )}
    </main>
  );
}