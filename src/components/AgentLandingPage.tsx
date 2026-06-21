import { useState, useEffect, useRef } from "react";
import { agentConfig, testimonials, mockActiveListings, mockSoldListings } from "./agentConfig";

// ─── Types ────────────────────────────────────────────────────────
type ListingStatus = "active" | "sold";
interface Listing {
  id: string;
  status: ListingStatus;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  photoUrl: string;
  mlsNumber?: string;
  closedDate?: string;
  representedSide?: "buyer" | "seller";
}
interface Testimonial {
  reviewerName: string;
  reviewerRole: string;
  text: string;
}

// Agent config imported from agentConfig.ts
const AGENT = agentConfig;


// ─── Helpers ─────────────────────────────────────────────────────
const formatListingPrice = (priceInDollars: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(priceInDollars);

const formatSquareFootage = (squareFeet: number): string =>
  new Intl.NumberFormat("en-US").format(squareFeet);

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
      background: isScrolled ? "rgba(15,31,20,0.96)" : "transparent",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      borderBottom: isScrolled ? "1px solid rgba(200,169,110,0.15)" : "none",
      transition: "all 0.3s ease",
    }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#C8A96E", letterSpacing: "0.08em" }}>
        {AGENT.name}
      </span>
      <a href="#contact" style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#C8A96E", textDecoration: "none",
        border: "1px solid rgba(200,169,110,0.5)",
        padding: "0.5rem 1.25rem", borderRadius: "2px",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(200,169,110,0.1)"; }}
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
      display: "flex", alignItems: "flex-end",
      overflow: "hidden",
    }}>
      {/* Background photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${AGENT.heroBackgroundUrl})`,
        backgroundSize: "cover", backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }} />
      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(15,31,20,0.92) 0%, rgba(15,31,20,0.5) 50%, rgba(15,31,20,0.2) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 2.5rem 5rem", minWidth: 0, textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Headshot + verified */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <img
              src={AGENT.headshotUrl}
              alt={AGENT.name}
              style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(200,169,110,0.6)" }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A96E" }}>
                  {AGENT.title} · Verified Agent
                </span>
                <span style={{ color: "#C8A96E", fontSize: "0.85rem" }}>✓</span>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(245,242,237,0.6)" }}>
                {AGENT.brokerage}
              </span>
            </div>
          </div>

          {/* Name — the signature element */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            color: "#F5F2ED",
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
                color: "rgba(245,242,237,0.6)",
                border: "1px solid rgba(245,242,237,0.2)",
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
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(200,169,110,0.6)", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(200,169,110,0.6), transparent)" }} />
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <div style={{
      background: "#0F1F14",
      padding: "1.25rem 2.5rem",
      display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
      gap: "1rem",
      borderBottom: "1px solid rgba(200,169,110,0.15)",
    }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <a href={`tel:${AGENT.contact.phone}`} style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
          color: "#F5F2ED", textDecoration: "none",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ color: "#C8A96E" }}>📞</span> {AGENT.contact.phone}
        </a>
        <a href={`mailto:${AGENT.contact.email}`} style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
          color: "#F5F2ED", textDecoration: "none",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ color: "#C8A96E" }}>✉</span> {AGENT.contact.email}
        </a>
      </div>
      <a href="#contact" style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
        letterSpacing: "0.1em", textTransform: "uppercase",
        background: "#C8A96E", color: "#0F1F14",
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
    <section style={{ background: "#F5F2ED", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2A4A35", marginBottom: "1rem" }}>
            About
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#0F1F14", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Local knowledge.<br />Long-term results.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "2rem" }}>
            {AGENT.bio}
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#0F1F14" }}>
                {AGENT.yearsExperience}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
                Years experience
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "3.5rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2A4A35", marginBottom: "0.75rem" }}>
              Specializations
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {AGENT.specializations.map(specializationName => (
                <span key={specializationName} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.78rem",
                  padding: "0.4rem 0.9rem",
                  border: "1px solid rgba(42,74,53,0.3)",
                  borderRadius: "2px", color: "#2A4A35",
                }}>
                  {specializationName}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2A4A35", marginBottom: "0.75rem" }}>
              Languages
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#444" }}>
              {AGENT.languages.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "2px",
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={e => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = "translateY(-4px)";
      card.style.boxShadow = "0 12px 32px rgba(15,31,20,0.12)";
    }}
    onMouseLeave={e => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    }}>
      <div style={{ position: "relative", paddingBottom: "60%", overflow: "hidden" }}>
        <img
          src={listing.photoUrl}
          alt={listing.address}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {listing.status === "sold" && (
          <div style={{
            position: "absolute", top: "1rem", left: "1rem",
            background: "#0F1F14", color: "#C8A96E",
            fontFamily: "'Inter', sans-serif", fontSize: "0.65rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "0.3rem 0.7rem", borderRadius: "2px",
          }}>
            Sold {listing.representedSide === "buyer" ? "· Buyer" : "· Seller"}
          </div>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#0F1F14", marginBottom: "0.25rem" }}>
          {formatListingPrice(listing.price)}
          {listing.status === "sold" && listing.closedDate && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#888", fontWeight: 400, marginLeft: "0.5rem" }}>
              {listing.closedDate}
            </span>
          )}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#444", marginBottom: "0.75rem" }}>
          {listing.address}, {listing.city}
        </div>
        <div style={{ display: "flex", gap: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#888" }}>
          <span>{listing.beds} bd</span>
          <span>{listing.baths} ba</span>
          <span>{formatSquareFootage(listing.sqft)} sqft</span>
        </div>
        {listing.mlsNumber && (
          <div style={{ marginTop: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#bbb", letterSpacing: "0.06em" }}>
            MLS #{listing.mlsNumber}
          </div>
        )}
      </div>
    </div>
  );
}

function ListingsSection() {
  // TODO: When MLS integration is ready, replace mockActiveListings with:
  // const { listings, isLoading } = useLiveListings("active", AGENT_MLS_ID);
  const activeListings = mockActiveListings;

  return (
    <section style={{ background: "#F5F2ED", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2A4A35", marginBottom: "0.5rem" }}>
            Current listings
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#0F1F14", margin: "0 0 1.5rem" }}>
            Available Now
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {activeListings.map(listingItem => (
            <ListingCard key={listingItem.id} listing={listingItem} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SoldDealsSection() {
  // TODO: When MLS integration is ready, replace mockSoldListings with:
  // const { listings, isLoading } = useLiveListings("sold", AGENT_MLS_ID);
  const soldListings = mockSoldListings;

  return (
    <section style={{ background: "#fff", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2A4A35", marginBottom: "0.5rem" }}>
            Track record
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#0F1F14", margin: 0 }}>
            Recently Sold
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {soldListings.map(soldListingItem => (
            <ListingCard key={soldListingItem.id} listing={soldListingItem} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div style={{
      background: "rgba(245,242,237,0.05)",
      border: "1px solid rgba(200,169,110,0.15)",
      borderRadius: "2px",
      padding: "2rem",
    }}>
      <div style={{ color: "#C8A96E", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>
        ★★★★★
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, color: "#F5F2ED", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>
        "{testimonial.text}"
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#C8A96E" }}>
          {testimonial.reviewerName}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(245,242,237,0.5)", letterSpacing: "0.06em" }}>
          {testimonial.reviewerRole}
        </span>
      </div>
    </div>
  );
}

// TODO: swap this section for ReviewsSection once Google reviews are live
function TestimonialsSection() {
  return (
    <section style={{ background: "#0F1F14", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "0.5rem" }}>
            Client testimonials
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#F5F2ED", margin: 0 }}>
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
    <section style={{ background: "#F5F2ED", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2A4A35", marginBottom: "1rem" }}>
            Service area
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#0F1F14", marginBottom: "1.5rem" }}>
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
        {/* Map placeholder — wire up Google Maps JS SDK or Mapbox here */}
        <div style={{
          height: "320px", background: "#e8e4dc", borderRadius: "2px",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(0,0,0,0.08)",
          flexDirection: "column", gap: "0.75rem",
        }}>
          <div style={{ fontSize: "2rem", opacity: 0.3 }}>🗺</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#888", textAlign: "center", lineHeight: 1.6, margin: 0 }}>
            {/* TODO: Replace with Google Maps JS SDK embed */}
            Map embed goes here.<br />
            See Google Maps JS SDK or Mapbox GL JS.
          </p>
        </div>
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
      // TODO: Replace this with a real POST to your serverless endpoint.
      // The endpoint should call SendGrid/SES to email the agent
      // and Twilio/SNS to text them.
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formValues),
      // });
      // if (!response.ok) throw new Error("Submission failed");
      await new Promise(resolve => setTimeout(resolve, 1000)); // mock delay
      setSubmitStatus("success");
      setFormValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
    background: "rgba(245,242,237,0.06)",
    border: "1px solid rgba(200,169,110,0.2)",
    borderRadius: "2px", color: "#F5F2ED",
    padding: "0.85rem 1rem", outline: "none",
  };

  return (
    <section id="contact" style={{ background: "#0F1F14", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "1rem", textAlign: "center" }}>
          Get in touch
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#F5F2ED", textAlign: "center", marginBottom: "3rem" }}>
          Ready to get started?
        </h2>

        {submitStatus === "success" ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ color: "#C8A96E", fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#F5F2ED" }}>
              Message sent. Drake will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,237,0.4)", display: "block", marginBottom: "0.4rem" }}>
                  Name
                </label>
                <input
                  type="text" required placeholder="Jane Smith"
                  value={formValues.name} onChange={handleFieldChange("name")}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,237,0.4)", display: "block", marginBottom: "0.4rem" }}>
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
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,237,0.4)", display: "block", marginBottom: "0.4rem" }}>
                Email
              </label>
              <input
                type="email" required placeholder="jane@email.com"
                value={formValues.email} onChange={handleFieldChange("email")}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,237,0.4)", display: "block", marginBottom: "0.4rem" }}>
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
                background: "#C8A96E", color: "#0F1F14",
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
    <footer style={{ background: "#080F0A", padding: "2.5rem", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#C8A96E", marginBottom: "0.5rem" }}>
              {AGENT.name}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(245,242,237,0.4)", lineHeight: 1.7 }}>
              {AGENT.brokerageInfo.name}<br />
              {AGENT.brokerageInfo.address}<br />
              {AGENT.brokerageInfo.phone}<br />
              License #{AGENT.licenseNumber}
            </div>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(245,242,237,0.25)", maxWidth: "400px", lineHeight: 1.7, textAlign: "right" }}>
            All listing information is deemed reliable but not guaranteed and should be independently verified. Property data sourced from the Regional MLS.
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(245,242,237,0.2)" }}>
            © {new Date().getFullYear()} {AGENT.name} · All rights reserved
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use"].map(linkLabel => (
              <a key={linkLabel} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(245,242,237,0.3)", textDecoration: "none" }}>
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
        body { background: #F5F2ED; }
        ::placeholder { color: rgba(245,242,237,0.25); }
        input:focus, textarea:focus { border-color: rgba(200,169,110,0.5) !important; }
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
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <ContactStrip />
      <AboutSection />
      <ListingsSection />
      <SoldDealsSection />
      <TestimonialsSection />
      <ServiceAreaSection />
      <ContactFormSection />
      <Footer />
    </>
  );
}
