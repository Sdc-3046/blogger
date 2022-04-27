import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBloglist, searchBlogs } from '../services/blog.service';
import Dropdown from 'react-bootstrap/Dropdown'
import Blog from '../components/blog.list.card.component';

const HomePage = (props:any) => {
    const [blogs, setBlogs] = useState([])
    const [searchText, setSearchText]=useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadBlogs()
    }, [])


    const loadBlogs = async () => {
        const result = await getBloglist(0)
        const blogs=result.getBlogList
        if (result) {
            setBlogs(blogs)
        }
    }

    const onSearch=async()=>{
        const result=await searchBlogs(searchText)
        if(result){
            setBlogs(result)
        }
    }

    const onSort=async(rating:number)=>{
        const result=await getBloglist(rating)
        if(result.getBlogList){
            setBlogs(result.getBlogList)
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
        loadBlogs()
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

            <h1 className="webTitle">Blogger</h1>

            <div className='searchBox'>
                <input onChange={(e) => {
                                setSearchText(e.target.value)
                            }} type="text" placeholder='Search' className='searchText' />
                <button className='searchBtn' onClick={onSearch}>Search</button>
            </div>

            <div >
                <Dropdown className='sortDropdown'>
                    <Dropdown.Toggle>
                        Sort By Rating
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>{onSort(5)}}>5 Star</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{onSort(4)}}>4 Star</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{onSort(3)}}>3 Star</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{onSort(2)}}>2 Star</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{onSort(1)}}>1 Star</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{onSort(0)}}>Get All Blogs</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className='blogsContainer'>
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
        </div>
    )
}

export default HomePage