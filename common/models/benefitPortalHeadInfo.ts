import Benefit from "./benefit";
import ImageModel from "./ImageModel";

interface BenefitPortalHeadInfo{
    title:string;
    name:string;
    benefitCode:string;
    sigla:string;
    lastName:string;
    benefit:Benefit;
    favicon:string;
    image:ImageModel;
    url:string;
    portal_url:string;
}

export default BenefitPortalHeadInfo;