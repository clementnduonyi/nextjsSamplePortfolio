import { initAuth0 } from '@auth0/nextjs-auth0';

export const authorizeUser = async (req, res) =>{
  const session = await auth0.getSession(req, res)
  if(!session || !session.user){
      res.writeHead(302, {
          Location: '/api/auth/login'
      });
      res.end();
      return null;
  }
  return session.user 
}

export const withAuth = (getData) => (role) => async ({req, res}) => {
  const session = await auth0.getSession(req, res)
  if(!session || !session.user || role && !isAuthorized(session.user, role)){
      res.writeHead(302, {
          Location: '/api/auth/login'
      });
      res.end();
      return {props: {}};
  }

  const data = getData ? await getData({req, res}, session.user) : {}

  return {
    props: {
      user: session.user, ...data
    }
  }

};

export const isAuthorized = (user, role) => {
  return (user && user[process.env.AUTH0_NAMESPACE + `/roles`].includes(role))
  
};


const auth0 = initAuth0({
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});
 
export default auth0;