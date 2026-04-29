/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  St. Dominic Blog CMS — Google Apps Script
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  This script turns a Google Sheet + Google Docs into a blog CMS.
 *
 *  HOW IT WORKS:
 *  - A Google Sheet acts as the blog dashboard (one row per post)
 *  - Each post links to a Google Doc containing the actual article
 *  - This script reads the sheet, parses each linked Doc into
 *    the block-based JSON format the website expects, and serves
 *    everything as a JSON API
 *
 *  SETUP:
 *  1. Open the Blog Dashboard Google Sheet
 *  2. Go to Extensions → Apps Script
 *  3. Delete any existing code and paste this entire file
 *  4. Click "Run" → select "setupSheet" → Authorize when prompted
 *     (this formats the sheet with headers, dropdowns, colors)
 *  5. Click Deploy → New deployment → Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  6. Copy the web app URL into your site's .env file as VITE_BLOG_CMS_URL
 *  7. Project Settings → Script Properties → add key WRITE_TOKEN with the
 *     same passphrase used for the Staff Dashboard.
 *
 *  WRITING A POST:
 *  1. Create a new Google Doc — write normally using:
 *     - Heading 1 / Heading 2 for section headings
 *     - Normal text for paragraphs
 *     - Indented text (Increase indent) for blockquotes
 *     - Bulleted / numbered lists
 *     - Bold text within a paragraph becomes a "callout" block
 *       (use for schedule boxes, announcements, etc.)
 *     - For images: paste a public image URL on its own line,
 *       optionally followed by a caption line starting with "Caption:"
 *  2. Add a new row in the Sheet, fill in the metadata, paste the Doc URL
 *  3. Set "Published" checkbox to TRUE → it's live on the website
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ── Sheet column order (must match setupSheet headers) ──
var COLS = {
  ID: 0,         // Auto-generated slug
  TITLE: 1,
  TITLE_ES: 2,
  AUTHOR: 3,     // Dropdown: friar IDs
  DATE: 4,
  CATEGORY: 5,   // Dropdown: category keys
  TAGS: 6,       // Comma-separated
  HERO_IMAGE: 7, // URL or /photos/... path
  EXCERPT: 8,
  EXCERPT_ES: 9,
  FEATURED: 10,  // Checkbox
  PUBLISHED: 11, // Checkbox
  DOC_URL: 12,   // Link to Google Doc (English)
  DOC_URL_ES: 13 // Link to Google Doc (Spanish, optional)
};


/**
 * ━━━ WEB APP ENTRY POINT ━━━
 * Returns JSON array of all published blog posts.
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Posts");
    if (!sheet) {
      return jsonResponse({ error: "Sheet 'Posts' not found" });
    }

    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return jsonResponse([]);

    var posts = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      // Skip unpublished posts
      if (row[COLS.PUBLISHED] !== true) continue;

      // Skip rows with no title
      if (!row[COLS.TITLE]) continue;

      var post = {
        id: row[COLS.ID] || slugify(row[COLS.TITLE]),
        title: row[COLS.TITLE],
        titleEs: row[COLS.TITLE_ES] || "",
        author: row[COLS.AUTHOR] || "",
        date: formatDate(row[COLS.DATE]),
        category: row[COLS.CATEGORY] || "parish-news",
        tags: parseTags(row[COLS.TAGS]),
        heroImage: row[COLS.HERO_IMAGE] || "",
        excerpt: row[COLS.EXCERPT] || "",
        excerptEs: row[COLS.EXCERPT_ES] || "",
        featured: row[COLS.FEATURED] === true,
        published: true
      };

      // Parse English Google Doc
      var docId = extractDocId(row[COLS.DOC_URL]);
      if (docId) {
        try {
          post.body = parseGoogleDoc(docId);
        } catch (err) {
          post.body = [{ type: "paragraph", text: "[Content temporarily unavailable]" }];
          Logger.log("Error parsing doc " + docId + ": " + err);
        }
      } else {
        post.body = [{ type: "paragraph", text: post.excerpt }];
      }

      // Parse Spanish Google Doc (optional)
      var docIdEs = extractDocId(row[COLS.DOC_URL_ES]);
      if (docIdEs) {
        try {
          post.bodyEs = parseGoogleDoc(docIdEs);
        } catch (err) {
          post.bodyEs = null;
        }
      }

      posts.push(post);
    }

    // Sort by date descending (newest first)
    posts.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    return jsonResponse(posts);
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}


/**
 * ━━━ POST HANDLER — Create or update a blog post ━━━
 * Receives JSON from the website's blog composer form.
 * Adds or updates a row in the Posts sheet.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var expectedToken = PropertiesService.getScriptProperties().getProperty("WRITE_TOKEN");
    if (!expectedToken) {
      return jsonResponse({ error: "WRITE_TOKEN script property is not configured" });
    }
    if (!data.token || data.token !== expectedToken) {
      return jsonResponse({ error: "Unauthorized" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Posts");
    if (!sheet) {
      return jsonResponse({ error: "Sheet 'Posts' not found" });
    }

    // ── Handle delete action ──
    if (data.action === "delete" && data.id) {
      var allRows = sheet.getDataRange().getValues();
      for (var d = 1; d < allRows.length; d++) {
        if (allRows[d][COLS.ID] === data.id) {
          sheet.deleteRow(d + 1); // 1-indexed
          SpreadsheetApp.flush();
          return jsonResponse({ success: true, deleted: data.id });
        }
      }
      return jsonResponse({ error: "Post not found: " + data.id });
    }

    var id = data.id || slugify(data.title || "untitled");

    // Check if post already exists (update) or is new (append)
    var allData = sheet.getDataRange().getValues();
    var existingRow = -1;
    for (var i = 1; i < allData.length; i++) {
      if (allData[i][COLS.ID] === id) {
        existingRow = i + 1; // 1-indexed
        break;
      }
    }

    // If body blocks were included (written in the inline editor),
    // create a Google Doc from them and store the link
    var docUrl = data.docUrl || "";
    if (data.body && data.body.length > 0 && !docUrl) {
      var doc = DocumentApp.create(data.title || "Blog Post");
      var body = doc.getBody();
      body.clear();

      for (var b = 0; b < data.body.length; b++) {
        var block = data.body[b];
        switch (block.type) {
          case "heading":
            var heading = block.level === 3
              ? DocumentApp.ParagraphHeading.HEADING3
              : DocumentApp.ParagraphHeading.HEADING2;
            body.appendParagraph(block.text).setHeading(heading);
            break;

          case "quote":
            var qp = body.appendParagraph(block.text);
            qp.setIndentStart(36);
            qp.setIndentFirstLine(36);
            if (block.attribution) {
              var ap = body.appendParagraph("\u2014 " + block.attribution);
              ap.setIndentStart(36);
              ap.setIndentFirstLine(36);
            }
            break;

          case "callout":
            var cp = body.appendParagraph(block.text);
            cp.editAsText().setBold(true);
            break;

          case "list":
            if (block.items) {
              for (var li = 0; li < block.items.length; li++) {
                body.appendListItem(block.items[li]);
              }
            }
            break;

          case "image":
            body.appendParagraph(block.src);
            if (block.caption) {
              body.appendParagraph("Caption: " + block.caption);
            }
            break;

          default: // paragraph
            body.appendParagraph(block.text || "");
            break;
        }
      }

      doc.saveAndClose();

      // Make the doc viewable by anyone with the link
      var docFile = DriveApp.getFileById(doc.getId());
      docFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      docUrl = doc.getUrl();
    }

    // Build the row values
    var tags = Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || "");
    var rowValues = [
      id,
      data.title || "",
      data.titleEs || "",
      data.author || "",
      data.date || formatDate(new Date()),
      data.category || "parish-news",
      tags,
      data.heroImage || "",
      data.excerpt || "",
      data.excerptEs || "",
      data.featured === true,
      data.published === true,
      docUrl,
      data.docUrlEs || ""
    ];

    if (existingRow > 0) {
      // Update existing row
      sheet.getRange(existingRow, 1, 1, rowValues.length).setValues([rowValues]);
    } else {
      // Append new row
      sheet.appendRow(rowValues);
    }

    SpreadsheetApp.flush();

    return jsonResponse({ success: true, id: id });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}


/**
 * ━━━ GOOGLE DOC PARSER ━━━
 * Converts a Google Doc into the block-based JSON format:
 *   { type: "paragraph" | "heading" | "quote" | "callout" | "list" | "image", ... }
 */
function parseGoogleDoc(docId) {
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();
  var blocks = [];
  var numChildren = body.getNumChildren();
  var isFirstParagraph = true;
  var pendingListItems = [];

  for (var i = 0; i < numChildren; i++) {
    var child = body.getChild(i);
    var childType = child.getType();

    // ── List items: collect consecutive items into one block ──
    if (childType === DocumentApp.ElementType.LIST_ITEM) {
      var listItem = child.asListItem();
      var listText = listItem.getText().trim();
      if (listText) {
        pendingListItems.push(listText);
      }
      continue;
    }

    // Flush any collected list items
    if (pendingListItems.length > 0) {
      blocks.push({ type: "list", items: pendingListItems });
      pendingListItems = [];
    }

    if (childType !== DocumentApp.ElementType.PARAGRAPH) continue;

    var para = child.asParagraph();
    var text = para.getText().trim();
    var heading = para.getHeading();

    // Skip empty paragraphs
    if (!text) continue;

    // ── Headings ──
    if (heading === DocumentApp.ParagraphHeading.HEADING1 ||
        heading === DocumentApp.ParagraphHeading.HEADING2) {
      blocks.push({ type: "heading", text: text, level: 2 });
      continue;
    }
    if (heading === DocumentApp.ParagraphHeading.HEADING3 ||
        heading === DocumentApp.ParagraphHeading.HEADING4) {
      blocks.push({ type: "heading", text: text, level: 3 });
      continue;
    }

    // ── Image URLs (line that starts with http and ends with image extension) ──
    if (/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(text)) {
      var imgBlock = { type: "image", src: text, alt: "" };
      // Check next paragraph for a caption
      if (i + 1 < numChildren) {
        var next = body.getChild(i + 1);
        if (next.getType() === DocumentApp.ElementType.PARAGRAPH) {
          var nextText = next.asParagraph().getText().trim();
          if (nextText.toLowerCase().indexOf("caption:") === 0) {
            imgBlock.caption = nextText.substring(8).trim();
            imgBlock.alt = imgBlock.caption;
            i++; // Skip the caption paragraph
          }
        }
      }
      blocks.push(imgBlock);
      continue;
    }

    // ── Blockquotes: indented paragraphs ──
    var indent = para.getIndentStart();
    if (indent && indent > 0) {
      var quoteBlock = { type: "quote", text: text };
      // Check if next indented line is an attribution (starts with em-dash, en-dash, or hyphen)
      if (i + 1 < numChildren) {
        var nextChild = body.getChild(i + 1);
        if (nextChild.getType() === DocumentApp.ElementType.PARAGRAPH) {
          var nextPara = nextChild.asParagraph();
          var nextText2 = nextPara.getText().trim();
          var nextIndent = nextPara.getIndentStart();
          if (nextIndent > 0 && /^[\u2014\u2013-]/.test(nextText2)) {
            quoteBlock.attribution = nextText2.replace(/^[\u2014\u2013-]\s*/, "");
            i++; // Skip the attribution line
          }
        }
      }
      blocks.push(quoteBlock);
      continue;
    }

    // ── Callouts: paragraphs that are entirely bold ──
    var firstChild2 = para.getNumChildren() > 0 ? para.getChild(0) : null;
    if (firstChild2 && firstChild2.getType() === DocumentApp.ElementType.TEXT) {
      var textEl = firstChild2.asText();
      if (textEl.isBold(0) && text.length > 30) {
        blocks.push({ type: "callout", text: text });
        continue;
      }
    }

    // ── Normal paragraph ──
    var paragraphBlock = { type: "paragraph", text: text };
    if (isFirstParagraph) {
      paragraphBlock.dropCap = true;
      isFirstParagraph = false;
    }
    blocks.push(paragraphBlock);
  }

  // Flush remaining list items
  if (pendingListItems.length > 0) {
    blocks.push({ type: "list", items: pendingListItems });
  }

  return blocks;
}


/**
 * ━━━ SHEET SETUP ━━━
 * Run this once to format the Google Sheet beautifully.
 * Creates the "Posts" tab with headers, colors, dropdowns, and conditional formatting.
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Create or get the "Posts" tab
  var sheet = ss.getSheetByName("Posts");
  if (!sheet) {
    sheet = ss.insertSheet("Posts");
  }

  // ── Headers ──
  var headers = [
    "ID (slug)", "Title", "Title (Spanish)", "Author",
    "Date", "Category", "Tags", "Hero Image URL",
    "Excerpt", "Excerpt (Spanish)",
    "Featured", "Published",
    "Doc Link (English)", "Doc Link (Spanish)"
  ];
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);

  // ── Style header row ──
  headerRange.setBackground("#6B1D2A");      // Dominican burgundy
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Arial");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.setRowHeight(1, 40);

  // ── Freeze header ──
  sheet.setFrozenRows(1);

  // ── Column widths ──
  sheet.setColumnWidth(1, 180);  // ID
  sheet.setColumnWidth(2, 280);  // Title
  sheet.setColumnWidth(3, 250);  // Title ES
  sheet.setColumnWidth(4, 160);  // Author
  sheet.setColumnWidth(5, 110);  // Date
  sheet.setColumnWidth(6, 130);  // Category
  sheet.setColumnWidth(7, 200);  // Tags
  sheet.setColumnWidth(8, 250);  // Hero Image
  sheet.setColumnWidth(9, 300);  // Excerpt
  sheet.setColumnWidth(10, 300); // Excerpt ES
  sheet.setColumnWidth(11, 80);  // Featured
  sheet.setColumnWidth(12, 80);  // Published
  sheet.setColumnWidth(13, 250); // Doc URL
  sheet.setColumnWidth(14, 250); // Doc URL ES

  // ── Data validation: Author dropdown ──
  var authorRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "frassati-davis",
      "charles-rooney"
    ], true)
    .setAllowInvalid(false)
    .setHelpText("Select the author's ID")
    .build();
  sheet.getRange(2, COLS.AUTHOR + 1, 100, 1).setDataValidation(authorRule);

  // ── Data validation: Category dropdown ──
  var categoryRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "homilies",
      "dominican-life",
      "parish-news",
      "theology",
      "community"
    ], true)
    .setAllowInvalid(false)
    .setHelpText("Select a blog category")
    .build();
  sheet.getRange(2, COLS.CATEGORY + 1, 100, 1).setDataValidation(categoryRule);

  // ── Checkboxes for Featured & Published ──
  var checkRule = SpreadsheetApp.newDataValidation()
    .requireCheckbox()
    .build();
  sheet.getRange(2, COLS.FEATURED + 1, 100, 1).setDataValidation(checkRule);
  sheet.getRange(2, COLS.PUBLISHED + 1, 100, 1).setDataValidation(checkRule);

  // ── Date format ──
  sheet.getRange(2, COLS.DATE + 1, 100, 1).setNumberFormat("yyyy-mm-dd");

  // ── Alternating row colors ──
  var banding = sheet.getRange(1, 1, 101, headers.length);
  banding.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);

  // ── Conditional formatting: Published rows get green accent ──
  var publishedRange = sheet.getRange(2, 1, 100, headers.length);
  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$L2=TRUE')
    .setBackground("#E8F5E9")
    .setRanges([publishedRange])
    .build();
  var draftRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$L2=FALSE')
    .setBackground("#FFF8E1")
    .setRanges([publishedRange])
    .build();
  var rules = sheet.getConditionalFormatRules();
  rules.push(greenRule);
  rules.push(draftRule);
  sheet.setConditionalFormatRules(rules);

  // ── Auto-filter ──
  sheet.getRange(1, 1, 1, headers.length).createFilter();

  // ── Add a sample row ──
  var sampleRow = [
    "my-first-post",
    "My First Blog Post",
    "Mi Primera Entrada",
    "frassati-davis",
    "2026-04-12",
    "parish-news",
    "Parish Life, Welcome",
    "",
    "A brief summary of the post for the blog listing page.",
    "Un breve resumen de la entrada.",
    false,
    false,
    "https://docs.google.com/document/d/YOUR_DOC_ID/edit",
    ""
  ];
  sheet.getRange(2, 1, 1, sampleRow.length).setValues([sampleRow]);

  // ── Add instructions tab ──
  var instrSheet = ss.getSheetByName("Instructions");
  if (!instrSheet) {
    instrSheet = ss.insertSheet("Instructions");
  }

  var instructions = [
    ["ST. DOMINIC BLOG \u2014 HOW TO WRITE A POST"],
    [""],
    ["STEP 1: Write your article in Google Docs"],
    ["  - Use Heading 1 or Heading 2 for section headings"],
    ["  - Just write normally for paragraphs"],
    ["  - Indent a paragraph (Tab or Increase Indent) to make it a blockquote"],
    ["  - After a blockquote, add the source with a dash: \u2014 John 3:16"],
    ["  - Use bullet points for lists"],
    ["  - Bold an entire paragraph to make it a highlighted callout box"],
    ["  - Paste an image URL on its own line, then 'Caption: your text' on the next line"],
    [""],
    ["STEP 2: Fill in a new row on the Posts tab"],
    ["  - ID: a short URL-friendly name (e.g. 'easter-reflection-2026')"],
    ["  - Title: the full title of your post"],
    ["  - Author: select your name from the dropdown"],
    ["  - Date: when to publish (YYYY-MM-DD)"],
    ["  - Category: select from the dropdown"],
    ["  - Tags: comma-separated keywords"],
    ["  - Hero Image: paste a URL or leave empty for default"],
    ["  - Excerpt: 1-2 sentence summary for the listing page"],
    ["  - Doc Link: paste your Google Doc URL"],
    [""],
    ["STEP 3: Check the 'Published' box when ready"],
    ["  - The post will appear on the website within 5 minutes"],
    ["  - Uncheck to take it down (it becomes a draft)"],
    ["  - Check 'Featured' to pin it to the top of the blog"],
    [""],
    ["TIPS:"],
    ["  - The first paragraph automatically gets a drop cap (large first letter)"],
    ["  - Share your Google Docs with 'Anyone with the link can view'"],
    ["  - You can edit a published Doc anytime \u2014 changes appear within 5 minutes"],
    ["  - For Spanish posts: write a separate Doc and paste its link in 'Doc Link (Spanish)'"],
  ];

  instrSheet.getRange(1, 1, instructions.length, 1).setValues(instructions);
  instrSheet.setColumnWidth(1, 700);

  // Style the title
  instrSheet.getRange(1, 1).setFontSize(14).setFontWeight("bold").setFontColor("#6B1D2A");

  // Style step headers
  [3, 12, 23, 28].forEach(function (row) {
    instrSheet.getRange(row, 1).setFontWeight("bold").setFontSize(11).setFontColor("#333");
  });

  SpreadsheetApp.flush();
  Logger.log("Sheet setup complete! You can now deploy as a web app.");
}


// ═══════════════════════════════════════════════════════════════
// Utility functions
// ═══════════════════════════════════════════════════════════════

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function slugify(text) {
  return (text || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

function formatDate(val) {
  if (!val) return "";
  if (val instanceof Date) {
    var y = val.getFullYear();
    var m = ("0" + (val.getMonth() + 1)).slice(-2);
    var d = ("0" + val.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
  }
  return String(val);
}

function parseTags(val) {
  if (!val) return [];
  return String(val)
    .split(",")
    .map(function (t) { return t.trim(); })
    .filter(function (t) { return t.length > 0; });
}

function extractDocId(url) {
  if (!url) return null;
  var str = String(url);
  // Match Google Docs URL pattern: /d/DOC_ID/
  var match = str.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // If it's just a raw ID
  if (/^[a-zA-Z0-9_-]{20,}$/.test(str)) return str;
  return null;
}
