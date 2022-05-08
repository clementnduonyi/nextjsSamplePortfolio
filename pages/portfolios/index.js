import { useState } from 'react';
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import BasePage from "@/components/BasePage";
import { Row, Col, Button} from 'reactstrap';
import { useRouter } from "next/router";
import { useDeletePortfolio } from "@/actions/portfolios";
import { useGetUser } from '@/actions/user';
import PortfolioApi from '@/lib/api/portfolios';
import PortfolioCard from "@/components/PortfolioCard";
import { isAuthorized }  from '@/utils/auth0';


const Portfolios = ({portfolios: initialPortfolios}) => {
  const router = useRouter()
  const [portfolios, setPortfolios] = useState(initialPortfolios)
  const [deletePortfolio, {error, data}] = useDeletePortfolio();
  const { data: dataU, Loading: loadingU } = useGetUser();


  const _deletePortfolio = async (e, portfolioId)=>{
    e.stopPropagation();
    const isComfirmed = confirm("Are you sure you want to delete this portfolio?");

    if(isComfirmed){
      await deletePortfolio(portfolioId)
       const newPortfolios = portfolios.filter((portfolio) =>{
        if(portfolio._id !== portfolioId){
          return true;
        }
      })
      setPortfolios(newPortfolios)
    }
   
  }

    return (
      <BaseLayout user={dataU} loading={loadingU}>
        <BasePage
          header = "Portfolios"
          className ="portfolio-page"
          title="New portfolio - Clement Nduonyi">
          <Row>
            { 
              portfolios.map(portfolio => 
                <Col 
                  key={portfolio._id}
                    onClick={() => { 
                    router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`)
                  }}
                  md="4">
                  <PortfolioCard  portfolio = {portfolio}>
                    {dataU && isAuthorized(dataU, 'admin') &&
                      <>
                      <Button
                        onClick={(e)=>{
                          e.stopPropagation()
                          router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`) 
                        }}
                          className="mr-2"color="warning">Edit</Button>
                      <Button
                        onClick={(e)=> _deletePortfolio(e, portfolio._id)}
                        color="danger">Delete</Button>
                     </>
                    }
                    
                  </PortfolioCard>
                </Col>
              )
            }
            
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }

  export async function getStaticProps(){
    const json = await new PortfolioApi().getAll()
    const portfolios = json.data;
    return{
      props: {portfolios},
      revalidate: 1
    }
  }

  
  export default Portfolios;
  