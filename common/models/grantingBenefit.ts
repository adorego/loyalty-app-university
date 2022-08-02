
export enum BUSINESS_EVENTS{
    SHARE,
    REGISTRATION
}

export interface GrantingBenefit{
    points_to_grant:string;
    business_event:string;
}