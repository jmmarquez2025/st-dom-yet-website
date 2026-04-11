import { useState, useEffect } from "react";
import { fetchStaff, fetchSchedule, fetchMinistries, fetchAnnouncements, fetchEvents, fetchBulletins } from "./client";
import { friars as staticFriars, staff as staticStaff } from "../data/staff";
import { sundayMass, dailyMass, confession, adoration } from "../data/schedule";
import { ministries as staticMinistries } from "../data/ministries";
import { announcements as staticAnnouncements } from "../data/announcements";
import { events as staticEvents } from "../data/events";
import { bulletins as staticBulletins } from "../data/bulletins";

/**
 * Generic CMS hook. Tries the CMS fetch first, falls back to static data.
 */
function useCmsData(fetcher, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetcher().then((result) => {
      if (!cancelled && result) setData(result);
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
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
