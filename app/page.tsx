"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import SplashScreen from "@/components/ui/SplashScreen";
import TeamCard from "@/components/ui/TeamCard";

const S = "#FF9933"; // saffron
const G = "#138808"; // green
const N = "#000080"; // navy

// ── Reusable Chakra SVG ──────────────────────────────────────────
function Chakra({ size = 200, stroke = N, sw = "0.5", op = 0.12 }: {
  size?: number; stroke?: string; sw?: string; op?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth={sw} style={{ opacity: op, display: "block" }}>
      <circle cx="50" cy="50" r="48" />
      <circle cx="50" cy="50" r="10" />
      {[...Array(24)].map((_, i) => (
        <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * Math.PI / 12)} y2={50 + 48 * Math.sin(i * Math.PI / 12)} />
      ))}
    </svg>
  );
}

// ── Page fade wrapper ────────────────────────────────────────────
function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  );
}

// ── Section label helper ─────────────────────────────────────────
function Label({ text, color = S }: { text: string; color?: string }) {
  return <p style={{ fontSize: "0.7rem", fontWeight: "800", letterSpacing: "0.2em", color, textTransform: "uppercase", margin: "0 0 0.35rem" }}>{text}</p>;
}

// ── Tricolor divider ─────────────────────────────────────────────
function Tribar({ reverse = false, width = 100 }: { reverse?: boolean; width?: number }) {
  return (
    <div style={{
      height: "4px", width: `${width}px`, borderRadius: "2px",
      background: reverse
        ? `linear-gradient(90deg, ${G} 33%, #ccc 33% 66%, ${S} 66%)`
        : `linear-gradient(90deg, ${S} 33%, #ccc 33% 66%, ${G} 66%)`,
    }} />
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Events", id: "events" },
    { label: "Team", id: "team" },
    { label: "Contact Us", id: "contact" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "e1185f1a-f92c-4103-bd17-d5e94573ac8d",
          subject: "New Message from Think India Website",
          from_name: "Think India Website Contact Form",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await res.json();
      if (result.success) { setSubmitStatus("success"); setFormData({ name: "", email: "", message: "" }); }
      else setSubmitStatus("error");
    } catch { setSubmitStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  const teamMembers = [
    { name: "Aarav Mehta",   role: "President",         quote: "Leadership is service to the nation. Every step we take at Think India is a step toward a stronger Bharat.",         initials: "AM", color: S },
    { name: "Priya Sharma",  role: "Vice President",    quote: "Empowering young minds is the most powerful investment we can make for India's future.",                             initials: "PS", color: G },
    { name: "Rohan Das",     role: "Secretary",         quote: "Organisation and clarity are the backbone of every great movement. I strive to keep ours strong.",                   initials: "RD", color: N },
    { name: "Sneha Iyer",    role: "Technical Head",    quote: "Technology and patriotism are not separate — we can code our way to nation-building.",                               initials: "SI", color: S },
    { name: "Kabir Singh",   role: "Events Head",       quote: "Every event we organise plants a seed of national consciousness in another young mind.",                             initials: "KS", color: G },
    { name: "Ananya Bose",   role: "Design Head",       quote: "Great design communicates ideas across barriers. Our identity must inspire at first glance.",                        initials: "AB", color: N },
    { name: "Vikram Nair",   role: "Outreach Head",     quote: "Change begins when conversations spread. Outreach is how we turn ideas into movements.",                            initials: "VN", color: S },
    { name: "Diya Patel",    role: "Social Media Head", quote: "A single story, shared widely, can shift perspectives across the country.",                                         initials: "DP", color: G },
  ];

  // ── Input style helper ─────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.72rem 0.95rem",
    border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: "0.6rem",
    outline: "none", fontSize: "0.9rem", color: "#1a1a1a",
    background: "#FAFAFA", boxSizing: "border-box" as const,
    transition: "border-color 0.2s ease",
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FDFAF5", color: "#1a1a1a", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <div>

          {/* ═══════════════ NAVIGATION ═══════════════ */}
          <nav style={{
            position: "fixed", top: 0, left: 0, width: "100%", zIndex: 40,
            height: "68px", padding: "0 3.5rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "rgba(253,250,245,0.92)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 1px 16px rgba(0,0,0,0.05)",
            boxSizing: "border-box",
          }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer" }} onClick={() => setCurrentPage("home")}>
              <img src="/logo.png" alt="Think India" style={{ height: "2.6rem", width: "auto" }} onError={e => (e.currentTarget.style.display = "none")} />
              <div>
                <div style={{ fontSize: "0.98rem", fontWeight: "800", color: "#1a1a1a", lineHeight: 1.1 }}>Think India</div>
                <div style={{ fontSize: "0.58rem", fontWeight: "700", color: S, letterSpacing: "0.1em", textTransform: "uppercase" }}>NIT Silchar Chapter</div>
              </div>
            </div>

            {/* Desktop links */}
            <div className="nav-inner" style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
              {navItems.map(link => {
                const active = currentPage === link.id;
                return (
                  <button key={link.id} onClick={() => setCurrentPage(link.id)}
                    style={{
                      padding: "0.42rem 0.85rem", border: "none", borderRadius: "0.5rem",
                      background: active ? `${S}18` : "transparent",
                      color: active ? "#b34d00" : "#555",
                      fontWeight: active ? "700" : "600",
                      fontSize: "0.8rem", cursor: "pointer", transition: "all 0.18s",
                    }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >{link.label}</button>
                );
              })}
              <button onClick={() => setCurrentPage("contact")}
                style={{
                  marginLeft: "0.6rem", padding: "0.48rem 1.1rem", border: "none",
                  borderRadius: "0.5rem", background: `linear-gradient(135deg, ${S}, #e67e00)`,
                  color: "#fff", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer",
                  boxShadow: `0 3px 12px ${S}55`, transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${S}60`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 3px 12px ${S}55`; }}
              >Join Us →</button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className={`nav-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </nav>

          {/* Mobile nav dropdown */}
          <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
            {navItems.map(link => (
              <button key={link.id} onClick={() => { setCurrentPage(link.id); setMenuOpen(false); }}>
                {link.label}
              </button>
            ))}
            <button className="join-btn" onClick={() => { setCurrentPage("contact"); setMenuOpen(false); }}>
              Join Us →
            </button>
          </div>

          {/* ═══════════════ HOME ═══════════════ */}
          {currentPage === "home" && (
            <PageWrap>
              <section className="section-hero" style={{
                minHeight: "100vh",
                background: "linear-gradient(140deg, #FFFBF5 0%, #FFF5E6 45%, #F2FFF4 100%)",
                display: "flex", alignItems: "center",
                padding: "5rem 3.5rem 7rem", boxSizing: "border-box",
                position: "relative", overflow: "hidden",
              }}>
                {/* Dot pattern */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, ${N}08 1px, transparent 0)`, backgroundSize: "36px 36px", pointerEvents: "none" }} />

                <div className="hero-grid" style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>

                  {/* Left: content */}
                  <div>
                    <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.45rem",
                        padding: "0.35rem 0.95rem", borderRadius: "999px",
                        background: `${S}14`, border: `1px solid ${S}35`,
                        color: "#b34d00", fontSize: "0.7rem", fontWeight: "700",
                        letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem",
                      }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S, display: "inline-block", boxShadow: `0 0 5px ${S}` }} />
                      NIT Silchar Chapter
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
                      style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", fontWeight: "900", lineHeight: 0.9, margin: "0 0 1.25rem" }}>
                      <span style={{ color: S }}>Think</span><br />
                      <span style={{ color: G }}>India</span>
                    </motion.h1>

                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
                      style={{ transformOrigin: "left", marginBottom: "1.5rem" }}>
                      <Tribar width={200} />
                    </motion.div>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.28 }}
                      style={{ fontSize: "1.05rem", color: "#666", lineHeight: 1.8, maxWidth: "460px", marginBottom: "2.25rem" }}>
                      A pan-India initiative empowering students with a{" "}
                      <span style={{ color: "#b34d00", fontWeight: "700" }}>'Nation First'</span> mindset.
                      Join the country's brightest young minds in nation-building and intellectual engagement.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }}
                      style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                      <button onClick={() => setCurrentPage("contact")}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 28px ${S}50`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${S}35`; }}
                        style={{ padding: "0.85rem 1.85rem", border: "none", borderRadius: "0.65rem", background: `linear-gradient(135deg, ${S}, #e67e00)`, color: "#fff", fontWeight: "700", fontSize: "0.92rem", cursor: "pointer", boxShadow: `0 4px 16px ${S}35`, transition: "all 0.25s" }}>
                        🚀 Join Our Mission
                      </button>
                      <button onClick={() => setCurrentPage("about")}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = G; (e.currentTarget as HTMLButtonElement).style.color = G; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.14)"; (e.currentTarget as HTMLButtonElement).style.color = "#444"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                        style={{ padding: "0.85rem 1.85rem", borderRadius: "0.65rem", border: "1.5px solid rgba(0,0,0,0.14)", background: "#fff", color: "#444", fontWeight: "700", fontSize: "0.92rem", cursor: "pointer", transition: "all 0.25s" }}>
                        Learn More →
                      </button>
                    </motion.div>
                  </div>

                  {/* Right: Decorative Chakra */}
                  <motion.div className="hero-right" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "420px" }}>
                    {[420, 340, 260].map((sz, i) => (
                      <div key={i} style={{ position: "absolute", width: `${sz}px`, height: `${sz}px`, borderRadius: "50%", border: `${2 - i * 0.5}px solid ${[`${S}28`, `${G}20`, `${N}12`][i]}` }} />
                    ))}
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }}>
                      <Chakra size={300} stroke={N} sw="0.6" op={0.15} />
                    </motion.div>
                    {[
                      { text: "🇮🇳 Nation First", top: "4%", right: "2%" },
                      { text: "500+ Members", bottom: "8%", left: "0%" },
                      { text: "20+ Chapters", top: "42%", left: "-5%" },
                    ].map((b, i) => (
                      <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 + i * 0.6, ease: "easeInOut" }}
                        style={{
                          position: "absolute", top: b.top, right: (b as any).right, bottom: (b as any).bottom, left: (b as any).left,
                          padding: "0.4rem 0.9rem", borderRadius: "999px",
                          background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                          fontSize: "0.75rem", fontWeight: "700", whiteSpace: "nowrap" as const,
                        }}>{b.text}</motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Stats strip */}
                <motion.div className="stats-strip" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}
                  style={{
                    position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
                    display: "flex", background: "#fff",
                    borderRadius: "0.9rem", border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)", overflow: "hidden",
                  }}>
                  {[
                    { v: "500+", l: "Members", c: S },
                    { v: "20+",  l: "IIT & NIT Chapters", c: G },
                    { v: "50+",  l: "Events Held", c: S },
                    { v: "5+",   l: "Years Active", c: G },
                  ].map((st, i, arr) => (
                    <div key={i} style={{ padding: "0.9rem 1.75rem", textAlign: "center", borderRight: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                      <div style={{ fontSize: "1.4rem", fontWeight: "900", color: st.c }}>{st.v}</div>
                      <div style={{ fontSize: "0.62rem", color: "#999", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "0.1rem" }}>{st.l}</div>
                    </div>
                  ))}
                </motion.div>
              </section>
            </PageWrap>
          )}

          {/* ═══════════════ ABOUT ═══════════════ */}
          {currentPage === "about" && (
            <PageWrap>
              <section className="section-pad" style={{ minHeight: "100vh", padding: "9rem 3.5rem 6rem", background: "#FFFBF5", boxSizing: "border-box" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <Label text="Who We Are" />
                    <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#1a1a1a", margin: "0 0 0.75rem" }}>About Us</h2>
                    <div style={{ display: "flex", justifyContent: "center" }}><Tribar width={90} /></div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {[
                      { title: "Introduction", text: "Think India is a pan-India initiative bringing together the best minds from premier institutes. We are a dynamic forum designed to bind the students of national institutes with a common vision of nation-building.", accent: S, right: false },
                      { title: "What We Do", text: "We catalyze innovation and leadership through multidisciplinary collaboration, organizing national-level conclaves and internships to bridge academia and reality.", accent: G, right: true },
                      { title: "Our Goal", text: "Our goal is to forge an unbreakable network of brilliance by breaking down institutional silos, fostering visionary leaders committed to India's global prominence.", accent: N, right: false },
                    ].map((item, idx) => (
                      <motion.div key={idx}
                        className={item.right ? "about-card-right" : "about-card-left"}
                        initial={{ opacity: 0, x: item.right ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: idx * 0.1 }}
                        style={{
                          alignSelf: item.right ? "flex-end" : "flex-start",
                          width: "75%", background: "#fff", borderRadius: "1rem",
                          border: "1px solid rgba(0,0,0,0.07)",
                          borderLeft: `5px solid ${item.accent}`,
                          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                          padding: "2rem 2.5rem",
                          position: "relative", overflow: "hidden",
                        }}>
                        <div style={{ position: "absolute", bottom: "-18px", right: "-18px", width: "90px", height: "90px", opacity: 0.04, pointerEvents: "none" }}>
                          <Chakra size={90} stroke={N} sw="2" op={1} />
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1a1a1a", marginBottom: "0.6rem" }}>{item.title}</h3>
                        <p style={{ color: "#666", fontSize: "0.97rem", lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </PageWrap>
          )}

          {/* ═══════════════ EVENTS ═══════════════ */}
          {currentPage === "events" && (
            <PageWrap>
              <section className="section-pad" style={{
                minHeight: "100vh", padding: "9rem 3.5rem 6rem", boxSizing: "border-box",
                background: "linear-gradient(160deg, #FFFBF5 0%, #FFFFFF 50%, #F3FFF5 100%)",
                position: "relative", overflow: "hidden",
              }}>
                {/* Side Chakras */}
                {(["left", "right"] as const).map((side, i) => (
                  <motion.div key={side} animate={{ rotate: i === 0 ? 360 : -360 }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                    style={{ position: "absolute", [side]: "-8%", top: "12%", width: "480px", height: "480px", opacity: 0.07, pointerEvents: "none" }}>
                    <Chakra size={480} stroke={N} sw="0.5" op={1} />
                  </motion.div>
                ))}

                <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                  {/* ── Upcoming ── */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: "5rem" }}>
                    <Label text="What's Coming" color="#b34d00" />
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: "#1a1a1a", lineHeight: 1 }}>UPCOMING</h2>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: S, lineHeight: 1, marginBottom: "0.75rem" }}>EVENTS</h2>
                    <Tribar width={110} />
                    <div style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {[
                        { day: "SAT", date: "12/07", title: "National Conclave on Policy Reforms",     desc: "Keynote by Dr. Arvind Sharma",               accent: S },
                        { day: "SUN", date: "20/07", title: "Tech & Governance Workshop",              desc: "with Prof. Meena Krishnan",                  accent: S },
                        { day: "FRI", date: "01/08", title: "Think India NIT Silchar Annual Meet",    desc: "Open to all Chapter Members",                accent: G },
                        { day: "SAT", date: "16/08", title: "Independence Day Special Debate",        desc: "Panel of Student Leaders Across India",      accent: G },
                      ].map((ev, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.07 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateX(5px)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)"; }}
                          style={{
                            display: "flex", alignItems: "center", gap: "1.25rem",
                            padding: "1.15rem 1.5rem", background: "#fff",
                            borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.07)",
                            borderLeft: `4px solid ${ev.accent}`,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.05)", cursor: "pointer", transition: "all 0.25s",
                          }}>
                          <div style={{ minWidth: "52px", textAlign: "center", flexShrink: 0 }}>
                            <div style={{ fontSize: "0.58rem", fontWeight: "800", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>{ev.day}</div>
                            <div style={{ fontSize: "1.25rem", fontWeight: "900", color: ev.accent, lineHeight: 1.1 }}>{ev.date}</div>
                          </div>
                          <div style={{ width: "3px", height: "36px", background: `linear-gradient(180deg, ${S} 33%, #ccc 33% 66%, ${G} 66%)`, borderRadius: "2px", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "0.96rem", fontWeight: "700", color: "#1a1a1a" }}>{ev.title}</div>
                            <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.15rem" }}>{ev.desc}</div>
                          </div>
                          <div style={{ fontSize: "1.2rem", color: "#ddd" }}>›</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Past Events ── */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                    <Label text="Our Legacy" color="#0a5c04" />
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: "#1a1a1a", lineHeight: 1 }}>PAST</h2>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: G, lineHeight: 1, marginBottom: "0.75rem" }}>EVENTS</h2>
                    <Tribar width={110} reverse />
                    <div className="past-events-grid" style={{ marginTop: "1.75rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                      {[
                        { title: "Think India Annual Conclave 2024", date: "15 Nov 2024", tag: "Conclave",    count: "200+", c: S },
                        { title: "Young India Leadership Summit",    date: "3 Sep 2024",  tag: "Summit",      count: "150+", c: G },
                        { title: "Policy Hackathon NIT Silchar",     date: "18 Jul 2024", tag: "Hackathon",   count: "80+",  c: N },
                        { title: "Bharat Bodh Quiz Competition",     date: "26 Jan 2024", tag: "Quiz",        count: "300+", c: G },
                        { title: "Governance & Democracy Workshop",  date: "5 Dec 2023",  tag: "Workshop",    count: "60+",  c: S },
                        { title: "Nation Builders Orientation 2023", date: "12 Aug 2023", tag: "Orientation", count: "120+", c: N },
                      ].map((ev, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 28px rgba(0,0,0,0.1)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"; }}
                          style={{
                            background: "#fff", borderRadius: "0.75rem",
                            border: "1px solid rgba(0,0,0,0.07)",
                            borderTop: `3px solid ${ev.c}`,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                            padding: "1.25rem", cursor: "pointer",
                            transition: "all 0.25s", position: "relative", overflow: "hidden",
                          }}>
                          <div style={{ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "999px", background: `${ev.c}15`, fontSize: "0.6rem", fontWeight: "800", color: ev.c, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "0.65rem" }}>{ev.tag}</div>
                          <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1a1a1a", lineHeight: 1.45, marginBottom: "0.9rem" }}>{ev.title}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "0.7rem", color: "#bbb" }}>{ev.date}</div>
                            <div style={{ fontSize: "0.7rem", color: G, fontWeight: "700" }}>{ev.count} attended</div>
                          </div>
                          <div style={{ position: "absolute", bottom: "-14px", right: "-14px", width: "64px", height: "64px", opacity: 0.04, pointerEvents: "none" }}>
                            <Chakra size={64} stroke={N} sw="2" op={1} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            </PageWrap>
          )}

          {/* ═══════════════ TEAM ═══════════════ */}
          {currentPage === "team" && (
            <PageWrap>
              <section className="section-pad" style={{ minHeight: "100vh", padding: "9rem 3.5rem 6rem", background: "#FFFBF5", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
                  <Chakra size={600} stroke={N} sw="0.5" op={0.04} />
                </div>
                <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                  <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <Label text="Our People" />
                    <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#1a1a1a", margin: "0 0 0.7rem" }}>Meet Our Team</h2>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}><Tribar width={90} /></div>
                    <p style={{ color: "#888", fontSize: "0.97rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
                      The passionate minds behind Think India NIT Silchar — driven by a vision of a stronger, united, and intellectually vibrant nation.
                    </p>
                  </div>
                  <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
                    {teamMembers.map((m, idx) => <TeamCard key={idx} member={m} />)}
                  </div>
                </div>
              </section>
            </PageWrap>
          )}

          {/* ═══════════════ CONTACT ═══════════════ */}
          {currentPage === "contact" && (
            <PageWrap>
              <section className="section-pad" style={{ minHeight: "100vh", padding: "9rem 3.5rem 6rem", background: "#FFFBF5", boxSizing: "border-box" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                  <Label text="Reach Out" />
                  <h1 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#1a1a1a", margin: "0 0 0.55rem" }}>Get In Touch</h1>
                  <Tribar width={90} />
                  <div className="contact-grid" style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "3.5rem", alignItems: "start" }}>

                    {/* Left: info */}
                    <div>
                      <p style={{ color: "#777", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "2.25rem" }}>
                        Interested in joining us but do not know where to start? Do you have a mind-blowing idea that needs help? Reach out — we are happy to help!
                      </p>
                      <p style={{ fontWeight: "700", fontSize: "0.88rem", color: "#333", marginBottom: "0.85rem" }}>Find Us On</p>
                      <div style={{ display: "flex", gap: "0.6rem" }}>
                        {[
                          { href: "https://www.instagram.com/thinkindianits/",        icon: <FaInstagram />, hc: "#E1306C" },
                          { href: "https://www.facebook.com/ThinkindiaNITS/",          icon: <FaFacebookF />, hc: "#1877F2" },
                          { href: "https://www.linkedin.com/company/thinkindianits/", icon: <FaLinkedinIn />, hc: "#0A66C2" },
                        ].map((sc, i) => (
                          <a key={i} href={sc.href} target="_blank" rel="noopener noreferrer"
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = sc.hc; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = sc.hc; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; (e.currentTarget as HTMLAnchorElement).style.color = "#777"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.1)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
                            style={{
                              width: "2.75rem", height: "2.75rem", borderRadius: "0.6rem",
                              background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#777", fontSize: "1.2rem", textDecoration: "none",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.25s",
                            }}>{sc.icon}</a>
                        ))}
                      </div>
                    </div>

                    {/* Right: form */}
                    <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: "2.25rem" }}>
                      {[
                        { label: "Your Name", type: "text",  key: "name"  as const },
                        { label: "Your Email", type: "email", key: "email" as const },
                      ].map(f => (
                        <div key={f.key} style={{ marginBottom: "1.1rem" }}>
                          <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#555", marginBottom: "0.35rem" }}>{f.label}</label>
                          <input type={f.type} required value={formData[f.key]}
                            onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                            onFocus={e => e.target.style.borderColor = S}
                            onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                            style={inputStyle} />
                        </div>
                      ))}
                      <div style={{ marginBottom: "1.4rem" }}>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#555", marginBottom: "0.35rem" }}>Your Message</label>
                        <textarea rows={4} required value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          onFocus={e => e.target.style.borderColor = S}
                          onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                          style={{ ...inputStyle, resize: "vertical" as const }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button type="submit" disabled={isSubmitting}
                          onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                          style={{
                            padding: "0.75rem 1.85rem", border: "none", borderRadius: "0.6rem",
                            background: isSubmitting ? "#ccc" : `linear-gradient(135deg, ${S}, #e67e00)`,
                            color: "#fff", fontWeight: "700", fontSize: "0.9rem",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            boxShadow: isSubmitting ? "none" : `0 4px 14px ${S}45`,
                            transition: "all 0.25s",
                          }}>{isSubmitting ? "Sending…" : "Send Message →"}</button>
                        {submitStatus === "success" && <span style={{ color: G, fontWeight: "700", fontSize: "0.88rem" }}>✓ Message sent!</span>}
                        {submitStatus === "error"   && <span style={{ color: "#ef4444", fontWeight: "700", fontSize: "0.88rem" }}>Failed. Try again.</span>}
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </PageWrap>
          )}

        </div>
      )}
    </main>
  );
}