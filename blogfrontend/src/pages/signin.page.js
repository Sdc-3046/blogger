import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../services/user.service'
import React from 'react';

const SigninPage = (props) => {
    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')

    const navigate = useNavigate()

    const onSignin = async () => {
        if (userEmail.length === 0) {
            alert('enter email')
        } else if (userPassword.length === 0) {
            alert('enter password')
        } else {
            const result = await signin(userEmail, userPassword)
            if(result.errors && result.errors.length>0){
                alert('user not found');
            }
            else{
                if(result.data){
                    const token=result.data.signIn.token
                    sessionStorage['token']=token
                    navigate('/blog-list')
                }
            }
        }
    }

    return (
        <div>
            <center>
                <h1 className="header">Signin</h1>
                <div className="form" style={{ width: '70%', borderRadius: '40px', padding: '100px', marginTop: '100px', background: '#d7d4d7' }}>
                    <div className="mb-3">
                        <label className="form-label" style={{ float: 'left', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Email</label>
                        <input
                            onChange={(e) => {
                                setuserEmail(e.target.value)
                            }}
                            type="text"
                            className="form-control" placeholder='Enter Your Email'
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" style={{ float: 'left', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Password</label>
                        <input
                            onChange={(e) => {
                                setuserPassword(e.target.value)
                            }}
                            type="password"
                            className="form-control" placeholder='Enter Your Password'
                        />
                    </div>

                    <div className="mb-3">
                        <div>
                            Don't have an account ? Signup <Link to="/signup">here</Link>
                        </div>
                        <button style={{ width: '70%', marginTop: '20px' }} onClick={onSignin} className="btn btn-success">
                            Signin
                        </button>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default SigninPage