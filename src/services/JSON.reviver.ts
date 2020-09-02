const regexDateISOString = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
export const reviverCustom = (_: string, value: unknown): unknown => {
    if (typeof value === 'string' && regexDateISOString.test(value)) {
        try {
            return new Date(value);
        } catch {
            return value;
        }
    }
    return value;
};
