# Content QA Checklist

Use this checklist before publishing schedule, bulletin, event, and staff updates.

## Movable Liturgical Dates

- Verify Holy Week and Easter dates from the Diocese of Youngstown or the USCCB calendar before adding event data.
- For 2026 in the Roman Catholic calendar: Palm Sunday is March 29, Holy Thursday is April 2, Good Friday is April 3, the Easter Vigil is April 4, and Easter Sunday is April 5.
- Do not keep seasonal placeholder events in `src/data/events.js`. If the CMS is not connected, it is better to show no events than guessed events.

## Parish Facts

- Confirm Mass, Confession, Adoration, office hours, phone, email, and address against the weekly bulletin or parish office.
- Confirm staff names, titles, and photos with the parish office before publishing.
- Check English and Spanish copy together when changing visitor-critical pages.

## Weekly Publishing

- Add bulletin announcements only after the parish office confirms them.
- Check dates, times, locations, and whether an event is recurring.
- Remove past temporary alerts and announcements.

## Release Checks

- Run `npm run lint`.
- Run `npm run build`.
- Spot-check `/`, `/mass-times`, `/visit`, `/bulletin`, `/events`, and `/contact` on desktop and mobile widths.
