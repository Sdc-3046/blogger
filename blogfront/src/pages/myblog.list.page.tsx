import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
import { getBloglist } from '../services/blog.service';
import Dropdown from 'react-bootstrap/Dropdown'
import Blog from '../components/blog.list.card.component';

const BlogListPage = (props:any) => {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadBlogs()
    }, [])


    const loadBlogs = async () => {
        const result = await getBloglist(4)
        const blogs=result.getBlogList
        if (result) {
            setBlogs(blogs)
        }
    }

    const logout = () => {

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userEmail')
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

    return (
        <div>
            <Dropdown className='dropdown' style={{ float: 'right' }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>  
                    <Dropdown.Item onClick={createblog}>Write A New Blog</Dropdown.Item> 
                    <Dropdown.Item onClick={getallBlogs}>Homepage</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <h1 className="header">Blogger</h1>

            <div className="row">
                {blogs.length > 0 && blogs.map((blog) => {
                    const { id, blogTitle, blogContent, blogDate, blogTags } = blog
                    return (
                        <Blog
                            key={id}
                            id={id}
                            blogTitle={blogTitle}
                            blogContent={blogContent}
                            blogDate={blogDate}
                            blogTags={blogTags}

                        />
                    )
                })}
            </div>
        </div>
    )
}

export default BlogListPage