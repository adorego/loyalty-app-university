import Benefit from '../common/models/benefit';
import { ConfiguredBenefit } from './../common/models/configuredBenefit';
import { createSlice } from "@reduxjs/toolkit";

const shareBenefitInitialState:ConfiguredBenefit ={
    benefit:{} as Benefit,
    campaign_id:"",
    granting:[]
}

const shareBenefitSlice = createSlice({
    name:"shareBenefit",
    initialState:shareBenefitInitialState,
    reducers:{
        setShareBenefit(state, action){
            state.benefit = action.payload.configuredBenefit.benefit;
            state.campaign_id = action.payload.configuredBenefit.campaign_id;
            state.granting = action.payload.configuredBenefit.granting;
        }
    }
});

export const shareBenefitsActions = shareBenefitSlice.actions;
export default shareBenefitSlice;