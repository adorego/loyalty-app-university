import ImageModel from "./ImageModel";

interface BenefitPortalModel{
    title:string;
    description:string;
    benefitCode:string;
    validity:string;
    benefit:{
        title:string;
        description:string;
        image:ImageModel;
    }
}

export default BenefitPortalModel;