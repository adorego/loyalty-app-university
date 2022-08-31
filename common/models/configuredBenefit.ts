import Benefit  from './benefit';
import { GrantingBenefit } from './grantingBenefit';

export interface ConfiguredBenefit{
    benefit:Benefit;
    campaign_id:string;
    granting:Array<GrantingBenefit>;
}