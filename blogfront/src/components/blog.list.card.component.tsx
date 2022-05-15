import React from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = (props:any) => {
    const { id, blogTitle, blogContent, blogDate, blogTags, blogRating } = props

    const navigate = useNavigate()

    const viewBlogPage = () => {
        sessionStorage['id'] = id
        navigate(`/viewblog`)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{blogTitle}</h5>
                <div className="card-content">{blogContent}</div>
                <h6 className="class-date">{blogDate}</h6>
                <h6 className='class-tags'>{blogTags}</h6>
                <h6 className='class-rating'>{blogRating}</h6>
                <button onClick={viewBlogPage} className="btn btn-success">
                    Read full story
                </button>
            </div>
        </div>
    )
}

export default Blog