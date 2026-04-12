/**
 * Blog utility functions.
 */

/** Count words across all text blocks in a post body. */
function countWords(body) {
  if (!body) return 0;
  return body
    .filter((b) => b.type === "paragraph" || b.type === "heading" || b.type === "quote" || b.type === "callout")
    .reduce((sum, b) => sum + (b.text || "").split(/\s+/).filter(Boolean).length, 0);
}

/** Estimated reading time in minutes (238 wpm average). */
export function estimateReadingTime(body) {
  const words = countWords(body);
  return Math.max(1, Math.round(words / 238));
}

/** Format a date string "YYYY-MM-DD" to a human-readable format. */
export function formatBlogDate(dateStr, locale = "en") {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Get related posts by category first, then shared tags, then recency. */
export function getRelatedPosts(currentPost, allPosts, limit = 3) {
  const others = allPosts.filter((p) => p.id !== currentPost.id && p.published);

  const scored = others.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 10;
    const sharedTags = post.tags.filter((t) => currentPost.tags.includes(t)).length;
    score += sharedTags * 3;
    // Recency bonus (newer posts score slightly higher)
    const daysDiff = Math.abs(new Date(currentPost.date) - new Date(post.date)) / 86400000;
    score += Math.max(0, 5 - daysDiff / 30);
    return { ...post, _score: score };
  });

  return scored
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
}

/** Generate heading IDs for table of contents anchoring. */
export function generateHeadingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}
