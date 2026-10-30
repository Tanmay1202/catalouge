// src/lib/videoUtils.ts
// Utilities for parsing and displaying video links (YouTube / Instagram Reels)

export type VideoType = 'youtube' | 'instagram' | 'unknown';

/**
 * Extract a YouTube video ID from common URL patterns:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/shorts/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      // https://youtu.be/VIDEO_ID
      const id = parsed.pathname.slice(1);
      return id || null;
    }

    if (host === 'youtube.com') {
      // /shorts/VIDEO_ID or /embed/VIDEO_ID
      const pathMatch = parsed.pathname.match(/^\/(shorts|embed)\/([a-zA-Z0-9_-]{11})/);
      if (pathMatch) return pathMatch[2];

      // ?v=VIDEO_ID
      const v = parsed.searchParams.get('v');
      return v || null;
    }
  } catch {
    // Not a valid URL
  }
  return null;
}

/**
 * Determine the video platform from a URL.
 */
export function getVideoType(url: string): VideoType {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    if (host === 'youtube.com' || host === 'youtu.be') return 'youtube';
    if (host === 'instagram.com') return 'instagram';
  } catch {
    // ignore
  }
  return 'unknown';
}

/**
 * Get the thumbnail image URL for a YouTube video.
 * Returns null for non-YouTube URLs.
 */
export function getYouTubeThumbnailUrl(url: string): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Validate whether a URL is a supported video platform link.
 */
export function isSupportedVideoUrl(url: string): boolean {
  return getVideoType(url) !== 'unknown';
}
