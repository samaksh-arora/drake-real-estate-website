// ─────────────────────────────────────────────────────────────────
// useGoogleReviews.ts
// ─────────────────────────────────────────────────────────────────
// Fetches review data from your serverless proxy at /api/reviews.
// The proxy calls Google Places API server-side so the API key
// never touches the client bundle.
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export interface GoogleReview {
  reviewerName: string;
  reviewerPhotoUrl?: string;
  rating: number;           // 1–5
  relativeTimeDescription: string; // e.g. "3 months ago"
  text: string;
}

export interface GoogleReviewsData {
  overallRating: number;
  totalReviewCount: number;
  reviews: GoogleReview[];
}

export function useGoogleReviews(proxyUrl: string): {
  data: GoogleReviewsData | null;
  isLoading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(proxyUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Reviews API unavailable");
        return response.json();
      })
      .then((responseData: GoogleReviewsData) => {
        setData(responseData);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [proxyUrl]);

  return { data, isLoading, error };
}
