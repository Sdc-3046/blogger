import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBloglist, updateBlog, viewBlog } from '../services/blog.service';

const Comments = (props:any) => {
    const { id, userName, userComment, blogId } = props

    return (
        <div className="card">
            <div className="card-body">
                <h5 className='card-text'>{userName}</h5>
                <p className='card-text'>{userComment}</p>
            </div>
        </div>
    )
}

export default Comments