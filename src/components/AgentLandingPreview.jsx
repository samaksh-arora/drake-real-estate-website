import { useState, useEffect } from "react";

const AGENT = {
  name: "Daniel Gossman",
  title: "REALTOR®",
  brokerage: "Compass Real Estate",
  licenseNumber: "SA123456789",
  headshotUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  heroBackgroundUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
  bio: `With over 12 years of experience in the Metro Detroit market, I specialize in helping families find homes that fit both their lifestyle and their long-term goals. Whether you're buying your first home or selling a property you've owned for decades, I bring local knowledge, clear communication, and a relentless work ethic to every transaction.`,
  specializations: ["First-Time Buyers", "Luxury Properties", "Investment Properties", "Relocation"],
  languages: ["English", "Spanish"],
  yearsExperience: 12,
  contact: { phone: "(248) 555-0192", email: "daniel.gossman@compass.com" },
  stats: [
    { label: "Homes Sold", sublabel: "last 12 months", value: "47" },
    { label: "Active Listings", sublabel: "currently", value: "12" },
    { label: "Avg. Sale Price", sublabel: "2024", value: "$412K" },
    { label: "Days on Market", sublabel: "avg.", value: "18" },
  ],
  serviceAreas: ["Oakland County", "Wayne County", "Macomb County"],
  brokerageInfo: {
    name: "Compass Real Estate",
    address: "300 W. Long Lake Rd, Suite 100, Bloomfield Hills, MI 48302",
    phone: "(248) 555-0100",
  },
};

const ACTIVE_LISTINGS = [
  { id: "a1", price: 549000, address: "4821 Maple Ridge Dr", city: "Birmingham", beds: 4, baths: 3, sqft: 2840, photoUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80", mlsNumber: "20240001" },
  { id: "a2", price: 389000, address: "112 Woodward Ave", city: "Royal Oak", beds: 3, baths: 2, sqft: 1950, photoUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", mlsNumber: "20240002" },
  { id: "a3", price: 729000, address: "8 Quarton Lake Dr", city: "Bloomfield Hills", beds: 5, baths: 4, sqft: 4100, photoUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", mlsNumber: "20240003" },
];

const SOLD_LISTINGS = [
  { id: "s1", price: 510000, address: "2203 Cranbrook Rd", city: "Bloomfield Hills", beds: 4, baths: 3, sqft: 2600, photoUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", closedDate: "March 2024", representedSide: "seller" },
  { id: "s2", price: 335000, address: "77 Sherman Blvd", city: "Royal Oak", beds: 3, baths: 2, sqft: 1750, photoUrl: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80", closedDate: "February 2024", representedSide: "buyer" },
  { id: "s3", price: 678000, address: "45 Lahser Rd", city: "Bloomfield Hills", beds: 5, baths: 4, sqft: 3800, photoUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", closedDate: "January 2024", representedSide: "seller" },
];

const REVIEWS = {
  overallRating: 5.0,
  totalReviewCount: 11,
  reviews: [
    { reviewerName: "Jerry Givens", rating: 5, time: "9/29/2025", text: "Drake did a great job from start to finish. He negotiated well and sold my house for the asking price. I absolutely would use him again in the future." },
    { reviewerName: "jbrawnllc", rating: 5, time: "1/17/2026", text: "Drake did an amazing job listing my homes for sale. Within the first few days, I had multiple offers. He really did his homework and made sure I was happy with the offers before moving forward." },
    { reviewerName: "sulaiman massar", rating: 5, time: "3/13/2026", text: "Working with Drake was an excellent experience from start to finish. He was professional, knowledgeable, and truly had my best interests in mind. Drake made everything feel smooth and straightforward." },
    { reviewerName: "Daniel Aiken", rating: 5, time: "11/6/2025", text: "Drake was extremely helpful when finding a rental house near the Wayne State campus. He showed me a variety of options online and came out many times to show the property and ensure that we loved our decision. Working with Drake was extremely easy and I recommend him to anyone who is looking to take action ASAP!" },
  ],
};

const fmt$ = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtSqft = (n) => new Intl.NumberFormat("en-US").format(n);
const stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

const C = {
  dark: "#6B3939",
  darker: "#3F2626",
  gold: "#DAA520",
  cream: "#E8E8E8",
  green: "#8B3A3A",
};

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@400;500&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }
body { background: ${C.cream}; }
::placeholder { color: rgba(232,232,232,0.25); }
input:focus, textarea:focus { border-color: rgba(218,165,32,0.5) !important; outline: none; }
`;

const serif = { fontFamily: "'Cormorant Garamond', serif" };
const sans = { fontFamily: "'Inter', sans-serif" };

function ListingCard({ listing, isSold }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 12px 32px rgba(107,57,57,0.12)" : "none" }}>
      <div style={{ position: "relative", paddingBottom: "80%", overflow: "hidden" }}>
        <img src={listing.photoUrl} alt={listing.address} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {isSold && (
          <div style={{ position: "absolute", top: "1rem", left: "1rem", background: C.dark, color: C.gold, ...sans, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.7rem", borderRadius: 2 }}>
            Sold · {listing.representedSide === "buyer" ? "Buyer" : "Seller"}
          </div>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ ...serif, fontSize: "1.5rem", fontWeight: 400, color: C.dark, marginBottom: "0.25rem" }}>
          {fmt$(listing.price)}
          {isSold && listing.closedDate && <span style={{ ...sans, fontSize: "0.7rem", color: "#888", fontWeight: 400, marginLeft: "0.5rem" }}>{listing.closedDate}</span>}
        </div>
        <div style={{ ...sans, fontSize: "0.82rem", color: "#444", marginBottom: "0.75rem" }}>{listing.address}, {listing.city}</div>
        <div style={{ display: "flex", gap: "1.25rem", ...sans, fontSize: "0.75rem", color: "#888" }}>
          <span>{listing.beds} bd</span><span>{listing.baths} ba</span><span>{fmtSqft(listing.sqft)} sqft</span>
        </div>
        {listing.mlsNumber && <div style={{ marginTop: "0.75rem", ...sans, fontSize: "0.65rem", color: "#bbb" }}>MLS #{listing.mlsNumber}</div>}
      </div>
    </div>
  );
}

function Section({ label, title, bg, titleColor, labelColor, children, id }) {
  return (
    <section id={id} style={{ background: bg, padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {label && <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: labelColor || C.green, marginBottom: "0.5rem" }}>{label}</p>}
        {title && <h2 style={{ ...serif, fontSize: "2.25rem", fontWeight: 400, color: titleColor || C.dark, marginBottom: "2.5rem" }}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

function SoldSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section style={{ background: "#fff", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "0 0 2.5rem 0",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}>
          <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Track record</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ ...serif, fontSize: "2.25rem", fontWeight: 400, color: C.dark, margin: 0, flex: 1 }}>Recently Sold</h2>
            <span style={{
              fontSize: "1.5rem",
              color: C.dark,
              transition: "transform 0.3s ease",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}>
              ▼
            </span>
          </div>
        </button>
        {isExpanded && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {SOLD_LISTINGS.map(l => <ListingCard key={l.id} listing={l} isSold={true} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export default function AgentPage() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setField = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    await new Promise(r => setTimeout(r, 1000));
    setSubmitStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputStyle = { width: "100%", ...sans, fontSize: "0.875rem", background: "rgba(232,232,232,0.06)", border: "1px solid rgba(218,165,32,0.2)", borderRadius: 2, color: C.cream, padding: "0.85rem 1rem", outline: "none" };

  return (
    <>
      <style>{fonts}</style>

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(107,57,57,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid rgba(218,165,32,0.15)` : "none", transition: "all 0.3s ease" }}>
        <span style={{ ...serif, fontSize: "1.25rem", color: C.gold, letterSpacing: "0.08em" }}>{AGENT.name}</span>
        <a href="#contact" style={{ ...sans, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, textDecoration: "none", border: `1px solid rgba(218,165,32,0.5)`, padding: "0.5rem 1.25rem", borderRadius: 2 }}>
          Get in Touch
        </a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${AGENT.heroBackgroundUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(107,57,57,0.95) 0%, rgba(107,57,57,0.7) 50%, rgba(107,57,57,0.45) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 2.5rem 5rem" }}>
          <div style={{ maxWidth: 860 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <img src={AGENT.headshotUrl} alt={AGENT.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(218,165,32,0.6)` }} />
              <div>
                <div style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold }}>{AGENT.title} · Verified Agent ✓</div>
                <div style={{ ...sans, fontSize: "0.78rem", color: "rgba(232,232,232,0.55)" }}>{AGENT.brokerage}</div>
              </div>
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 300, color: C.cream, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
              {AGENT.name}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: C.gold, fontSize: "0.95rem" }}>{stars(REVIEWS.overallRating)}</span>
                <span style={{ ...sans, fontSize: "0.78rem", color: "rgba(232,232,232,0.65)" }}>{REVIEWS.overallRating} · {REVIEWS.totalReviewCount} Google reviews</span>
              </div>
              <span style={{ color: "rgba(218,165,32,0.35)" }}>|</span>
              {AGENT.serviceAreas.slice(0, 4).map(a => (
                <span key={a} style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(232,232,232,0.55)", border: "1px solid rgba(232,232,232,0.18)", padding: "0.2rem 0.6rem", borderRadius: 2 }}>{a}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "1.5rem", right: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ ...sans, fontSize: "0.62rem", letterSpacing: "0.15em", color: "rgba(218,165,32,0.55)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(218,165,32,0.55), transparent)" }} />
        </div>
      </section>

      {/* Contact strip */}
      <div style={{ background: C.dark, padding: "1.25rem 2.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", borderBottom: `1px solid rgba(218,165,32,0.12)` }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          <a href={`tel:${AGENT.contact.phone}`} style={{ ...sans, fontSize: "0.85rem", color: C.cream, textDecoration: "none" }}>📞 {AGENT.contact.phone}</a>
          <a href={`mailto:${AGENT.contact.email}`} style={{ ...sans, fontSize: "0.85rem", color: C.cream, textDecoration: "none" }}>✉ {AGENT.contact.email}</a>
        </div>
        <a href="#contact" style={{ ...sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", background: C.gold, color: C.dark, padding: "0.6rem 1.5rem", borderRadius: 2, textDecoration: "none", fontWeight: 500 }}>
          Send a Message
        </a>
      </div>

      {/* About */}
      <section style={{ background: C.cream, padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.green, marginBottom: "1rem" }}>About</p>
            <h2 style={{ ...serif, fontSize: "2.4rem", fontWeight: 400, color: C.dark, lineHeight: 1.15, marginBottom: "1.5rem" }}>Local knowledge.<br/>Long-term results.</h2>
            <>
              <p style={{ ...sans, fontSize: "0.875rem", lineHeight: 1.85, color: "#444", marginBottom: "1.25rem" }}>
                Hello, my name is Drake O'Donnell, and I'm a Metro Detroit based Real Estate professional helping homeowners sell their properties for maximum value. Born and raised in Livonia and deeply connected to the culture of Detroit and the surrounding communities, I bring a local's perspective and a modern approach to every listing I represent.
              </p>
              <p style={{ ...sans, fontSize: "0.875rem", lineHeight: 1.85, color: "#444", marginBottom: "1.25rem" }}>
                In my first two years in the business I've closed over 50 transactions, a pace that reflects my commitment to my clients and my drive to deliver results. My strategy combines targeted social media marketing with a trusted network of qualified buyers to get your home in front of the right people quickly and efficiently.
              </p>
              <p style={{ ...sans, fontSize: "0.875rem", lineHeight: 1.85, color: "#444", marginBottom: "1.25rem" }}>
                What sets me apart is my belief that real estate is relational, not transactional. I'm far more interested in having a genuine conversation about your goals than chasing a quick listing. When you list with me, you get a partner who will take the time to understand what matters most to you, price your home strategically, and negotiate every detail to protect your bottom line.
              </p>
              <p style={{ ...sans, fontSize: "0.875rem", lineHeight: 1.85, color: "#444", marginBottom: "2rem" }}>
                I stay connected with every client I've ever worked with because the relationship doesn't end at the closing table, it starts there. I'd love the opportunity to earn your trust and help you achieve your real estate goals.
              </p>
            </>
            <div>
              <div style={{ ...serif, fontSize: "2.5rem", fontWeight: 300, color: C.dark }}>{AGENT.yearsExperience}</div>
              <div style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999" }}>Years experience</div>
            </div>
          </div>
          <div style={{ paddingTop: "3.5rem" }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, marginBottom: "0.75rem" }}>Specializations</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {AGENT.specializations.map(s => (
                  <span key={s} style={{ ...sans, fontSize: "0.78rem", padding: "0.4rem 0.9rem", border: `1px solid rgba(139,58,58,0.3)`, borderRadius: 2, color: C.green }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: C.dark, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "2.5rem", textAlign: "center" }}>By the numbers</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(218,165,32,0.12)" }}>
            {AGENT.stats.map((s, i) => (
              <div key={i} style={{ background: C.dark, padding: "2.5rem 1.5rem", textAlign: "center" }}>
                <div style={{ ...serif, fontSize: "3rem", fontWeight: 300, color: C.cream, lineHeight: 1 }}>{s.value}</div>
                <div style={{ ...sans, fontSize: "0.7rem", color: C.gold, letterSpacing: "0.06em", marginTop: "0.5rem" }}>{s.label}</div>
                <div style={{ ...sans, fontSize: "0.62rem", color: "rgba(232,232,232,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Listings */}
      <Section label="Current listings" title="Available Now" bg={C.cream}>
        {/* TODO: replace ACTIVE_LISTINGS with useLiveListings("active", agentMlsId) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {ACTIVE_LISTINGS.map(l => <ListingCard key={l.id} listing={l} isSold={false} />)}
        </div>
      </Section>

      {/* Sold */}
      <SoldSection />

      {/* Reviews */}
      <section style={{ background: C.dark, padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Google reviews</p>
              <h2 style={{ ...serif, fontSize: "2.25rem", fontWeight: 400, color: C.cream }}>What clients say</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ ...serif, fontSize: "3.25rem", fontWeight: 300, color: C.cream, lineHeight: 1 }}>{REVIEWS.overallRating}</div>
              <div style={{ color: C.gold, fontSize: "0.9rem" }}>{stars(REVIEWS.overallRating)}</div>
              <div style={{ ...sans, fontSize: "0.68rem", color: "rgba(232,232,232,0.35)", marginTop: "0.25rem" }}>{REVIEWS.totalReviewCount} reviews on Google</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
            {REVIEWS.reviews.map((r, i) => (
              <div key={i} style={{ background: "rgba(232,232,232,0.04)", border: `1px solid rgba(218,165,32,0.14)`, borderRadius: 2, padding: "1.75rem" }}>
                <div style={{ color: C.gold, fontSize: "0.85rem", letterSpacing: "0.06em", marginBottom: "0.875rem" }}>{stars(r.rating)}</div>
                <p style={{ ...serif, fontSize: "1.05rem", fontWeight: 300, color: C.cream, lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.25rem" }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ ...sans, fontSize: "0.78rem", color: C.gold }}>{r.reviewerName}</span>
                  <span style={{ ...sans, fontSize: "0.62rem", color: "rgba(232,232,232,0.28)" }}>{r.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="#" style={{ ...sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,232,232,0.4)", textDecoration: "none", borderBottom: "1px solid rgba(232,232,232,0.18)", paddingBottom: 2 }}>
              View all reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section style={{ background: C.cream, padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.green, marginBottom: "1rem" }}>Service area</p>
            <h2 style={{ ...serif, fontSize: "2.25rem", fontWeight: 400, color: C.dark, marginBottom: "1.5rem" }}>Metro Detroit & Suburbs</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {AGENT.serviceAreas.map(a => (
                <span key={a} style={{ ...sans, fontSize: "0.8rem", padding: "0.4rem 0.9rem", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, color: "#444" }}>{a}</span>
              ))}
            </div>
          </div>
          {/* TODO: Replace with Google Maps JS SDK or Mapbox GL JS */}
          <div style={{ height: 300, background: "#e8e4dc", borderRadius: 2, border: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ fontSize: "2rem", opacity: 0.25 }}>🗺</div>
            <p style={{ ...sans, fontSize: "0.75rem", color: "#aaa", textAlign: "center", lineHeight: 1.6, margin: 0 }}>Google Maps embed<br/>goes here</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" style={{ background: C.dark, padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "1rem", textAlign: "center" }}>Get in touch</p>
          <h2 style={{ ...serif, fontSize: "2.5rem", fontWeight: 400, color: C.cream, textAlign: "center", marginBottom: "3rem" }}>Ready to get started?</h2>
          {submitStatus === "success" ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <div style={{ color: C.gold, fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
              <p style={{ ...serif, fontSize: "1.25rem", color: C.cream }}>Message sent. Daniel will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ ...sans, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.35)", display: "block", marginBottom: "0.4rem" }}>Name</label>
                  <input type="text" required placeholder="Jane Smith" value={form.name} onChange={setField("name")} style={inputStyle} />
                </div>
                <div>
                  <label style={{ ...sans, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.35)", display: "block", marginBottom: "0.4rem" }}>Phone</label>
                  <input type="tel" placeholder="(248) 555-0100" value={form.phone} onChange={setField("phone")} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ ...sans, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.35)", display: "block", marginBottom: "0.4rem" }}>Email</label>
                <input type="email" required placeholder="jane@email.com" value={form.email} onChange={setField("email")} style={inputStyle} />
              </div>
              <div>
                <label style={{ ...sans, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,232,232,0.35)", display: "block", marginBottom: "0.4rem" }}>Message</label>
                <textarea required placeholder="I'm looking to buy / sell in..." value={form.message} onChange={setField("message")} rows={5} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <button type="submit" disabled={submitStatus === "sending"} style={{ ...sans, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", background: C.gold, color: C.dark, border: "none", borderRadius: 2, padding: "1rem", cursor: "pointer", fontWeight: 500, marginTop: "0.5rem", opacity: submitStatus === "sending" ? 0.7 : 1 }}>
                {submitStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: C.darker, padding: "2.5rem", borderTop: `1px solid rgba(218,165,32,0.1)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ ...serif, fontSize: "1.1rem", color: C.gold, marginBottom: "0.5rem" }}>{AGENT.name}</div>
              <div style={{ ...sans, fontSize: "0.72rem", color: "rgba(232,232,232,0.35)", lineHeight: 1.8 }}>
                {AGENT.brokerageInfo.name}<br/>
                {AGENT.brokerageInfo.address}<br/>
                License #{AGENT.licenseNumber}
              </div>
            </div>
            <div style={{ ...sans, fontSize: "0.68rem", color: "rgba(232,232,232,0.22)", maxWidth: 380, lineHeight: 1.7, textAlign: "right" }}>
              All listing information is deemed reliable but not guaranteed and should be independently verified. Property data sourced from the Regional MLS.
            </div>
          </div>
          <div style={{ borderTop: `1px solid rgba(218,165,32,0.1)`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ ...sans, fontSize: "0.62rem", color: "rgba(232,232,232,0.18)" }}>© {new Date().getFullYear()} {AGENT.name} · All rights reserved</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy", "Terms of Use"].map(l => (
                <a key={l} href="#" style={{ ...sans, fontSize: "0.62rem", color: "rgba(232,232,232,0.28)", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
