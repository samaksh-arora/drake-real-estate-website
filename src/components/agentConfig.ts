// ─────────────────────────────────────────────────────────────────
// AGENT CONFIGURATION — DRAKE O'DONNELL
// ─────────────────────────────────────────────────────────────────

import bigHouseImage from "../assets/big-house-image.jpeg";

export const agentConfig = {
  name: "Drake O'Donnell",
  title: "REALTOR®",
  brokerage: "NATOD Management",
  licenseNumber: "Michigan 6501460024",
  headshotUrl: "/drake-headshot.jpeg",
  heroBackgroundUrl: bigHouseImage,
  bio: `Hello, my name is Drake O'Donnell, and I'm a Metro Detroit based Real Estate professional helping homeowners sell their properties for maximum value. Born and raised in Livonia and deeply connected to the culture of Detroit and the surrounding communities, I bring a local's perspective and a modern approach to every listing I represent. In my first two years in the business I've closed over 50 transactions, a pace that reflects my commitment to my clients and my drive to deliver results. My strategy combines targeted social media marketing with a trusted network of qualified buyers to get your home in front of the right people quickly and efficiently. What sets me apart is my belief that real estate is relational, not transactional. I'm far more interested in having a genuine conversation about your goals than chasing a quick listing. When you list with me, you get a partner who will take the time to understand what matters most to you, price your home strategically, and negotiate every detail to protect your bottom line. I stay connected with every client I've ever worked with because the relationship doesn't end at the closing table, it starts there. I'd love the opportunity to earn your trust and help you achieve your real estate goals.`,
  specializations: ["Investment Properties", "Single Family Homes", "Multifamily Homes"],
  languages: ["English"],

  contact: {
    phone: "(313) 693-0984",
    email: "DrakeOD@natodmgt.com",
    instagram: "https://instagram.com/drakeodonnell_",
    facebook: "https://facebook.com/drake.o.donnell.2025",
    linkedin: "https://linkedin.com/in/drake-o'donnell-a7586a320",
  },

  stats: [
    { label: "Homes Sold (12 mo.)", value: "6" },
    { label: "Active Listings", value: "4" },
    { label: "Total Sold Volume (2024)", value: "$588K" },
    { label: "Avg. Days on Market", value: "TBD" }, // TODO: unknown
  ],

  serviceAreas: ["Oakland County", "Wayne County", "Macomb County"],

  // Google Places API — proxy through your serverless function
  // GET /api/reviews → returns { rating, reviewCount, reviews[] }
  googlePlacesProxyUrl: "/api/reviews",

  brokerageInfo: {
    name: "NATOD Management",
    address: "1801 N Opdyke Rd, Auburn Hills, MI 48236",
    phone: "(866) 515-1919",
    logoUrl: null, // set to a URL string if you have a logo
  },
};

// ─────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────
// TODO: Replace with real client testimonials

export interface Testimonial {
  reviewerName: string;
  reviewerRole: string; // e.g. "Home Seller · Birmingham"
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    reviewerName: "Jerry Givens",
    reviewerRole: "Home Seller · Pontiac, MI",
    text: "Drake did a great job from start to finish. He negotiated well and sold my house for the asking price. I absolutely would use him again in the future.",
  },
  {
    reviewerName: "jbrawnllc",
    reviewerRole: "Home Seller · Pontiac, MI",
    text: "Drake did an amazing job listing my homes for sale. Within the first few days, I had multiple offers. He really did his homework and made sure I was happy with the offers before moving forward.",
  },
  {
    reviewerName: "sulaiman massar",
    reviewerRole: "Home Seller · Westland, MI",
    text: "Working with Drake was an excellent experience from start to finish. He was professional, knowledgeable, and truly had my best interests in mind. Drake made everything feel smooth and straightforward.",
  },
  {
    reviewerName: "chinaashcrash",
    reviewerRole: "Investment Property Seller · Pontiac, MI",
    text: "Drake completely changed how the property was being positioned. He really understood the investment angle, the cashflow, and the tenant situation. He took over and got results.",
  },
];

// ─────────────────────────────────────────────────────────────────
// MOCK LISTINGS DATA (PLACEHOLDER — UPDATE WITH REAL MLS DATA)
// ─────────────────────────────────────────────────────────────────
// TODO: Replace with real MLS listings from your brokerage
// TODO: Replace with a live MLS/IDX API call when ready
// When you're ready, implement the useLiveListings hook in
// src/hooks/useLiveListings.ts and swap it in to ListingsGrid.tsx.
// The shape of each object below is the contract that hook must match.
// ─────────────────────────────────────────────────────────────────

export type ListingStatus = "active" | "sold";

export interface Listing {
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
  closedDate?: string;        // sold listings only
  representedSide?: "buyer" | "seller"; // sold listings only
}

export const mockActiveListings: Listing[] = [
  {
    id: "active-1",
    status: "active",
    price: 0,
    address: "Lorem Ipsum Property 1",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1250,
    photoUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    mlsNumber: "PLACEHOLDER01",
  },
  {
    id: "active-2",
    status: "active",
    price: 0,
    address: "Lorem Ipsum Property 2",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1320,
    photoUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    mlsNumber: "PLACEHOLDER02",
  },
  {
    id: "active-3",
    status: "active",
    price: 0,
    address: "Lorem Ipsum Property 3",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1440,
    photoUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    mlsNumber: "PLACEHOLDER03",
  },
  {
    id: "active-4",
    status: "active",
    price: 0,
    address: "Lorem Ipsum Property 4",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1380,
    photoUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    mlsNumber: "PLACEHOLDER04",
  },
];

export const mockSoldListings: Listing[] = [
  {
    id: "sold-1",
    status: "sold",
    price: 0,
    address: "Lorem Ipsum Property 1",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1200,
    photoUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    closedDate: "TBD",
    representedSide: "seller",
  },
  {
    id: "sold-2",
    status: "sold",
    price: 0,
    address: "Lorem Ipsum Property 2",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1300,
    photoUrl: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80",
    closedDate: "TBD",
    representedSide: "buyer",
  },
  {
    id: "sold-3",
    status: "sold",
    price: 0,
    address: "Lorem Ipsum Property 3",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1350,
    photoUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    closedDate: "TBD",
    representedSide: "seller",
  },
  {
    id: "sold-4",
    status: "sold",
    price: 0,
    address: "Lorem Ipsum Property 4",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1280,
    photoUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    closedDate: "TBD",
    representedSide: "buyer",
  },
  {
    id: "sold-5",
    status: "sold",
    price: 0,
    address: "Lorem Ipsum Property 5",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1310,
    photoUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    closedDate: "TBD",
    representedSide: "seller",
  },
  {
    id: "sold-6",
    status: "sold",
    price: 0,
    address: "Lorem Ipsum Property 6",
    city: "Detroit",
    state: "MI",
    zip: "48000",
    beds: 3,
    baths: 1,
    sqft: 1400,
    photoUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    closedDate: "TBD",
    representedSide: "seller",
  },
];
