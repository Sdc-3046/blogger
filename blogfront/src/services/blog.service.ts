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
            
            query
            {
                getBlogList(rating:{filter:{}})
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

export const createBlog = async (blogTitle:String, blogContent:String, blogTags:String) => {
    const url = settings.server + '/bloggers/createblog'
    const token = sessionStorage['token']

    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            mutation($blogTitle:String,$blogContent:String,$blogTags:String){
                newBlog(blog:{
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
                blogTitle:blogTitle,
                blogContent:blogContent,
                blogTags:blogTags, 
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
        
    })

    console.log(response.data)
    return response.data;
}

export const viewBlog = async (id:String) => {
    const url = settings.server
    const token = sessionStorage['token']
    //console.log(id + " in viewblog")
    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            query($id:String){
                getBlogById(blog:{
                    id:$id
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
                id:id
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
        
    })

    return response
}

