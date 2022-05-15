import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/user.service'

const SignupPage = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')

    const navigate = useNavigate()

    const onSignup = async () => {
        if (firstName.length === 0) {
            alert('please enter your first name')
        }
        else if (lastName.length === 0) {
            alert('please enter yout last name')
        }
        else if (userEmail.length === 0) {
            alert('please enter Email')
        } else if (userPassword.length === 0) {
            alert('please enter Password')
        } else {
            const result = await signup(firstName, lastName, userEmail, userPassword)
            console.log(result)
            if (result) {
                navigate('/signin')
            }
        }
    }

    return (
        <div>
            <div style={{alignContent:"center"}}>
                <h1 className="header">Sign Up</h1>
                <div className="form" style={{ width: '70%', borderRadius: '40px', padding: '2%', marginTop: '50px', background: '#d7d4d7', marginLeft:'15%', marginBottom:'50px' }}>
                    <div className="mb-3">
                        <label className="form-label" style={{ float: 'left', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Firstname</label>
                        <input
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" style={{ float: 'left', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Lastname</label>
                        <input
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" style={{ float: 'left', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Email</label>
                        <input
                            onChange={(e) => {
                                setuserEmail(e.target.value)
                            }}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" style={{ float: 'left', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Password</label>
                        <input
                            onChange={(e) => {
                                setuserPassword(e.target.value)
                            }}
                            type="userPassword"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <div>
                            Already have an account ? Signin <Link to="/signin">here</Link>
                        </div>
                        <button style={{ width: '70%', marginTop: '20px' }} onClick={onSignup} className="btn btn-success">
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage