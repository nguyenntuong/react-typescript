import { v4 as uuidv4 } from 'uuid';

const __IDENTIFY_ISSUED: string[] = [];
export function createReducerSagaIdentify(moduleInfer: NodeModule): string {
    if (process.env.NODE_ENV !== 'production') {
        return moduleInfer.id.replace(/[./]*/g, '').toUpperCase();
    }
    const id = uuidv4();
    if (__IDENTIFY_ISSUED.includes(id)) {
        return createReducerSagaIdentify(moduleInfer);
    }
    __IDENTIFY_ISSUED.push(id);
    return id;
}
