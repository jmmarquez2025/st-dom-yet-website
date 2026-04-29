#!/bin/bash
# Generate WebP versions of all JPG photos for better performance.
# Run: npm run images
# Deprecated wrapper kept for muscle memory. The implementation now uses the
# sharp library directly to avoid the old sharp-cli dependency chain.

set -e

node scripts/generate-webp.mjs
