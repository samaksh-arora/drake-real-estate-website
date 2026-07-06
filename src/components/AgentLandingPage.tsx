import { useState, useEffect } from "react";
import { agentConfig, testimonials } from "./agentConfig";

// ─── Types ────────────────────────────────────────────────────────
interface Testimonial {
  reviewerName: string;
  reviewerRole: string;
  text: string;
}

// Agent config imported from agentConfig.ts
const AGENT = agentConfig;


// ─── Sub-components ───────────────────────────────────────────────

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2rem",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: isScrolled ? "rgba(107,57,57,0.96)" : "transparent",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      borderBottom: isScrolled ? "1px solid rgba(218,165,32,0.15)" : "none",
      opacity: isScrolled ? 1 : 0,
      pointerEvents: isScrolled ? "auto" : "none",
      transition: "all 0.3s ease",
    }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#DAA520", letterSpacing: "0.08em" }}>
        {AGENT.name}
      </span>
      <a href="#contact" style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#DAA520", textDecoration: "none",
        border: "1px solid rgba(218,165,32,0.5)",
        padding: "0.5rem 1.25rem", borderRadius: "2px",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(218,165,32,0.1)"; }}
      onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}>
        Get in Touch
      </a>
    </nav>
  );
}

function HeroSection() {
  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: "600px",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Background photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${AGENT.heroBackgroundUrl})`,
        backgroundSize: "cover", backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }} className="hero-bg" />
      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(107,57,57,0.95) 0%, rgba(107,57,57,0.7) 50%, rgba(107,57,57,0.45) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 2.5rem", minWidth: 0, textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Headshot + verified */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginBottom: "2rem" }}>
            <img
              src={AGENT.headshotUrl}
              alt={AGENT.name}
              style={{ width: "160px", height: "160px", borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(218,165,32,0.7)" }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#DAA520" }}>
                  {AGENT.title} · Verified Agent
                </span>
                <span style={{ color: "#DAA520", fontSize: "0.85rem" }}>✓</span>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(232,232,232,0.6)" }}>
                {AGENT.brokerage}
              </span>
            </div>
          </div>

          {/* Name — the signature element */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            color: "#E8E8E8",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            margin: "0 0 1.5rem",
          }}>
            {AGENT.name}
          </h1>

          {/* Service areas */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            {AGENT.serviceAreas.slice(0, 4).map(serviceAreaName => (
              <span key={serviceAreaName} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.7rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "rgba(232,232,232,0.6)",
                border: "1px solid rgba(232,232,232,0.2)",
                padding: "0.2rem 0.6rem", borderRadius: "2px",
              }}>
                {serviceAreaName}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", bottom: "1.5rem", right: "2.5rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(218,165,32,0.6)", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(218,165,32,0.6), transparent)" }} />
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <div style={{
      background: "#6B3939",
      padding: "1.25rem 2.5rem",
      display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
      gap: "1rem",
      borderBottom: "1px solid rgba(218,165,32,0.15)",
    }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <a href={`tel:${AGENT.contact.phone}`} style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
          color: "#E8E8E8", textDecoration: "none",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ color: "#DAA520" }}>📞</span> {AGENT.contact.phone}
        </a>
        <a href={`mailto:${AGENT.contact.email}`} style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
          color: "#E8E8E8", textDecoration: "none",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ color: "#DAA520" }}>✉</span> {AGENT.contact.email}
        </a>
      </div>
      <a href="#contact" style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
        letterSpacing: "0.1em", textTransform: "uppercase",
        background: "#DAA520", color: "#6B3939",
        padding: "0.6rem 1.5rem", borderRadius: "2px",
        textDecoration: "none", fontWeight: 500,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={e => { (e.target as HTMLElement).style.opacity = "0.85"; }}
      onMouseLeave={e => { (e.target as HTMLElement).style.opacity = "1"; }}>
        Send a Message
      </a>
    </div>
  );
}

function AboutSection() {
  return (
    <section style={{ background: "#E8E8E8", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B3A3A", marginBottom: "1rem" }}>
            About
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#6B3939", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Local knowledge.<br />Long-term results.
          </h2>
          {AGENT.bio.split('\n\n').length > 1 ? (
            AGENT.bio.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "1.25rem" }}>
                {para}
              </p>
            ))
          ) : (
            <>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "1.25rem" }}>
                Hello, my name is Drake O'Donnell, and I'm a Metro Detroit based Real Estate professional helping homeowners sell their properties for maximum value. Born and raised in Livonia and deeply connected to the culture of Detroit and the surrounding communities, I bring a local's perspective and a modern approach to every listing I represent.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "1.25rem" }}>
                In my first two years in the business I've closed over 50 transactions, a pace that reflects my commitment to my clients and my drive to deliver results. My strategy combines targeted social media marketing with a trusted network of qualified buyers to get your home in front of the right people quickly and efficiently.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "1.25rem" }}>
                What sets me apart is my belief that real estate is relational, not transactional. I'm far more interested in having a genuine conversation about your goals than chasing a quick listing. When you list with me, you get a partner who will take the time to understand what matters most to you, price your home strategically, and negotiate every detail to protect your bottom line.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "2rem" }}>
                I stay connected with every client I've ever worked with because the relationship doesn't end at the closing table, it starts there. I'd love the opportunity to earn your trust and help you achieve your real estate goals.
              </p>
            </>
          )}
        </div>

        <div style={{ paddingTop: "3.5rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B3A3A", marginBottom: "0.75rem" }}>
              Specializations
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {AGENT.specializations.map(specializationName => (
                <span key={specializationName} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.78rem",
                  padding: "0.4rem 0.9rem",
                  border: "1px solid rgba(139,58,58,0.3)",
                  borderRadius: "2px", color: "#8B3A3A",
                }}>
                  {specializationName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ListingsSection() {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  return (
    <section style={{ background: "#E8E8E8", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B3A3A", marginBottom: "0.5rem" }}>
            Current & past listings
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#6B3939", margin: "0 0 1.5rem" }}>
            Active & Sold Listings
          </h2>
        </div>
        <div style={{
          position: "relative",
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(107,57,57,0.12)",
          boxShadow: "0 8px 28px rgba(107,57,57,0.1)",
        }}>
          {!isFrameLoaded && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "1rem", background: "#fff",
            }}>
              <div style={{
                width: "36px", height: "36px",
                border: "3px solid rgba(107,57,57,0.15)",
                borderTopColor: "#6B3939",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#888" }}>
                Loading listings…
              </span>
            </div>
          )}
          <iframe
            src="https://matrix.realcomponline.com/Matrix/public/IDX.aspx?idx=8d7811b7"
            title="Active & Sold Listings"
            width="100%"
            height="900"
            frameBorder="0"
            marginWidth={0}
            marginHeight={0}
            onLoad={() => setIsFrameLoaded(true)}
            style={{
              display: "block",
              border: "none",
              height: "clamp(700px, 100vh - 220px, 1200px)",
              opacity: isFrameLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#999", marginTop: "1rem" }}>
          Listings provided via RealComp Multiple Listing Service.
        </p>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div style={{
      background: "rgba(232,232,232,0.05)",
      border: "1px solid rgba(218,165,32,0.15)",
      borderRadius: "2px",
      padding: "2rem",
    }}>
      <div style={{ color: "#DAA520", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>
        ★★★★★
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, color: "#E8E8E8", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>
        "{testimonial.text}"
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#DAA520" }}>
          {testimonial.reviewerName}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(232,232,232,0.5)", letterSpacing: "0.06em" }}>
          {testimonial.reviewerRole}
        </span>
      </div>
    </div>
  );
}

// TODO: swap this section for ReviewsSection once Google reviews are live
function TestimonialsSection() {
  return (
    <section style={{ background: "#6B3939", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#DAA520", marginBottom: "0.5rem" }}>
            Client testimonials
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#E8E8E8", margin: 0 }}>
            What clients say
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
          {testimonials.map((testimonialItem, testimonialIndex) => (
            <TestimonialCard key={testimonialIndex} testimonial={testimonialItem} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreaSection() {
  return (
    <section style={{ background: "#E8E8E8", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B3A3A", marginBottom: "1rem" }}>
            Service area
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#6B3939", marginBottom: "1.5rem" }}>
            Metro Detroit & Suburbs
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {AGENT.serviceAreas.map(serviceAreaName => (
              <span key={serviceAreaName} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem",
                padding: "0.4rem 0.9rem",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "2px", color: "#444",
              }}>
                {serviceAreaName}
              </span>
            ))}
          </div>
        </div>
        {/* Google Maps Embed */}
        <iframe
          title="Drake's Office Location"
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: "2px" }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.1234567890!2d-83.2456789!3d42.6789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824b5e5e5e5e5e5%3A0x1234567890abcdef!2s1801%20N%20Opdyke%20Rd%2C%20Auburn%20Hills%2C%20MI%2048236!5e0!3m2!1sen!2sus!4v1234567890"
        />

      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formValues, setFormValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFieldChange = (fieldName: keyof typeof formValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormValues(prev => ({ ...prev, [fieldName]: event.target.value }));

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xlgyoboz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitStatus("success");
      setFormValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
    background: "rgba(232,232,232,0.06)",
    border: "1px solid rgba(218,165,32,0.2)",
    borderRadius: "2px", color: "#E8E8E8",
    padding: "0.85rem 1rem", outline: "none",
  };

  return (
    <section id="contact" style={{ background: "#6B3939", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#DAA520", marginBottom: "1rem", textAlign: "center" }}>
          Get in touch
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#E8E8E8", textAlign: "center", marginBottom: "3rem" }}>
          Ready to get started?
        </h2>

        {submitStatus === "success" ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ color: "#DAA520", fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#E8E8E8" }}>
              Message sent. Drake will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.4)", display: "block", marginBottom: "0.4rem" }}>
                  Name
                </label>
                <input
                  type="text" required placeholder="Jane Smith"
                  value={formValues.name} onChange={handleFieldChange("name")}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.4)", display: "block", marginBottom: "0.4rem" }}>
                  Phone
                </label>
                <input
                  type="tel" placeholder="(313) 693-0984"
                  value={formValues.phone} onChange={handleFieldChange("phone")}
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.4)", display: "block", marginBottom: "0.4rem" }}>
                Email
              </label>
              <input
                type="email" required placeholder="jane@email.com"
                value={formValues.email} onChange={handleFieldChange("email")}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.4)", display: "block", marginBottom: "0.4rem" }}>
                Message
              </label>
              <textarea
                required placeholder="I'm looking to buy / sell in..."
                value={formValues.message} onChange={handleFieldChange("message")}
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                background: "#DAA520", color: "#6B3939",
                border: "none", borderRadius: "2px",
                padding: "1rem", cursor: "pointer",
                fontWeight: 500, marginTop: "0.5rem",
                opacity: submitStatus === "sending" ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}>
              {submitStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
            {submitStatus === "error" && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#e88", textAlign: "center" }}>
                Something went wrong. Please email directly at {AGENT.contact.email}.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#3F2626", padding: "2.5rem", borderTop: "1px solid rgba(218,165,32,0.1)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#DAA520", marginBottom: "0.5rem" }}>
              {AGENT.name}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(232,232,232,0.4)", lineHeight: 1.7 }}>
              {AGENT.brokerageInfo.name}<br />
              {AGENT.brokerageInfo.address}<br />
              {AGENT.brokerageInfo.phone}<br />
              License #{AGENT.licenseNumber}
            </div>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(232,232,232,0.25)", maxWidth: "400px", lineHeight: 1.7, textAlign: "right" }}>
            All listing information is deemed reliable but not guaranteed and should be independently verified. Property data sourced from the Regional MLS.
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(218,165,32,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(232,232,232,0.2)" }}>
            © {new Date().getFullYear()} {AGENT.name} · All rights reserved
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use"].map(linkLabel => (
              <a key={linkLabel} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(232,232,232,0.3)", textDecoration: "none" }}>
                {linkLabel}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root Component ───────────────────────────────────────────────
export default function AgentLandingPage() {
  return (
    <>
      {/* Google Fonts — swap these for self-hosted in production */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #E8E8E8; }
        ::placeholder { color: rgba(232,232,232,0.25); }
        input:focus, textarea:focus { border-color: rgba(218,165,32,0.5) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          section {
            padding: 3rem 1.5rem !important;
          }
          section > div, div[style*="maxWidth"] {
            max-width: 100% !important;
          }
          section[style*="height: 100vh"] > div:last-child {
            padding: 0 1.5rem 2rem !important;
          }
          section > div[style*="grid-template-columns: 1fr 1fr"],
          section > div[style*="grid-template-columns: repeat(3, 1fr)"],
          section > div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          section > div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          h1, h2, h3 {
            margin-bottom: 1rem !important;
          }
          h1 {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          p {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          input, textarea {
            font-size: 16px !important;
          }
          nav {
            padding: 0 1rem !important;
          }
          div[style*="display: flex"][style*="justify-content: space-between"],
          div[style*="display: flex"][style*="gap: 2rem"],
          div[style*="display: flex"][style*="gap: 5rem"] {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          section {
            padding: 2rem 1rem !important;
          }
          section[style*="height: 100vh"] > div:last-child {
            padding: 0 1rem 1.5rem !important;
          }
          section[style*="height: 100vh"] > div[style*="bottom"] {
            display: none !important;
          }
          h1 {
            font-size: 1.75rem !important;
          }
          h2 {
            font-size: 1.3rem !important;
          }
          h3 {
            font-size: 1.1rem !important;
          }
          div[style*="flex"] {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          img {
            max-width: 100% !important;
            height: auto !important;
          }
          button {
            width: 100% !important;
          }
          .hero-bg {
            background-attachment: scroll !important;
          }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <ContactStrip />
      <AboutSection />
      <ListingsSection />
      <TestimonialsSection />
      <ServiceAreaSection />
      <ContactFormSection />
      <Footer />
    </>
  );
}
