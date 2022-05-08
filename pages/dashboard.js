import BasePage from '@/components/BasePage';
import BaseLayout from '@/components/layouts/BaseLayout';
import withAuth from 'hoc/withAuth';
import { Container, Row, Col, Button } from 'reactstrap';
import Link from 'next/link'
import DashboardDropdown from 'components/shared/Dropdown';
import { useUpdateBlog, useGetUserBlogs } from 'actions/blogs';
import { toast } from 'react-toastify';



const DashBoard = ({user, loading}) => {
  const [updateblog] = useUpdateBlog()
  const {data: blogs, mutate} = useGetUserBlogs();
  
  const changeBlogStatus = async (blogId, status) => {
    updateblog(blogId, {status})
      .then(() =>  mutate())
      .catch(() => toast.error('Ooooops, something went wrong!'))
  }
  const createOption = (blogStatus) => {
    return blogStatus === 'draft' ? {view: "Publish", value: "published"}
                                  : {view: "Revert to draft", value: "draft"}
  } 
  const createOptions = (blog) =>{
    const option = createOption(blog.status)


    return[
      {key: `${blog._id}-publish`, 
      text: option.view, 
      handlers: {
        onClick: () => changeBlogStatus(blog._id, option.value)}
      },
      {key: `${blog._id}-delete`, 
      text: 'Delete', 
      handlers: {
        onClick: () => changeBlogStatus(blog._id, 'deleted')}
      }
    ]
  }
  const renderBlogs = (blogs, status) => (
     <ul className='user-blogs-list'>
       {
        blogs && blogs.filter(blog => blog.status === status).map(blog =>
          <li key={blog._id}>
            <Link href="/blogs/editor/[id]" as={`blogs/editor/${blog._id}`}>
              <a>{blog.title}</a>
            </Link>
            < DashboardDropdown items = {createOptions(blog)} />
          </li>
        )
       }
     </ul>
   )
   
    return (
      <BaseLayout navClass="transparent" user={user} loading={loading}>
    {/* MASTHEAD */}
    <div className="masthead" style={{"backgroundImage": `url(/images/home-bg.jpg)`}}>
      <div className="overlay"></div>
      <Container>
        <Row>
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1>Blogs Dashboard</h1>
              <span className="subheading">
                Lets write some nice blog today{' '}
                  <Link href='/blogs/editor'>
                  <Button color="primary">Create a new Blog</Button>
                </Link></span>
            </div>
          </div>
        </Row>
      </Container>
    </div>
    {/* MASTHEAD */}
    <BasePage className="blog-user-page">
      <Row>
        <Col md="6" className="mx-auto text-center">
          <h2 className="blog-status-title"> Published Blogs </h2>
          {renderBlogs(blogs, "published")}
        </Col>
        <Col md="6" className="mx-auto text-center">
          <h2 className="blog-status-title"> Draft Blogs </h2>
          {renderBlogs(blogs, "draft")}
        </Col>
      </Row>
    </BasePage>
  </BaseLayout>
    )
  }

 
  
  export default withAuth(DashBoard)('admin');
  
  
  
  