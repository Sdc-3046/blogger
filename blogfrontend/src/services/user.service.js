import { gql } from '@apollo/client'
import axios from 'axios'
import { settings } from '../config'
import { print } from 'graphql'

export const signup = async (firstName, lastName, userEmail, userPassword) => {
    const url = settings.server

    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            mutation($firstName:String!,$lastName:String!,$userEmail:String!, $userPassword:String!){
                signUp(user:{
                    firstName:$firstName
                    lastName:$lastName
                    userEmail:$userEmail
                    userPassword:$userPassword
                }),
                {
                    firstName
                    lastName
                }
            }
            `),
            variables:{
                firstName:firstName,
                lastName:lastName,
                userEmail:userEmail,
                userPassword:userPassword
            }
        }
    })
    return response.data    
}

export const signin = async (userEmail, userPassword) => {
    const url = settings.server

    const response=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            query($userEmail:String!, $userPassword:String!){
                signIn(user:{
                    userEmail:$userEmail
                    userPassword:$userPassword
                }),
                {
                    token
                }
            }
            `),
            variables:{
                userEmail:userEmail,
                userPassword:userPassword
            }
        }
    })

    sessionStorage['token']=response.data
    return response.data
}

