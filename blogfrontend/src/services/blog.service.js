import { gql } from '@apollo/client'
import axios from 'axios'
import { settings } from '../config'
import { print } from 'graphql'

export const getBloglist = async (blogRating) => {

    const url = settings.server
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