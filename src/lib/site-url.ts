/** Production domain (always used for canonical + default OG when env is missing). */
export const PRODUCTION_URL = "https://salahaldin-portfolio.vercel.app";

/**
 * Resolves the site URL for the current deployment.
 * Preview deployments get their own host so /og.jpg and OG tags work on Vercel previews.
 */
export function getSiteUrl(): string {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) {
    const url = production.startsWith("http") ? production : `https://${production}`;
    return url.replace(/\/$/, "");
  }

  const preview = process.env.VERCEL_URL?.trim();
  if (preview) {
    return `https://${preview.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }

  return PRODUCTION_URL;
}

export function getOgImageUrl(): string {
  return `${getSiteUrl()}/og.jpg`;
}
