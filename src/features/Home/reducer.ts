import { createSlice } from '@reduxjs/toolkit';

import { reducerId } from './constants';
import initialState from './initialState';
import { changeId } from './actions';

const reducer = createSlice({
    name: reducerId,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeId, (state, action) => {
                state.id = action.payload;
            })
            .addDefaultCase(() => {});
    },
});

export default reducer;
