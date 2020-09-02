import immerProduce, { PatchListener } from 'immer';
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export function produce<S>(base: S, recipe: (draft: Writeable<S>) => void, listener?: PatchListener) {
    return immerProduce(base, recipe, listener);
}
