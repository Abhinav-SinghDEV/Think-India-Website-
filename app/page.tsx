"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Home() {
const [showSplash, setShowSplash] = useState(true);

const navLinks = ["Home", "About Us", "Events", "Team", "Contact Us"];

return (
<main style={{ minHeight: "100vh", position: "relative", backgroundColor: "#000000", backgroundImage: "radial-gradient(circle at 50% 50%, #151515 0%, #000000 100%)", color: "#ffffff", fontFamily: "sans-serif" }}>

  <AnimatePresence>
    {showSplash && (
      <SplashScreen onComplete={() => setShowSplash(false)} />
    )}
  </AnimatePresence>

  {!showSplash && (
    <div>
      
      
      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "rgba(0,0,0,0.8)", padding: "1.5rem 4rem", zIndex: 40, backdropFilter: "blur(10px)", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
         

         <div style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
            <img 
               src="/logo.png" 
               alt="Think India Logo" 
               style={{ height: "3rem", width: "auto", objectFit: "contain" }} 
               onError={(e) => e.currentTarget.style.display = 'none'} 
            />
            <div style={{ fontSize: "1.2rem", fontWeight: "900", letterSpacing: "0.1em", color: "#ffffff" }}>
               Think India NIT Silchar
            </div>
         </div>
        
         <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(" ", "-")}`} 
                style={{ color: "#ffffff", textTransform: "uppercase", fontSize: "0.875rem", fontWeight: "700", letterSpacing: "0.1em", cursor: "pointer", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseOver={(e) => e.currentTarget.style.color = "#22d3ee"} 
                onMouseOut={(e) => e.currentTarget.style.color = "#ffffff"}
              >
                {link}
              </a>
            ))}
         </div>
      </nav>
      
      {/* HERO SECTION - Reduced minHeight here */}
      <section id="home" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", padding: "2rem", marginTop: "4rem" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: "900", letterSpacing: "0.1em", color: "#ffffff", textTransform: "uppercase", textAlign: "center" }}>
          THINK INDIA
        </h1>
        
        <p style={{ marginTop: "1.5rem", color: "#22d3ee", fontFamily: "monospace", letterSpacing: "0.1em", maxWidth: "36rem", textAlign: "center", fontSize: "1rem" }}>
          [ CONNECTING THE BRIGHTEST MINDS OF THE NATION ]
        </p>
      </section>

      <section id="about-us" style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: "6rem 2rem", boxSizing: "border-box" }}>
        
        <h2 style={{ fontSize: "3rem", fontWeight: "900", letterSpacing: "0.2em", color: "#22d3ee", textTransform: "uppercase", marginBottom: "5rem", textAlign: "center" }}>
          ABOUT US
        </h2>

        <div style={{ width: "100%", maxWidth: "1000px", display: "flex", flexDirection: "column", gap: "4rem" }}>
          
          {/* Box 1: Introduction */}
          <div style={{ alignSelf: "flex-start", width: "80%", padding: "2.5rem", background: "rgba(34, 211, 238, 0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(34, 211, 238, 0.2)", borderRadius: "1rem", borderLeft: "4px solid #22d3ee", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.1em", color: "#ffffff", marginBottom: "1rem", textTransform: "uppercase" }}>
              INTRODUCTION
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.8", color: "#cccccc", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              THINK INDIA IS A PAN-INDIA INITIATIVE BRINGING TOGETHER THE BEST MINDS FROM PREMIER INSTITUTES LIKE IITS, IIMS, AIIMS, NLUS, AND NITS. WE ARE A DYNAMIC FORUM DESIGNED TO BIND THE STUDENTS OF NATIONAL INSTITUTES WITH A COMMON VISION OF NATION-BUILDING. BY CONNECTING BRIGHT, YOUNG MINDS ACROSS DIVERSE DISCIPLINES, WE AIM TO FOSTER A COLLABORATIVE ECOSYSTEM WHERE INNOVATIVE IDEAS TRANSCEND BOUNDARIES, EMPOWERING THE YOUTH TO BECOME CATALYSTS FOR POSITIVE AND LASTING CHANGE IN INDIA.
            </p>
          </div>

          {/* Box 2: What We Do */}
          <div style={{ alignSelf: "flex-end", width: "80%", padding: "2.5rem", background: "rgba(217, 70, 239, 0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(217, 70, 239, 0.2)", borderRadius: "1rem", borderRight: "4px solid #d946ef", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.1em", color: "#ffffff", marginBottom: "1rem", textTransform: "uppercase", textAlign: "right" }}>
              WHAT WE DO?
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.8", color: "#cccccc", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>
              WE CATALYZE INNOVATION AND LEADERSHIP THROUGH MULTIDISCIPLINARY COLLABORATION. OUR NETWORK ORGANIZES NATIONAL-LEVEL CONCLAVES, SYMPOSIUMS, INTERNSHIPS, AND SOCIAL INITIATIVES THAT BRIDGE THE GAP BETWEEN ACADEMIA AND REAL-WORLD GOVERNANCE. FROM POLICY DRAFTING AND TECHNICAL INNOVATION TO GRASSROOTS SOCIAL WORK, WE EQUIP STUDENTS WITH THE PLATFORM TO APPLY THEIR KNOWLEDGE, DRIVING IMPACTFUL SOLUTIONS FOR THE NATION'S MOST PRESSING CHALLENGES.
            </p>
          </div>

          {/* Box 3: Our Goal */}
          <div style={{ alignSelf: "flex-start", width: "80%", padding: "2.5rem", background: "rgba(249, 115, 22, 0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(249, 115, 22, 0.2)", borderRadius: "1rem", borderLeft: "4px solid #f97316", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.1em", color: "#ffffff", marginBottom: "1rem", textTransform: "uppercase" }}>
              OUR GOAL
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.8", color: "#cccccc", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              OUR ULTIMATE GOAL IS TO FORGE AN UNBREAKABLE NETWORK OF BRILLIANCE BY FACILITATING SEAMLESS INTERACTION AMONG STUDENTS FROM INDIA'S PREMIER INSTITUTES. WE STRIVE TO BREAK DOWN INSTITUTIONAL SILOS, ENCOURAGING CROSS-DISCIPLINARY DIALOGUES THAT SPARK REVOLUTIONARY IDEAS. BY NURTURING THESE SYNERGIES, WE CULTIVATE A GENERATION OF VISIONARY LEADERS WHO ARE UNITED IN THEIR COMMITMENT TO PROPELLING INDIA TOWARDS UNPRECEDENTED GROWTH AND GLOBAL PROMINENCE.
            </p>
          </div>

        </div>
      </section>

    </div>
  )}
</main>


);
}
