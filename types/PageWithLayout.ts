import CachedUniversityLayout from './../common/Layout/CacheUniversityLayout';
import { NextPage } from "next";

type PageWithUniversityLayout = NextPage  & {layout: typeof CachedUniversityLayout}

type PageWithLayoutType = PageWithUniversityLayout

export default PageWithLayoutType;