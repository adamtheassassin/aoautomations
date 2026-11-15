declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

/**
 * Fires a Meta Pixel standard event. The pixel base code is loaded by GTM,
 * so on a hard load fbq may not exist yet - poll for it instead of stubbing it
 * (a stub would stop GTM's base code from loading fbevents.js).
 */
export function trackFbq(
    event: string,
    params: Record<string, any> = {},
    eventId?: string,
    timeoutMs = 10000
) {
    if (typeof window === "undefined") return;
    const options = eventId ? { eventID: eventId } : undefined;
    const started = Date.now();

    const tryFire = () => {
        if (typeof window.fbq === "function") {
            window.fbq("track", event, params, options);
            return;
        }
        if (Date.now() - started < timeoutMs) {
            setTimeout(tryFire, 200);
        }
    };
    tryFire();
}

export function createEventId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
