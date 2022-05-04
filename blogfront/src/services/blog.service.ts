import { gql } from '@apollo/client'
import axios from 'axios'
import { settings } from '../config'
import { print } from 'graphql'

export const getBloglist = async (blogRating:number) => {
    const url = settings.server
    const token = sessionStorage['token']
    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            query($blogRating:Float!)
            {
                getBlogList(filter:{rating:$blogRating})
                {
                    id
                    blogTitle
                    blogContent
                    blogDate
                    blogTags
                    blogRating
                }
            }
            `),
            variables:{
                blogRating:blogRating
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
        
    })
    return response.data.data;
}

export const createBlog = async (blogTitle:String, blogContent:String, blogTags:String, blogRating:number) => {
    const url = settings.server + '/bloggers/createblog'
    const token = sessionStorage['token']

    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            mutation($blogTitle:String,$blogContent:String,$blogTags:String,$blogRating:Float!){
                newBlog(blog:{
                    blogTitle:$blogTitle
                    blogContent:$blogContent
                    blogTags:$blogTags
                    blogRating:$blogRating
                    })
                
                {
                    id
                    blogTitle
                    blogContent
                    blogTags
                    blogDate
                    blogRating
                    userId
                    }
                }
            `),
            variables:{
                blogTitle:blogTitle,
                blogContent:blogContent,
                blogTags:blogTags, 
                blogRating:blogRating
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
        
    })

    //console.log(response.data)
    return response.data;
}

export const viewBlog = async (id:string) => {
    const url = settings.server
    const token = sessionStorage['token']
    //console.log(id + " in viewblog")
    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            query($id:String!){
            getBlogById(id:$id)
            {
                blogTitle
                blogDate
                blogContent
                blogRating
                blogTags
                blogAuthor
                userId
            }
            }
            `),
            variables:{
                id:id
            }
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
        
    })
    
    return response.data.data.getBlogById;
}


export const updateBlog = async (id:String,blogTitle:String,blogContent:String,blogTags:String) => {
    const url = settings.server
    const token = sessionStorage['token']
    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            mutation($id:String,$blogTitle:String,$blogContent:String,$blogTags:String){
                updateBlog(updatedBlog:{
                    id:$id
                    blogTitle:$blogTitle
                    blogContent:$blogContent
                    blogTags:$blogTags
                    })
                
                {
                    id
                    blogTitle
                    blogContent
                    blogTags
                    blogDate
                    blogRating
                    userId
                    }
                }
            `),
            variables:{
                id:id,
                blogTitle:blogTitle,
                blogContent:blogContent,
                blogTags:blogTags,
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
        
    })

    return response
}

export const deleteBlog= async(id:String)=>{
    const url=settings.server;

    const response2=await axios({
        method:'POST',
        url:url,
        data:{
            query:print(gql`
            
                mutation($id:String!){
                    deleteBlogComment(id:$id)
                }
            `),
            variables:{
                id:id
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })

    const response=await axios({
        method:'POST',
        url:url,
        data:{
            query:print(gql`
            
                mutation($id:String!){
                    deleteBlog(id:$id)
                    {
                        id,
                        blogTitle
                    }
                }
            `),
            variables:{
                id:id
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })

}

export const getcomments=async(id:string)=>{
    const url=settings.server
    const response=await axios({
        method:'POST',
        url:url,
        data:{
            query: print(gql`
                query($id:String!){
                getBlogComments(id:$id)
                    {
                        id
                        userName
                        userComment
                    }
                }
            `),
            variables:{
                id:id
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })
    return response.data.data.getBlogComments
}

export const addComment=async(id:string,userComment:string)=>{
    const url=settings.server
    console.log(id,userComment)
    const response=await axios({
        method:'POST',
        url:url,
        data:{
            query: print(gql`
                mutation($id:String!,$userComment:String!){
                addBlogComment(id:$id,userComment:$userComment)
                    {
                        id
                        userName
                        userComment
                        blogId
                    }
                }
            `),
            variables:{
                id:id,
                userComment:userComment
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })
    console.log(response)
    return response.data.data.addBlogComment;
}

export const getMyBlogs=async (id:string)=>{
    const url=settings.server;
    const response=await axios({
        method:'POST',
        url:url,
        data:{
            query: print(gql `
                query($id:String!){
                    getMyBlogs(id:$id)
                    {
                        id
                        blogTitle
                        blogContent
                        blogTags
                        blogDate
                        blogRating
                        userId
                    }
                }
            `),
            variables:{
                id:id
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })
    return response.data.data.getMyBlogs;
}

export const searchBlogs=async (searchText:string)=>{
    const url=settings.server

    const response=await axios({

        url:url,
        method:'POST',
        data:{
            query: print(gql`

                query($searchText:String!){
                    searchBlogs(searchText:$searchText)
                    {
                        id
                        blogTitle
                        blogContent
                    }
                }
            `),
            variables:{
                searchText:searchText
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })
    return response.data.data.searchBlogs
}

export const addBlogRating = async (id:string,rating:number) => {
    const url = settings.server
    const token = sessionStorage['token']
    //console.log(id + " in viewblog")
    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            mutation($rating:Float!,$id:String!){
            addBlogRating(rating:$rating,id:$id)
            {
                blogTitle
                blogDate
                blogContent
                blogTags
                blogRating
                blogAuthor
                userId
            }
            }
            `),
            variables:{
                id:id,
                rating:rating
            }
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
        
    })
    
    return response.data.data.addBlogRating;
}