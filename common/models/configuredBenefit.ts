import { Benefit } from './benefit';
import { GrantingBenefit } from './grantingBenefit';

export interface ConfiguredBenefit{
    benefit:Benefit;
    granting:Array<GrantingBenefit>;
}