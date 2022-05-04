import { gql } from '@apollo/client'
import axios from 'axios'
import { settings } from '../config'
import { print } from 'graphql'

export const signup = async (firstName:string, lastName:string, userEmail:string, userPassword:string) => {
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

export const signin = async (userEmail:string, userPassword:string) => {
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
                    user{
                        id
                        firstName
                        lastName
                        userEmail
                        userCity
                        userCountry
                        userState
                        userPostalCode
                        userBirthDate
                        userGender
                    }
                }
            }
            `),
            variables:{
                userEmail:userEmail,
                userPassword:userPassword
            }
        }
    })
    //console.log(response.data)
    const res=response.data.data.signIn.user

    sessionStorage['userId']=res.id
    sessionStorage['userEmail']=res.userEmail
    sessionStorage['firstName']=res.firstName
    return response.data
}

export const updateprofile = async (firstName:string, lastName:string, userEmail:string, userCity:string, userState:string, userCountry:string, userPostalCode:string, userBirthDate:string, userGender:string) => {
    const url = settings.server
    console.log(userBirthDate)
    const result=await axios({
        method:'POST',
        url:url,
        data: {
            query: print(gql`
            
            mutation($userEmail:String,$userState:String,$userCity:String,$userCountry:String,
            $userPostalCode:String,$userGender:String,$firstName:String,$lastName:String)
            {
                updateProfile(userProfile:{
                    userEmail:$userEmail
                    userState:$userState
                    userCity:$userCity
                    userCountry:$userCountry
                    userPostalCode:$userPostalCode
                    userGender:$userGender
                    firstName:$firstName
                    lastName:$lastName
                }),
                {
                    firstName
                    lastName
                    userCity
                    userCountry
                    userState
                    userPostalCode
                    userBirthDate
                    userGender
                }
            }
            `),
            variables:{
                firstName:firstName,
                lastName:lastName,
                userEmail:userEmail,
                userCity:userCity,
                userState:userState,
                userCountry:userCountry,
                userPostalCode:userPostalCode,
                userBirthDate:userBirthDate,
                userGender:userGender
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
        
    })
    console.log(result)
    return result;
}

export const getuserProfile=async(userEmail:string)=>{
    const url=settings.server
    const response=await axios({
        url:url,
        method:'POST',
        data:{
            query : print(gql`
                query($userEmail:String!){
                    getUserProfile(userEmail:$userEmail){
                        id
                        firstName
                        lastName
                        userCity
                        userState
                        userCountry
                        userGender
                        userPostalCode
                        userBirthDate
                    }
                }
            `),
            variables:{
                userEmail:userEmail
            }
        },
        headers:{
            Authorization: `Bearer ${sessionStorage['token']}`
        }
    })
    return response.data.data.getUserProfile
}
