
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from '@/actions/user';
import PortfolioApi from "@/lib/api/portfolios";
import { formatDate } from "helper/functions";
import { useRouter } from "next/router";


const PortfolioDetail = ({portfolio}) => {
    const router = useRouter();
    const { data: dataU, loading: loadingU } = useGetUser();

    if (router.isFallback) {
        return <h1>Your page is getting server</h1>
      }
    
    return(
        <BaseLayout user ={dataU} loading={loadingU} navClass="transparent">
            <BasePage 
                indexPage
                noWrapper
                title={`${portfolio.title} - Clement Nduonyi`}
                metaDescription={portfolio.description}>

                <div className="portfolio-detail">
                    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                        <main role="main" className="inner page-cover">
                            <h1 className="cover-heading">{portfolio.title}</h1>
                            <p className="lead dates">
                                {formatDate(portfolio.startDate)} - {formatDate( portfolio.endDate) || "Present"}
                            </p>
                            <p className="lead info mb-0">
                                {portfolio.jobTitle} | {portfolio.company} | {portfolio.location}
                            </p>
                            <p className="lead">{portfolio.description}</p>
                            <p className="lead dates">
                                <a href ={portfolio.companyWebsite} target="_" className ="btn btn-lng btn-secondary">Visit Company</a>
                            </p>
                        </main>
                    </div>
                </div>
            </BasePage>
            
        </BaseLayout>
    )
}
export async function getStaticPaths(){
    const json = await new PortfolioApi().getAll();
    const portfolios = json.data;
    const paths = portfolios.map(portfolio =>{
        return{
            params: {id: portfolio._id}
        }
    })
    return { paths, fallback: true }
} 


export async function getStaticProps({params}){
    const json = await new PortfolioApi().getById(params.id)
    const portfolio = json.data;
    return{
      props: {portfolio}, 
      revalidate: 1
    }
}

/*export async function getServerSideProps({query}) {
    const json = await new PortfolioApi().getPortfolio(query.id)
    const portfolio = json.data;

    return{
        props: {portfolio}
    }
}*/





export default PortfolioDetail;