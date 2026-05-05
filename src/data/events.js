/**
 * Static fallback events data.
 * In production, this is replaced by live data from the Google Sheets CMS
 * "Events" tab: date | title | description | category | time | location
 *
 * Categories: mass | sacrament | education | social | prayer | other
 */
export const events = [
  // Intentionally empty: event dates should come from the parish CMS.
  // This avoids publishing guessed or stale calendar items as if they were official.
];
