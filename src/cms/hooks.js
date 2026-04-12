import { useState, useEffect } from "react";
import { fetchStaff, fetchSchedule, fetchMinistries, fetchAnnouncements, fetchEvents, fetchBulletins, fetchBlogPosts } from "./client";
import { friars as staticFriars, staff as staticStaff } from "../data/staff";
import { sundayMass, dailyMass, confession, adoration } from "../data/schedule";
import { ministries as staticMinistries } from "../data/ministries";
import { announcements as staticAnnouncements } from "../data/announcements";
import { events as staticEvents } from "../data/events";
import { bulletins as staticBulletins } from "../data/bulletins";
import { blogPosts as staticBlogPosts } from "../data/blog";

/**
 * Generic CMS hook. Tries the CMS fetch first, falls back to static data.
 * Returns { data, loading, isLive } where isLive indicates whether data
 * came from the CMS (true) or static fallbacks (false).
 */
function useCmsData(fetcher, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetcher().then((result) => {
      if (!cancelled && result) {
        setData(result);
        setIsLive(true);
      }
      if (!cancelled) setLoading(false);
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, isLive };
}

/** Staff data — returns { friars, staff } */
export function useStaff() {
  return useCmsData(fetchStaff, { friars: staticFriars, staff: staticStaff });
}

/** Schedule data — returns { sundayMass, dailyMass, confession, adoration } */
export function useSchedule() {
  return useCmsData(fetchSchedule, { sundayMass, dailyMass, confession, adoration });
}

/** Ministries list */
export function useMinistries() {
  return useCmsData(fetchMinistries, staticMinistries);
}

/** Announcements — falls back to static sample data */
export function useAnnouncements() {
  return useCmsData(fetchAnnouncements, staticAnnouncements);
}

/** Events — falls back to static sample data */
export function useEvents() {
  return useCmsData(fetchEvents, staticEvents);
}

/** Bulletin archive — falls back to static sample data */
export function useBulletins() {
  return useCmsData(fetchBulletins, staticBulletins);
}

/**
 * Blog posts — tries the Google Docs CMS first, falls back to static sample posts.
 * CMS posts are merged with static posts (CMS takes precedence on matching IDs).
 */
export function useBlogPosts() {
  const [data, setData] = useState(staticBlogPosts);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchBlogPosts().then((cmsPosts) => {
      if (!cancelled && cmsPosts && cmsPosts.length > 0) {
        // Merge: CMS posts first, then static posts not in CMS
        const cmsIds = new Set(cmsPosts.map((p) => p.id));
        const merged = [
          ...cmsPosts,
          ...staticBlogPosts.filter((p) => !cmsIds.has(p.id)),
        ];
        setData(merged);
        setIsLive(true);
      }
      if (!cancelled) setLoading(false);
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, isLive };
}
