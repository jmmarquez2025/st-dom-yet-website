import { useState, useCallback, useMemo } from "react";
import * as store from "./store";

/**
 * Hook for visitor-facing components.
 * Returns the single announcement (banner or popup) that should display right now.
 */
export function useVisibleAnnouncement(type) {
  // Read synchronously on mount — localStorage is instant.
  // No effect/polling needed; page navigations re-mount components.
  const announcement = useMemo(() => {
    if (type === "popup") return store.getActivePopup();
    if (type === "banner") return store.getActiveBanner();
    return null;
  }, [type]);

  return announcement;
}

/**
 * Hook for the admin dashboard.
 * Returns all announcements + a refresh callback for after mutations.
 */
export function useAllAnnouncements() {
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((n) => n + 1), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const announcements = useMemo(() => store.getAll(), [tick]);

  return { announcements, refresh };
}
