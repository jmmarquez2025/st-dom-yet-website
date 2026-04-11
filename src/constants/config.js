/**
 * Site-wide configuration. Update these values to connect services.
 *
 * ── Contact Form (Google Sheets) ──
 * 1. Create a Google Sheet.
 * 2. Go to Extensions → Apps Script.
 * 3. Paste the following script:
 *
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([
 *        data.timestamp, data.name, data.email,
 *        data.phone, data.category, data.message
 *      ]);
 *      return ContentService
 *        .createTextOutput(JSON.stringify({ result: "success" }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 4. Click Deploy → New deployment → Web app.
 *    Execute as: Me | Who has access: Anyone
 * 5. Copy the URL below.
 *
 * ── WeShare Online Giving ──
 * When you have a WeShare account, paste the giving-page URL below.
 *
 * ── Google Sheets CMS ──
 * 1. Create a Google Sheet with tabs: Staff, Schedule, Ministries, Announcements
 *    (see src/cms/client.js for column definitions)
 * 2. File → Share → Publish to web → Entire Document → Publish
 * 3. Copy the Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
 * 4. Paste it below. The site will fetch live data from the sheet.
 *    If the sheet is unavailable, bundled static data is used as fallback.
 */

export const CONFIG = {
  // Google Apps Script web-app URL (leave empty to fall back to mailto)
  contactFormUrl: "",

  // WeShare online giving page
  weShareUrl: "",

  // Google Sheets CMS — paste your published Sheet ID here
  cmsSheetId: "",

  // Flipbook bulletin embed URL
  // Paste the share/embed URL from your flipbook service (FlipHTML5, Heyzine, Issuu, etc.)
  // Example: "https://online.fliphtml5.com/abcde/fghij/"
  bulletinUrl: "",

  // Parish info
  phone: "(330) 783-1900",
  phoneLink: "tel:+13307831900",
  fax: "(330) 783-2396",
  email: "office@saintdominic.org",
  address: "77 East Lucius Avenue",
  city: "Youngstown",
  state: "OH",
  zip: "44507",
  fullAddress: "77 East Lucius Avenue, Youngstown, OH 44507",
  officeHours: "Mon–Fri, 8:30 AM – 1:30 PM",
  mapsQuery: "77+East+Lucius+Ave,+Youngstown,+OH+44507",
};
