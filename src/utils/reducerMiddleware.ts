export const isPlainCustom = (value: unknown): boolean => {
    if (value instanceof Date) {
        return true;
    }
    return false;
};
