import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
import { getMyBlogs } from '../services/blog.service';
import Dropdown from 'react-bootstrap/Dropdown'
import MyBlog from '../components/myblog.component';

const MyBlogList = () => {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadBlogs()
    }, [])


    const loadBlogs = async () => {
        const result = await getMyBlogs(sessionStorage['userId'])
        
        if (result) {
            setBlogs(result)
        }
    }

    const logout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userEmail')
        sessionStorage.clear()
        navigate('/signin')
    }

    const createblog = async()=>{
        navigate('/createblog')
    }

    const myProfile = async () => {
        navigate('/myprofile')
    }

    const getallBlogs = () => {
        navigate('/homepage')
    }

    const myblogList=()=>{
        navigate('/dashboard')
    }

    return (
        <div>
            <Dropdown className='dropdown' style={{ float: 'right' }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Welcome {sessionStorage['firstName']}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>  
                    <Dropdown.Item onClick={createblog}>Write A New Blog</Dropdown.Item>
                    <Dropdown.Item onClick={myblogList}>DashBoard</Dropdown.Item>
                    <Dropdown.Item onClick={getallBlogs}>Homepage</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <h1 className="webTitle"><a href='homepage' style={{textDecoration:'none', color:'darkcyan'}}>Blogger</a></h1>

            <div className='blogsContainer'>
                <div className="row">
                    {blogs.length > 0 && blogs.map((blog) => {
                        const { id, blogTitle, blogContent, blogDate, blogTags,blogRating } = blog
                        return (
                            <MyBlog
                                key={id}
                                id={id}
                                blogTitle={blogTitle}
                                blogContent={blogContent}
                                blogDate={blogDate}
                                blogTags={blogTags}
                                blogRating={blogRating+"⭐"}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyBlogList