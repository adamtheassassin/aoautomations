declare global {
    interface Window {
        oaiq?: {
            (...args: any[]): void;
            q?: any[];
        };
    }
}

export function trackOaiq(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        if (typeof window.oaiq === 'function') {
            window.oaiq("measure", event, properties);
        } else {
            window.oaiq = window.oaiq || function (...args: any[]) {
                (window.oaiq!.q = window.oaiq!.q || []).push(args);
            };
            window.oaiq("measure", event, properties);
        }
    }
}
