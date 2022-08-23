import BenefitLayout from '../common/Layout/BenefitLayout';
import CachedUniversityLayout from './../common/Layout/CacheUniversityLayout';
import { NextPage } from "next";

type PageWithUniversityLayout = NextPage  & {layout: typeof CachedUniversityLayout}
type PageWithBenefitLayout = NextPage & {layout: typeof BenefitLayout}

type PageWithLayoutType = PageWithUniversityLayout | PageWithBenefitLayout

export default PageWithLayoutType;