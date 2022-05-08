
import Link from 'next/link';
import moment from 'moment';


const BlogList = ({blog}) =>{
    return(
        <div>
            <div className="post-preview clickable">
                <Link href="/blogs/[slugs]" as={`/blogs/${blog.slug}`}>
                    <a>
                    <h2 className="post-title">
                        { blog.title }
                    </h2>
                    <h3 className="post-subtitle">
                        { blog.subTitle }
                    </h3>
                    </a>
                </Link>
                <p className="post-meta">Posted by
                    <a href="#"> { blog.author.name } </a>
                    - { moment(blog.createdAt).format('LLLL') }
                </p>
            </div>
        </div>
    )
}

export default BlogList;