import Head from "next/head";
import HomePageComp from "../common/Layout/HomePageComp";
import MainLayout from "../common/Layout/MainLayout";
import PageWithLayoutType from "../types/PageWithLayout";

export interface HomePageProps{

}
const HomePage = (props:HomePageProps) =>{
    
    return(
        <>
        <Head>
        <title>LoyaltyAPP</title>
        <link rel="icon" href="/favicon.png" />
        </Head>
        <HomePageComp />
        </>
    )
}

(HomePage as PageWithLayoutType).layout = MainLayout
export default HomePage;
