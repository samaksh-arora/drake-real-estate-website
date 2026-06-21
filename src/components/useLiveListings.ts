// ─────────────────────────────────────────────────────────────────
// useLiveListings.ts — MLS Integration Hook (STUB)
// ─────────────────────────────────────────────────────────────────
// This hook is intentionally not wired up yet. When you're ready to
// connect a live IDX/MLS feed (Spark API, Bridge Interactive, etc.),
// implement the body of this hook so it fetches from your proxy
// endpoint and returns data in the Listing[] shape defined in
// agentConfig.ts. ListingsGrid and SoldDeals will pick it up
// automatically once you swap the import.
//
// Recommended endpoint shape:
//   GET /api/listings?status=active&agentId=xxx
//   GET /api/listings?status=sold&agentId=xxx
//   → { listings: Listing[] }
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import type { Listing, ListingStatus } from "./agentConfig";

interface UseLiveListingsResult {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
}

// Swap this URL to your actual MLS proxy endpoint when ready.
// const MLS_PROXY_BASE_URL = "/api/listings";

export function useLiveListings(
  status: ListingStatus,
  agentMlsId: string
): UseLiveListingsResult {
  const [listings] = useState<Listing[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Remove this early return once the MLS proxy endpoint is live.
    // Until then, the components fall back to the mock data arrays in agentConfig.ts.
    console.info("[useLiveListings] MLS integration not yet configured — using mock data.");
    return;

    // ── Live fetch (uncomment when ready) ──────────────────────────
    // setIsLoading(true);
    // setError(null);
    // const queryParams = new URLSearchParams({ status, agentId: agentMlsId });
    // fetch(`${MLS_PROXY_BASE_URL}?${queryParams}`)
    //   .then((response) => {
    //     if (!response.ok) throw new Error(`MLS API returned ${response.status}`);
    //     return response.json();
    //   })
    //   .then((responseData: { listings: Listing[] }) => {
    //     setListings(responseData.listings);
    //   })
    //   .catch((fetchError: Error) => {
    //     setError(fetchError.message);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, [status, agentMlsId]);

  return { listings, isLoading, error };
}
