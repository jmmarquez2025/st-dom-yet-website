/**
 * OptimizedImg — renders a <picture> element with WebP + JPG fallback.
 *
 * Automatically tries the .webp version of any .jpg source. If WebP isn't
 * available (hasn't been generated yet), the browser falls back to JPG.
 *
 * Props:
 *   src      — the original JPG URL (e.g. "/photos/foo-opt.jpg")
 *   alt      — alt text (required for a11y)
 *   ...rest  — passed through to <img> (loading, style, className, etc.)
 */
export default function OptimizedImg({ src, alt, ...rest }) {
  const webpSrc = src?.replace(/\.jpg$/i, ".webp");

  return (
    <picture>
      {webpSrc && webpSrc !== src && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img src={src} alt={alt} {...rest} />
    </picture>
  );
}
