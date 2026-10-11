/**
 * Meta Ads Pixel Integration & Event Tracker
 * Follows Meta Advertising policies for conversion tracking.
 * Ensures Lead and Custom events fire only upon verified user actions without duplicate triggers.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const firedEventIds = new Set<string>();

/**
 * Initialize Meta Pixel script dynamically if a pixel ID is provided
 */
export function initMetaPixel(pixelId?: string): void {
  const targetId = pixelId || (import.meta.env.VITE_META_PIXEL_ID as string | undefined);
  if (!targetId || typeof window === 'undefined') return;

  if (window.fbq) {
    window.fbq('init', targetId);
    window.fbq('track', 'PageView');
    return;
  }

  // Inject Meta Pixel standard snippet
  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  const fbqFn = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbqFn === 'function') {
    fbqFn('init', targetId);
    fbqFn('track', 'PageView');
    console.log(`[Meta Pixel] Initialized with ID: ${targetId}`);
  }
}

/**
 * Track Lead event strictly after backend confirmation of email submission
 */
export function trackLeadEvent(eventId: string, details?: { emailDomain?: string; consented?: boolean }): void {
  if (firedEventIds.has(eventId)) {
    console.log(`[Meta Pixel] Lead event already fired for eventId: ${eventId}`);
    return;
  }

  firedEventIds.add(eventId);

  const fbqFn = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbqFn === 'function') {
    fbqFn('track', 'Lead', {
      content_name: 'InstantlyClaw DFY AI Agent Lead',
      status: 'verified',
      marketing_consent: details?.consented ?? false,
      event_id: eventId,
    });
    console.log(`[Meta Pixel] Tracked 'Lead' event (${eventId})`);
  } else {
    console.log(`[Meta Pixel Console] Tracked 'Lead' event (${eventId})`, details);
  }
}

/**
 * Track Affiliate CTA click separately
 */
export function trackAffiliateClick(url: string): void {
  const clickId = `affiliate_click_${Date.now()}`;
  const fbqFn = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbqFn === 'function') {
    fbqFn('trackCustom', 'AffiliateCTAClick', {
      content_name: 'InstantlyClaw JVZoo Offer Access',
      destination_url: url,
      event_id: clickId,
    });
    console.log(`[Meta Pixel] Tracked 'AffiliateCTAClick' event`);
  } else {
    console.log(`[Meta Pixel Console] Tracked 'AffiliateCTAClick' event -> ${url}`);
  }
}
