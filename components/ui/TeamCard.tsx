"use client";

import { useState } from "react";

const S = "#FF9933";
const G = "#138808";
const N = "#000080";

type TeamMember = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  color: string;
};

// Tiny Chakra watermark used on both faces
function MiniChakra({ stroke = N }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="2" style={{ width: "100%", height: "100%", opacity: 0.06 }}>
      <circle cx="50" cy="50" r="48" />
      <circle cx="50" cy="50" r="10" />
      {[...Array(24)].map((_, i) => (
        <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
      ))}
    </svg>
  );
}

export default function TeamCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);

  // Determine lighter bg tint for the avatar/back
  const tint = `${member.color}12`;
  const tintMid = `${member.color}22`;

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: "1100px", height: "270px", cursor: "pointer" }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.58s cubic-bezier(0.4, 0.2, 0.2, 1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* ── FRONT ────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          borderRadius: "1rem",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderTop: `4px solid ${member.color}`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "0.65rem", padding: "1.5rem",
          overflow: "hidden",
        }}>
          {/* Watermark corner */}
          <div style={{ position: "absolute", bottom: "-16px", right: "-16px", width: "80px", height: "80px", pointerEvents: "none" }}>
            <MiniChakra />
          </div>

          {/* Avatar */}
          <div style={{
            width: "86px", height: "86px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${tint}, ${tintMid})`,
            border: `3px solid ${member.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem", fontWeight: "900", color: member.color,
            flexShrink: 0, zIndex: 1,
          }}>{member.initials}</div>

          <div style={{ textAlign: "center", zIndex: 1 }}>
            <p style={{ fontSize: "1rem", fontWeight: "800", color: "#1a1a1a", margin: 0 }}>{member.name}</p>
            <p style={{
              fontSize: "0.62rem", fontWeight: "700",
              color: "#bbb", letterSpacing: "0.12em",
              textTransform: "uppercase", margin: "0.25rem 0 0",
            }}>{member.role}</p>
          </div>

          {/* Small tricolor dot row */}
          <div style={{ display: "flex", gap: "4px", marginTop: "0.1rem" }}>
            {[S, "#d9d9d9", G].map((c, i) => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
            ))}
          </div>
        </div>

        {/* ── BACK ─────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          borderRadius: "1rem",
          background: `linear-gradient(160deg, ${tint} 0%, #fff 100%)`,
          border: `1px solid ${member.color}25`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "1.5rem 1.6rem", gap: "0.5rem",
          overflow: "hidden",
        }}>
          {/* Top tricolor bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "4px",
            background: `linear-gradient(90deg, ${S} 33%, #ccc 33% 66%, ${G} 66%)`,
            borderRadius: "1rem 1rem 0 0",
          }} />

          {/* Watermark corner */}
          <div style={{ position: "absolute", bottom: "-16px", right: "-16px", width: "80px", height: "80px", pointerEvents: "none" }}>
            <MiniChakra stroke={member.color} />
          </div>

          {/* Quote mark */}
          <div style={{ fontSize: "2.8rem", lineHeight: 0.8, color: member.color, opacity: 0.4, fontFamily: "Georgia, serif", alignSelf: "flex-start" }}>"</div>

          <p style={{ fontSize: "0.8rem", color: "#555", fontStyle: "italic", lineHeight: 1.65, textAlign: "center", margin: 0, zIndex: 1 }}>
            {member.quote}
          </p>

          <div style={{ textAlign: "center", zIndex: 1, marginTop: "0.25rem" }}>
            <p style={{ fontSize: "0.87rem", fontWeight: "800", color: member.color, margin: 0 }}>{member.name}</p>
            <p style={{ fontSize: "0.6rem", fontWeight: "700", color: "#ccc", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0.2rem 0 0" }}>{member.role}</p>
          </div>

          {/* Bottom tricolor bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
            background: `linear-gradient(90deg, ${G} 33%, #ccc 33% 66%, ${S} 66%)`,
            borderRadius: "0 0 1rem 1rem",
          }} />
        </div>

      </div>
    </div>
  );
}
