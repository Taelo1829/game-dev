import { configureStore } from '@reduxjs/toolkit';
import { movementSlice } from './slice';

export default configureStore({
    reducer: movementSlice.reducer
});