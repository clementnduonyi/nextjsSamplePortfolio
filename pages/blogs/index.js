import BasePage from '@/components/BasePage';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useGetUser } from '@/actions/user';
import { Row, Col, Container} from 'reactstrap';


import BlogApi from 'lib/api/blogs';
import BlogList from 'components/BlogList';


const Blog = ({blogs}) => {
    const { data, loading } = useGetUser();
    //debugger
    return (
      <BaseLayout
        navClass="transparent" className="blog-listing-page"
        user={data} loading={loading}>
        <div className="masthead" style={{"backgroundImage": "url('/images/home-bg.jpg')"}}>
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage
          className="blog-body"
          title = "New post - Clement Nduonyi">
          <Row>
              {
                blogs.map(blog => 
                <Col key = {blog._id} md="10" lg="8" className="mx-auto">
                    <BlogList blog={blog} />
                    <hr></hr>
                </Col>
                )
              }
            
            
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }

export async function getStaticProps(){
    const { data } = await new BlogApi().getAll()
    const blogs = data.map(blogPost => ({...blogPost.blog, author: blogPost.author}))
    return{
        props: { blogs },
        revalidate: 1
    }
}
  
export default Blog;
  