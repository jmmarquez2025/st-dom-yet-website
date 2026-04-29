import { useState, useCallback, useEffect } from "react";
import * as store from "./store";

function useAdminSyncRefresh() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener("stdom:admin-synced", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("stdom:admin-synced", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return tick;
}

/**
 * Hook for visitor-facing components.
 * Returns the single announcement (banner or popup) that should display right now.
 */
export function useVisibleAnnouncement(type) {
  useAdminSyncRefresh();
  if (type === "popup") return store.getActivePopup();
  if (type === "banner") return store.getActiveBanner();
  return null;
}

/**
 * Hook for the admin dashboard.
 * Returns all announcements + a refresh callback for after mutations.
 */
export function useAllAnnouncements() {
  const [, setTick] = useState(0);
  useAdminSyncRefresh();
  const refresh = useCallback(() => setTick((n) => n + 1), []);

  const announcements = store.getAll();

  return { announcements, refresh };
}
