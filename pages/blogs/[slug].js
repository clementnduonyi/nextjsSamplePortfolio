import BasePage from '@/components/BasePage';
import BaseLayout from '@/components/layouts/BaseLayout';
import { Row, Col} from 'reactstrap'
import { useGetUser } from '@/actions/user';
import BlogApi from 'lib/api/blogs';
import { SlateView } from 'slate-simple-editor';
import Avater from 'components/shared/Avatar';
import { useRouter } from 'next/router';


const BlogDetail = ({blog, author}) => {
  const router = useRouter();
  const { data, loading } = useGetUser();

  if (router.isFallback) {
    return <h1>Your page is getting server</h1>
  }

  return (
    <BaseLayout user ={data} loading={loading}>
      <BasePage 
        className='slate-container'
        title={`${blog.title} - Clement Nduonyi`}
        metaDescription={blog.subTitle}
      >
        <Row>
          <Col md={{size: 8, offset: 2}}>
            <Avater 
            image = {author.picture}
            title = {author.name}
            date = {blog.createdAt}
            />
            <hr/>
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export async function getStaticPaths(){
  const { data } = await new BlogApi().getAll()
  //const blogs = json.data;
  const paths = data.map(({blog}) =>({ params: {slug: blog.slug}}))
  return {paths, fallback: true}
}


  export async function getStaticProps({params}){
    const {data: {blog, author}} = await new BlogApi().getBySlug(params.slug)
    return {props: {blog, author}, 
            revalidate: 1}
  }
  
  export default BlogDetail;
  