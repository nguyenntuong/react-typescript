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

// Setup a global JSON transform for entry application
export function setupJSONTransforms() {
    const jsonParseOrigin = JSON.parse;
    JSON.parse = (text, reviver = reviverCustom) => {
        return jsonParseOrigin(text, reviver) as unknown;
    };
    return () => {
        JSON.parse = jsonParseOrigin;
    };
}
