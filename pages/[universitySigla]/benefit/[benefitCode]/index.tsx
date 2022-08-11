import CachedUniversityLayout from "../../../../common/Layout/CacheUniversityLayout";
import PageWithLayoutType from "../../../../types/PageWithLayout";
import { useRouter } from "next/router";

export interface BenefitPageProps{

}
const BenefitPage = (props:BenefitPageProps) =>{
    const router = useRouter();
    const {benefitCode} = router.query; 
    return(
        <p>Su código de beneficio es:{benefitCode}</p>
    )
}

(BenefitPage as PageWithLayoutType).layout = CachedUniversityLayout;
export default BenefitPage;


