import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateBlog, viewBlog } from '../services/blog.service'
import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react';

const UpdateBlogPage = () => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [blogTags, setBlogTag] = useState('')
    const [blogRating, setBlogRating]=useState(4)
    useEffect(() => {
        loadBlogs()
    }, [])

    const navigate = useNavigate()

    const loadBlogs=async ()=>{
        const res=await viewBlog(sessionStorage['id']);
        if(res){
            setBlogTitle(res.blogTitle)
            setBlogContent(res.blogContent)
            setBlogRating(res.blogRating)
            setBlogTag(res.blogTags)
        }
    }

    const onupdateBlog = async () => {

        if (blogTitle.length === 0) {
            alert('set title')
        } else if (blogContent.length === 0) {
            alert('set description')
        }
        else if (!blogTags) {
            alert('select a tag for a blog')
        }
        else {
            const result = await updateBlog(sessionStorage['id'],blogTitle, blogContent, blogTags)
            if (result) {
                navigate('/homepage')
            } else {
                navigate('/homepage')
            }
        }
    }

    const myProfile = async () => {
        navigate('/myprofile')
    }

    const logout = () => {

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userEmail')
        navigate('/signin')
    }

    const createblog = async()=>{
        navigate('/createblog')
    }

    const myblogList=()=>{
        navigate('/dashboard')
    }

    const getallBlogs = () => {
        navigate('/homepage')
    }

    return (
        <div className='editblog'>
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
            <div className='blogCreateContainer'>
                <div className="form">
                    <div className="mb-3">
                        <label id='blogtitleupdatepage' className="form-label"><h3>Title</h3></label>
                        <input
                            onChange={(e) => {
                                setBlogTitle(e.target.value)
                            }}
                            type="text"
                            className="form-control" value={blogTitle}
                        />{' '}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><h3>Content</h3></label>
                        <textarea
                            onChange={(e) => {
                                setBlogContent(e.target.value)
                            }}
                            rows={20}
                            className="form-control" value={blogContent}
                        ></textarea>
                    </div>

                    <div className='tags'>
                        <h4>Tags</h4>
                        <button value={"FOOD"} onClick={(e) => {
                            setBlogTag("FOOD")
                        }}>FOOD</button>

                        <button value={"ART"} onClick={(e) => {
                            setBlogTag("ART")
                        }}>ART</button>

                        <button value={"SPORTS"} onClick={(e) => {
                            setBlogTag("SPORTS")
                        }}>SPORTS</button>

                        <button value={"LIFESTYLE"} onClick={(e) => {
                            setBlogTag("LIFESTYLE")
                        }}>LIFESTYLE</button>

                        <button value={"NEWS"} onClick={(e) => {
                            setBlogTag("NEWS")

                        }}>NEWS</button>


                    </div>


                    <div className="mb-3">
                        <button onClick={onupdateBlog} className="btn btn-success">
                            Save
                        </button>
                        <Link
                            to="/homepage"
                            style={{ marginLeft: '10px' }}
                            className="btn btn-danger"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </div >
            </div>
    )
}

export default UpdateBlogPage