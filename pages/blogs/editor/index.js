import BasePage from '@/components/BasePage';
import BaseLayout from '@/components/layouts/BaseLayout';
//import { useGetUser } from '@/actions/user';
import withAuth from '@/hoc/withAuth';
import{ Editor } from 'slate-simple-editor';
import { useCreateBlog } from 'actions/blogs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const BlogEditor = ({user, loading}) => {
  const router = useRouter();
  const [createBlog, {data: createdBlog, error, loading: blogLoding}] = useCreateBlog();

  const saveBlogPost = async (data) =>{
   const createdBlog = await createBlog(data)
    alert('Post created successfully!')
    router.push('/blogs/editor/[id]', `/blogs/editor/${createdBlog._id}`)

    if(error){
      toast.error(error.message);
    }
   
  }
    return (
      <BaseLayout user ={user} loading={loading}>
        <BasePage>
          < Editor 
          onSave = {saveBlogPost}
          header = "Post" 
          loading = {blogLoding}
          />
        </BasePage>
     </BaseLayout>
    )
  }
  
  export default withAuth(BlogEditor)('admin');
  