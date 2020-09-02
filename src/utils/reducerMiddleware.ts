export const isPlainCustom = (value: any): boolean => {
    if (value instanceof Date) {
        return true;
    }
    return false;
};
