import { GUID } from 'helpers/guid';

const identifyIssued: string[] = [];
export function createReducerSagaIdentify(moduleInfer: NodeModule): string {
    if (process.env.NODE_ENV !== 'production') {
        return moduleInfer.id.replace(/[./]*/g, '').toUpperCase();
    }
    const id = GUID();
    if (identifyIssued.includes(id)) {
        return createReducerSagaIdentify(moduleInfer);
    }
    identifyIssued.push(id);
    return id;
}
