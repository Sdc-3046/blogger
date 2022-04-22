import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {viewBlog } from '../services/blog.service';
import Dropdown from 'react-bootstrap/Dropdown';
import BlogPage from '../components/blog.page.component';
import Comments from '../components/comments.component';

const BlogViewPage = (props:any) => {
    const [blog, setBlog] = useState([])
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [comtext, setComtext] = useState('')

    const logout = () => {

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userEmail')
        navigate('/signin')
    }

    useEffect(() => {
        loadBlog()
    }, [])

    const createBlog = async () => {
        navigate('/createBlog')
    }

    const loadBlog = async () => {
        const result = await viewBlog(sessionStorage['id'])
        const responese = await getcomments(sessionStorage['id'])
        console.log(sessionStorage.getItem('id'))
        if (result) {
            /* sessionStorage['blogTitle'] = result.blogTitle;
            sessionStorage['blogContent'] = result.blogContent;
            sessionStorage['blogTags'] = result.blogTags;
            sessionStorage['blogDate'] = result.blogDate; */

            setBlog(result)
            setComments(responese)
        }

    }

    const myProfile = async () => {
        navigate('/myprofile')
    }

    const myBlogs = async () => {
        navigate('/mybloglist')
    }

    const getallBlogs = () => {
        navigate('/blog-list')
    }

    const publishComment = async () => {
        const result = await addComment(sessionStorage.getItem('id'), comtext)
        console.log(comtext)
        console.log(result)
        if (result) {
            loadBlog()
        }
    }

    return (
        <div>
            <Dropdown className='dropdown' style={{ float: 'right' }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>
                    <Dropdown.Item onClick={createBlog}>Write a blog</Dropdown.Item>
                    <Dropdown.Item onClick={myBlogs}>My Blogs</Dropdown.Item>
                    <Dropdown.Item onClick={getallBlogs}>Homepage</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <h1 className="header">Blogger</h1>

            <div className="row">

                <BlogPage
                    blogTitle={sessionStorage.getItem('blogTitle')}
                    blogContent={sessionStorage.getItem('blogContent')}
                    blogTags={sessionStorage.getItem('blogTags')}
                    blogDate={sessionStorage.getItem('blogDate')}
                />

            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ marginTop: '20px' }}>Comments</h2>
                <div className="row">
                    {comments.map((comment) => {
                        const { id, userName, userComment, blogId } = comment
                        return (
                            <Comments
                                key={id}
                                id={id}
                                userName={userName}
                                userComment={userComment}
                            />
                        )
                    })}
                </div>

                <div className='addcomment'>
                    <input onChange={(e) => {
                        setComtext(e.target.value)
                    }} type="text" placeholder='Post a comment' className='addComtext' />
                    <button className='btn btn-success' onClick={publishComment} style={{ float: 'right', width: '200px', height: '40px', marginBottom: '40px' }}>Post</button>
                </div>
            </div>

        </div>
    )
}

export default BlogViewPage