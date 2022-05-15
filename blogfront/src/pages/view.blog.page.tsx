import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {addComment, getcomments, viewBlog, addBlogRating } from '../services/blog.service';
import Dropdown from 'react-bootstrap/Dropdown';
import BlogPage from '../components/blog.page.component';
import Comments from '../components/comments.component';
import { getuserProfile } from '../services/user.service';

const BlogViewPage = () => {
    const [blog, setBlog] = useState([])
    const navigate = useNavigate()
    const[blogTitle,setBlogTitle]=useState('')
    const[blogContent,setBlogContent]=useState('')
    const[blogDate, setBlogDate]=useState('')
    const[blogTags, setBlogTag]=useState('')
    const[blogRating, setBlogRating]=useState(4)
    const[blogAuthor, setBlogAuthor]=useState('')  
    const [comments, setComments] = useState([])
    const [comtext, setComtext] = useState('')

    useEffect(() => {
        loadBlog()
        
    })

    const logout = () => {

        sessionStorage.clear()
        navigate('/signin')
    }

    

    const createBlog = async () => {
        navigate('/createBlog')
    }

    const loadBlog = async () => {
        const result = await viewBlog(sessionStorage['id'])
        const response = await getcomments(sessionStorage['id'])
        if (result) {
            setBlogTitle(result.blogTitle)
            setBlogContent(result.blogContent)
            setBlogTag(result.blogTags)
            setBlogDate(result.blogDate);
            setBlogAuthor(result.blogAuthor)
            setBlogRating(result.blogRating)
            setBlog(result)
            setComments(response)
        }

    }

    const addblogRating=async (rating:number)=>{
        const result=addBlogRating(sessionStorage['id'],rating)
        loadBlog()
    }

    const myProfile = async () => {
        navigate('/myprofile')
    }

    const myblogList=()=>{
        navigate('/dashboard')
    }

    const getallBlogs = () => {
        navigate('/homepage')
    }

    const createblog = async()=>{
        navigate('/createblog')
    }

    const publishComment = async () => {
        const result = await addComment(sessionStorage['id'], comtext)
       if (result) {
            loadBlog()
        }
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

            <div className='viewBlogContainer'>
                <div className="row">

                    <BlogPage
                        blogTitle={blogTitle}
                        blogContent={blogContent}
                        blogTags={blogTags}
                        blogDate={blogDate}
                        Author={blogAuthor}
                        blogRating={blogRating}
                    />

                </div>

                <div className='ratingscontainer'>
                    <h2 style={{textAlign:'left'}}>Add Ratings</h2>
                    <button value={blogRating} onClick={(e) => {
                        addblogRating(5)
                    }}>5⭐</button>

                    <button value={"ART"} onClick={(e) => {
                        addblogRating(4)
                    }}>4⭐</button>

                    <button value={"SPORTS"} onClick={(e) => {
                        addblogRating(3)
                    }}>3⭐</button>

                    <button value={"LIFESTYLE"} onClick={(e) => {
                        addblogRating(2)
                    }}>2⭐</button>

                    <button value={"NEWS"} onClick={(e) => {
                        addblogRating(1)
                    }}>1⭐</button>


                </div>

                <div style={{ marginBottom: '5%' }}>
                    <h2 style={{ marginTop: '2%', textAlign:'left' }}>Comments</h2>
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
                        <button className='btn btn-success' onClick={publishComment} style={{ float: 'right', width: '200px', height: '40px', marginBottom: '3%', marginTop:'1%' }}>Post</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BlogViewPage