import BasePage from '@/components/BasePage';
import BaseLayout from '@/components/layouts/BaseLayout';
import { authorizeUser, withAuth } from '@/utils/auth0';





const OnlyAdminSSR = ({user}) => {
  return (
      <BaseLayout user={user} loading={false}>
        <BasePage>
          <h1>Welcome to OnlyadminSSR page - {user && user.name} </h1>
        </BasePage>
      </BaseLayout>
  )
    
}

/*const getTitle = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res({title: 'My new title!'})
        }, 500)
    })
}

export const getServerSideProps = withAuth(async({req, res}, user) =>{
    const title = await getTitle();
    //const user = await authorizeUser(req, res);
    return title;
})('admin')*/

export const getServerSideProps = withAuth()('admin');
  
export default OnlyAdminSSR;
  