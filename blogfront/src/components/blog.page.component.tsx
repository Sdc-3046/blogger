import React from 'react';

const BlogPage = (props:any) => {
    const { id, blogTitle, blogContent, blogDate, blogTags,Author,blogRating } = props



    return (
        <div>
            <div className='blogtitleView'><h1> {blogTitle} </h1> </div>
            <div className='blogdateview' ><h5>{(blogDate).slice(0,10)}</h5></div>
            <div className='blogauthor' ><h5>{"created by: "+Author}</h5></div>
            <div className='blograting'>{"Rated "+blogRating+"⭐"}</div>
            <div style={{ padding: '50px' }} className='blogcontentView'>{blogContent}</div>
        </div>
    )
}

export default BlogPage
