import { ILocalState } from 'state';

export interface InitialStateType extends ILocalState {
    id: string;
}

const initialState: InitialStateType = {
    id: '',
    required: '',
};

export default initialState;
