"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; 
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); 
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      style={{ 
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, 
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
        backgroundColor: "#000000" 
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4rem", width: "12rem", height: "12rem" }}>
        {/* Outer Rotating Hexagon */}
        <motion.div 
          style={{ position: "absolute", inset: 0, border: "1px solid rgba(34,211,238,0.3)", clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        
        {/* Inner Counter-Rotating Bracket */}
        <motion.div 
          style={{ position: "absolute", inset: "1rem", border: "2px dashed rgba(217,70,239,0.5)", borderRadius: "50%" }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        />

        {/* The Glowing Core */}
        <motion.div 
          style={{ width: "4rem", height: "4rem", backgroundColor: "#22d3ee", borderRadius: "50%", boxShadow: "0 0 40px rgba(34,211,238,0.8)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Terminal Text */}
      <div style={{ color: "#22d3ee", fontFamily: "monospace", fontSize: "1.25rem", letterSpacing: "0.3em", fontWeight: "bold", marginBottom: "1.5rem", textShadow: "0 0 8px rgba(34,211,238,0.8)" }}>
        LOADING...
      </div>

      {/* Progress Bar Container */}
      <div style={{ width: "16rem" }}>
        <div style={{ color: "rgba(34,211,238,0.8)", fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.1em", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
          <span>INITIALIZING SECURE PORTAL</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div style={{ height: "4px", width: "100%", backgroundColor: "#0f172a", overflow: "hidden", position: "relative" }}>
          <div 
            style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "linear-gradient(to right, #06b6d4, #d946ef)", boxShadow: "0 0 10px rgba(34,211,238,0.5)", width: `${progress}%` }}
          />
        </div>
        
        <div style={{ color: "#475569", fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.1em", marginTop: "0.5rem", textAlign: "center" }}>
          [ THINK.INDIA.NETWORK.ACTIVE ]
        </div>
      </div>
    </motion.div>
  );
}