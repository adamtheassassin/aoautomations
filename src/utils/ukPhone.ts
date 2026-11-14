/**
 * Validates a UK phone number. Returns an error message, or null when valid.
 */
export function getUkPhoneErrorMessage(phoneStr: string): string | null {
    const trimmed = phoneStr.trim();
    if (!trimmed) return "WhatsApp / phone number is required.";

    const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, "");

    // Must only contain digits and optional leading +
    if (!/^\+?\d+$/.test(cleaned)) {
        return "Phone number must only contain numbers.";
    }

    // UK national format starting with 0
    if (cleaned.startsWith("0") && !cleaned.startsWith("0044")) {
        // UK Mobile (07xxx) - exactly 11 digits
        if (cleaned.startsWith("07")) {
            if (cleaned.length < 11) {
                return `Missing digits (${cleaned.length}/11 digits). UK mobile numbers must have exactly 11 digits (e.g. 07123 456789).`;
            }
            if (cleaned.length > 11) {
                return `Too many digits (${cleaned.length}/11 digits). Please check your UK mobile number.`;
            }
            return null;
        }

        // UK Landline (01, 02, 03, 08) - 10 or 11 digits
        if (/^0[1238]/.test(cleaned)) {
            if (cleaned.length < 10) {
                return `Missing digits (${cleaned.length} digits). UK phone numbers must be 10 or 11 digits.`;
            }
            if (cleaned.length > 11) {
                return `Too many digits (${cleaned.length}/11 digits).`;
            }
            return null;
        }

        return "UK phone numbers must start with 07 (mobile) or 01/02/03 (landline).";
    }

    // UK international format starting with +44, 0044, or 44
    if (cleaned.startsWith("+44") || cleaned.startsWith("0044") || cleaned.startsWith("44")) {
        let nationalPart = cleaned;
        if (nationalPart.startsWith("+44")) nationalPart = nationalPart.slice(3);
        else if (nationalPart.startsWith("0044")) nationalPart = nationalPart.slice(4);
        else if (nationalPart.startsWith("44")) nationalPart = nationalPart.slice(2);

        // Strip leading 0 if someone entered +44 07...
        if (nationalPart.startsWith("0")) {
            nationalPart = nationalPart.slice(1);
        }

        if (nationalPart.startsWith("7")) {
            if (nationalPart.length < 10) {
                return `Missing digits after +44 (${nationalPart.length}/10 digits). UK mobile numbers require 10 digits after +44 (e.g. +44 7123 456789).`;
            }
            if (nationalPart.length > 10) {
                return `Too many digits after +44 for a UK mobile number.`;
            }
            return null;
        }

        if (/^[1238]/.test(nationalPart)) {
            if (nationalPart.length < 9) {
                return `Missing digits after +44 for a UK number.`;
            }
            if (nationalPart.length > 10) {
                return `Too many digits after +44 for a UK number.`;
            }
            return null;
        }

        return "Invalid UK number format after +44.";
    }

    return "Only UK phone numbers are accepted (e.g. 07123 456789 or +44 7123 456789).";
}
