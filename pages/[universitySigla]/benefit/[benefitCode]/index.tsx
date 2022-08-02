import { useRouter } from "next/router";

const BenefitPage = () =>{
    const router = useRouter();
    const {benefitCode} = router.query; 
    return(
        <p>Su código de beneficio es:{benefitCode}</p>
    )
}

export default BenefitPage;