import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

/**
 * Searches for relevant YouTube educational videos matching the topic and chapter.
 * Gracefully handles missing keys, quota limits, and network errors.
 */
const getVideos = async (query) => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY;
  if (!apiKey || !query) {
    console.warn("YouTube API key or query missing, skipping video search.");
    return [];
  }

  // Clean the query: replace colons, underscores with spaces, remove redundant punctuation
  const sanitizedQuery = query
    .replace(/[:_\\/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Ensure "tutorial" or "guide" is included to target educational videos
  const educationalQuery = /tutorial|guide|course|learning/i.test(sanitizedQuery)
    ? sanitizedQuery
    : `${sanitizedQuery} tutorial`;

  const params = {
    part: "snippet",
    q: educationalQuery,
    maxResults: 1,
    type: "video",
    videoEmbeddable: "true",
    key: apiKey,
  };

  try {
    const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params,
      timeout: 8000,
    });
    return resp.data?.items || [];
  } catch (error) {
    console.warn(
      "YouTube video fetch error (quota exceeded, network or invalid key):",
      error?.response?.data?.error?.message || error.message
    );
    // Graceful fallback so course generation never fails due to video fetch
    return [];
  }
};

const service = {
  getVideos,
};

export default service;