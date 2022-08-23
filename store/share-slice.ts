import Benefit from '../common/models/benefit';
import { ConfiguredBenefit } from './../common/models/configuredBenefit';
import { createSlice } from "@reduxjs/toolkit";

const shareBenefitInitialState:ConfiguredBenefit ={
    benefit:{} as Benefit,
    granting:[]
}

const shareBenefitSlice = createSlice({
    name:"shareBenefit",
    initialState:shareBenefitInitialState,
    reducers:{
        setShareBenefit(state, action){
            console.log("Action.payload:", action.payload)
            state.benefit = action.payload.configuredBenefit.benefit;
            state.granting = action.payload.configuredBenefit.granting;
        }
    }
});

export const shareBenefitsActions = shareBenefitSlice.actions;
export default shareBenefitSlice;