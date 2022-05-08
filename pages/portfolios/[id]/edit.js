import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth'
import { useRouter } from "next/router";
import { useGetPortfolio} from '@/actions/portfolios';
import PortfolioForm from '@/components/PortfolioForm';
import {Row, Col} from 'reactstrap';
import { useUpdatePortfolio } from '@/actions/portfolios';
import { toast } from "react-toastify";

const PortfolioEdit = ({user}) => {
    const router = useRouter();
    const [updatePortfolio, { error }] = useUpdatePortfolio()
    const { data: initialData } = useGetPortfolio(router.query.id)
     
    const _updatePortfolio = async (data)  => {
        /*try{
            await updatePortfolio(router.query.id, data)
            toast.success('Updated successfully!', {autoClose: 2000})
        }catch{
            toast.error('ooops some error. Try again!', {autoClose: 2000})
        }*/
        await updatePortfolio(router.query.id, data)
        toast.success('Updated successfully!', {autoClose: 2000})
            /*.then(()=>  toast.success('Updated successfully!', {autoClose: 2000}))
            .catch(()=> toast.error('ooops some data missing. Try again!', {autoClose: 2000}))*/
    }
    return(
        <BaseLayout user ={user} loading={false}>
            <BasePage header = "Edit">
            <Row>
                <Col md="8">
                    { initialData &&

                        <PortfolioForm
                        onSubmit = { _updatePortfolio}
                        initialData = {initialData}
                        />
                    }
                    { error &&
                        <div className="alert alert-danger mt-2" >{error}</div>
                    }
                </Col>
            </Row>
            </BasePage>
            
            
        </BaseLayout>
    )
}


export default withAuth(PortfolioEdit)('admin');


/*export async function getServerSideProps({query}) {
    const json = await new PortfolioApi().getPortfolio(query.id)
    const portfolio = json.data;

    return{
        props: {portfolio}
    }
}*/





