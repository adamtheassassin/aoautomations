export function getCookie(name: string): string {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
}

export function getFbCookie(name: '_fbp' | '_fbc'): string {
    return getCookie(name);
}

export function getFbcFromUrl(): string {
    if (typeof window === 'undefined') return '';
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
        // Facebook's _fbc format: fb.1.creationTime.fbclid
        const creationTime = Date.now();
        return `fb.1.${creationTime}.${fbclid}`;
    }
    return '';
}
