// ─────────────────────────────────────────────────────────────────
// AGENT CONFIGURATION — DRAKE O'DONNELL
// ─────────────────────────────────────────────────────────────────
// TODO: Replace heroBackgroundUrl with real hero photo from Drake.
//       Headshot is using Drake's photo from src/assets/drake-headshot.jpeg

export const agentConfig = {
  name: "Drake O'Donnell",
  title: "REALTOR®",
  brokerage: "NATOD Management",
  licenseNumber: "Michigan 6501460024",
  headshotUrl: "/src/assets/drake-headshot.jpeg",
  heroBackgroundUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
  bio: `I specialize in Detroit real estate — helping investors, first-time buyers, and families find properties with real value and long-term potential. From move-in ready homes to renovation opportunities, I know the Detroit west side market and I get deals closed.`,
  specializations: ["Investment Properties", "First-Time Buyers", "Renovation Opportunities", "Land Contracts", "Detroit West Side"],
  languages: ["English"],

  contact: {
    phone: "(313) 693-0984",
    // TODO: Confirm email — currently using placeholder
    email: "drake@natodmanagement.com",
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

  serviceAreas: ["Detroit", "Auburn Hills", "Highland Park", "Warren", "Pontiac", "Westland"],

  // Google Places API — proxy through your serverless function
  // GET /api/reviews → returns { rating, reviewCount, reviews[] }
  googlePlacesProxyUrl: "/api/reviews",

  brokerageInfo: {
    name: "NATOD Management",
    address: "Auburn Hills, MI", // TODO: Full address unknown
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
    reviewerName: "Client Name",
    reviewerRole: "Client Type · Location",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    reviewerName: "Client Name",
    reviewerRole: "Client Type · Location",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    reviewerName: "Client Name",
    reviewerRole: "Client Type · Location",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    reviewerName: "Client Name",
    reviewerRole: "Client Type · Location",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
