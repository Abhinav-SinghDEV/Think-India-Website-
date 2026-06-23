"use client";

import { useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  color: string;
};

export default function TeamCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        perspective: "1000px",
        height: "280px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* === FRONT === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "0.75rem",
            padding: "4px",
            background: "linear-gradient(135deg, #FF9933 33%, #ffffff 33% 66%, #138808 66%)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle watermark */}
            <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "100px", height: "100px", opacity: 0.06, pointerEvents: "none" }}>
              <svg viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="2">
                <circle cx="50" cy="50" r="48" />
                <circle cx="50" cy="50" r="10" />
                {[...Array(24)].map((_, i) => (
                  <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
                ))}
              </svg>
            </div>

            {/* Circular Avatar */}
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                padding: "3px",
                background: `linear-gradient(135deg, #FF9933, #ffffff, #138808)`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: member.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: "900",
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                }}
              >
                {member.initials}
              </div>
            </div>

            {/* Name & Role */}
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <p style={{ fontSize: "1.05rem", fontWeight: "800", color: "#2d2a25", margin: 0 }}>{member.name}</p>
              <p style={{ fontSize: "0.7rem", fontWeight: "700", color: "#9a9590", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0.3rem 0 0" }}>
                {member.role}
              </p>
            </div>
          </div>
        </div>

        {/* === BACK === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "0.75rem",
            background: "linear-gradient(160deg, #3d2800 0%, #1a0f00 60%, #003300 100%)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.75rem 1.5rem",
            gap: "1rem",
          }}
        >
          {/* Tricolor top bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: "linear-gradient(90deg, #FF9933 33%, #ffffff 33% 66%, #138808 66%)", borderRadius: "0.75rem 0.75rem 0 0" }} />

          {/* Quote mark */}
          <div style={{ fontSize: "3rem", lineHeight: 1, color: "#FF9933", opacity: 0.6, fontFamily: "Georgia, serif", alignSelf: "flex-start", marginBottom: "-0.5rem" }}>"</div>

          <p style={{ fontSize: "0.88rem", color: "#f0ece4", fontStyle: "italic", lineHeight: 1.7, textAlign: "center", margin: 0 }}>
            {member.quote}
          </p>

          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: "800", color: "#FF9933", margin: 0 }}>{member.name}</p>
            <p style={{ fontSize: "0.65rem", fontWeight: "700", color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0.25rem 0 0" }}>
              {member.role}
            </p>
          </div>

          {/* Bottom tricolor line */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #138808 33%, #ffffff 33% 66%, #FF9933 66%)", borderRadius: "0 0 0.75rem 0.75rem" }} />
        </div>
      </div>
    </div>
  );
}
