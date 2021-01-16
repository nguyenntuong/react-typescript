import { v4 as uuidv4 } from 'uuid';

const __IDENTIFY_ISSUED: string[] = [];
export function createReducerSagaIdentify(
    moduleInfer?: NodeModule,
): string & {
    createReducerActionIdentify: (actionName?: string) => string;
} {
    let id = '';
    if (process.env.NODE_ENV !== 'production' && moduleInfer) {
        id = moduleInfer.id.toUpperCase();
    } else {
        do {
            id = uuidv4();
        } while (__IDENTIFY_ISSUED.includes(id));
        __IDENTIFY_ISSUED.push(id);
    }
    return id;
}
