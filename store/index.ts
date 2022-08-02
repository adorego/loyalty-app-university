import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import shareBenefitSlice from "./share-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        ui: uiSlice.reducer,
        shareBenefit: shareBenefitSlice.reducer,
    
    
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
AnyAction
>
