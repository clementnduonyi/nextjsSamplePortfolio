import BasePage from '@/components/BasePage';
import BaseLayout from '@/components/layouts/BaseLayout';
//import { useGetUser } from '@/actions/user';
import withAuth from '@/hoc/withAuth';
import { Row, Col } from 'reactstrap';


const Cv = ({user, loading}) => {
  //const { data, loading } = useGetUser();
    return (
      <BaseLayout user ={user} loading={loading}>
        <BasePage
          header = {`Peruse my Cv - ${user.name}`}
          title="CV - Clement Nduonyi"
        >
         <Row>
           <Col md={{size: 8, offset: 2}}>
             <iframe style={{width: '100%', height: '800px'}}src="/cv.pdf"/>
           </Col>
         </Row>
        </BasePage>
       
      </BaseLayout>
    
    )
  }
  
  export default withAuth(Cv)();
  