import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout"
import PageWithLayoutType from "../../../types/PageWithLayout"
import ShareBenefitComp from "../../../modules/benefit/ShareBenefitComp"

export interface ShareBenefitProps{

}
const ShareBenefit = (props:ShareBenefitProps) =>{
    
    return(
        <ShareBenefitComp />
    )

}

(ShareBenefit as PageWithLayoutType).layout = CachedUniversityLayout

export default ShareBenefit;