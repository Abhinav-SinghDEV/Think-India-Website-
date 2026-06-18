"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reduced duration from 2500ms to 1200ms for a faster experience
    const duration = 1200; 
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        // Reduced the post-load delay slightly as well
        setTimeout(onComplete, 200); 
      }
    }, intervalTime);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      style={{ 
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, 
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
        background: "linear-gradient(180deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)"
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Rotating Ashoka Chakra */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        style={{ width: "120px", height: "120px", marginBottom: "2rem" }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="2">
           <circle cx="50" cy="50" r="48" />
           <circle cx="50" cy="50" r="10" />
           {[...Array(24)].map((_, i) => (
             <line 
               key={i} 
               x1="50" 
               y1="50" 
               x2={50 + 48 * Math.cos(i * Math.PI / 12)} 
               y2={50 + 48 * Math.sin(i * Math.PI / 12)} 
             />
           ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}