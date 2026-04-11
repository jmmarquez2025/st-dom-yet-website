#!/bin/bash
# Generate WebP versions of all JPG photos for better performance.
# Run: npm run images
# Requires: sharp-cli (already in devDependencies)

set -e

PHOTO_DIR="public/photos"
COUNT=0

echo "Generating WebP images..."

find "$PHOTO_DIR" -name "*.jpg" -type f | while read -r jpg; do
  webp="${jpg%.jpg}.webp"
  if [ ! -f "$webp" ] || [ "$jpg" -nt "$webp" ]; then
    npx sharp -i "$jpg" -o "$webp" --format webp --quality 80 2>/dev/null
    echo "  Created: $webp"
    COUNT=$((COUNT + 1))
  fi
done

echo "Done! WebP generation complete."
