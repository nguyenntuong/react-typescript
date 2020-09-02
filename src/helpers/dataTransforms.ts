const OBJECT = {};
export function jsonToFormData(
    jsonForm: Record<string, any>,
    parentKey?: string,
    formDataCache: FormData = new FormData(),
) {
    const formData = formDataCache;
    for (const key in jsonForm) {
        if (typeof jsonForm[key] !== 'undefined') {
            let constructedKey = key;
            if (parentKey) {
                constructedKey = `${parentKey}.${key}`;
            }
            const value = jsonForm[key] as { constructor: any };
            if (value.constructor === OBJECT.constructor) {
                jsonToFormData(value, constructedKey, formData);
            } else if (value instanceof Date) {
                formData.append(constructedKey, value.toISOString());
            } else {
                formData.append(constructedKey, value as any);
            }
        }
    }
    return formData;
}
