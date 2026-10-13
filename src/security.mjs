export const contentSecurityPolicy = "default-src 'none'; script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'none'; frame-src https://maps.google.com https://www.google.com; object-src 'none'; base-uri 'none'; form-action 'none'; upgrade-insecure-requests";
export const securityHeaders = {
  'Content-Security-Policy': contentSecurityPolicy + "; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};
export function safeUrl(value, { external = false } = {}) {
  if (typeof value !== 'string' || /[\u0000-\u0020\u007f\\]/.test(value)) throw new Error('URL inválida');
  if (!external && (/^\/(?!\/)/.test(value) || /^#[a-zA-Z0-9_-]+$/.test(value))) return value;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Link externo deve usar HTTPS, sem credenciais');
  return url.href;
}
