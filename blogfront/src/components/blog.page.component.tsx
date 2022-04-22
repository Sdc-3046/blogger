import React from 'react';

const BlogPage = (props:any) => {
    const { id, blogTitle, blogContent, blogDate, blogTags } = props



    return (
        <div>
            <div className='blogtitleView'><h1> {blogTitle} </h1> </div>
            <div className='blogdateview' ><h5>{blogDate}</h5></div>
            <div style={{ padding: '50px' }} className='blogcontentView'>{blogContent}</div>
        </div>
    )
}

export default BlogPage
