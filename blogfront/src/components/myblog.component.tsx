import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, getBloglist, updateBlog, viewBlog } from '../services/blog.service';

const MyBlog = (props:any) => {
    const { id, blogTitle, blogContent, blogDate, blogTags } = props

    const navigate = useNavigate()

    const viewBlogPage = () => {
        sessionStorage['id'] = id
        navigate('/viewblog')
    }

    const updateBlog = () => {
        sessionStorage['id'] = id
        navigate('/updateblog')
    }

    const ondeleteBlog = () => {
        //console.log(id)
        deleteBlog(id);
        //navigate('/homepage')
    }

    return (
        <div
            className="card"
        >
            <div className="card-body">
                <h5 className="card-title">{blogTitle}</h5>
                <div className="card-content">{blogContent}</div>
                <h6 className="class-date">{blogDate.slice(0,10)}</h6>
                <h6 className='class-tags'>{blogTags}</h6>
                <button onClick={viewBlogPage} id="viewBlogBtn" className="btn btn-success">
                    Read full story
                </button>
                <button onClick={updateBlog} id="updateBlogBtn" className="btn btn-success">Update</button>
                <button onClick={ondeleteBlog} id="deleteBtn" className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default MyBlog