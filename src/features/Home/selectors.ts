import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { IGlobalState } from 'state';
import { reducerId } from './constants';
import { InitialStateType } from './initialState';

const selectSelf = (state: IGlobalState) => state[reducerId] as InitialStateType;
export const selectId = createDraftSafeSelector(selectSelf, (state) => state.id);
