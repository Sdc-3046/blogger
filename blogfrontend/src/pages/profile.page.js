import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import { updateprofile } from '../services/user.service';
import Dropdown from 'react-bootstrap/Dropdown'

const ProfilePage = (props) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userCity, setCity] = useState('')
    const [userState, setState] = useState('')
    const [userCountry, setCountry] = useState('')
    const [userPostalCode, setPostalCode] = useState('')
    const [userBirthDate, setBirthDate] = useState('')  
    const [userGender, setGender] = useState('')

    const navigate = useNavigate()

    const onUpdateUser = async () => {
        const result = await updateprofile(firstName, lastName, sessionStorage['userEmail'], userCity, userState, userCountry, userPostalCode, userBirthDate, userGender)
        console.log(result)
        if (result) {
            navigate('/myprofile')
        }
    }

    

    const myProfile = async () => {
        navigate('/myprofile')
    }


    const logout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userEmail')
        sessionStorage.clear()
        navigate('/signin')
    }

    const getallBlogs = () => {
        navigate('/homepage')
    }

    return (
        <div>
            <Dropdown className='dropdown' style={{ float: 'right' }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>
                    <Dropdown.Item onClick={getallBlogs}>Homepage</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            <div className='currentprofile'>

                <div>
                    <h5 className='greetings'>Welcome {sessionStorage.getItem('firstName')},</h5>
                    <h2 className='subheading'>My Profile</h2>
                </div>

                <div className='myprofileblock'>
                    <div className='profileblock'>
                        <div className='subsubhead'>First Name</div>
                        <div className='profile'>{sessionStorage.getItem('firstName')}</div>
                    </div>

                    <div className='profileblock'>
                        <div className='subsubhead'>Last Name</div>
                        <div className='profile'>{sessionStorage.getItem('lastName')}</div>
                    </div>

                    <div className='profileBlock'>
                        <div className='subsubhead'>City</div>
                        <div className='profile'>{sessionStorage.getItem('userCity')}</div>
                    </div>

                    <div className='profileblock'>
                        <div className='subsubhead'>State</div>
                        <div className='profile'>{sessionStorage.getItem('userState')}</div>
                    </div>

                    <div className='profileblock'>
                        <div className='subsubhead'>Country</div>
                        <div className='profile'>{sessionStorage.getItem('userCountry')}</div>
                    </div>

                    <div className='profileblock'>
                        <div className='subsubhead'>Postal Code</div>
                        <div className='profile'>{sessionStorage.getItem('userPostalCode')}</div>
                    </div>


                    <div className='profileblock'>
                        <div className='subsubhead'>Birth Date</div>
                        <div className='profile'>{sessionStorage.getItem('userBirthDate')}</div>
                    </div>

                    <div className='profileblock'>
                        <div className='subsubhead'>Gender</div>
                        <div className='profile'>{sessionStorage.getItem('userGender')}</div>
                    </div>
                </div>

            </div>

            <div className='updateProfile'>
                <h1 className="header" style={{ fontSize: '22px' }}>Update Your Profile</h1>
                <div className="form-signin" style={{ width: '70%', maxWidth: '850px', height: '600px' }}>
                    <div className="form-floating" style={{ padding: '5px', }}>
                        <input type="text" onChange={
                            (e) => {
                                setFirstName(e.target.value)
                            }}
                            className="form-control" id="floatingInput" placeholder="First Name" style={{ height: '45px', }} />
                        <label for="floatingInput">First Name</label>
                    </div>

                    <div className="form-floating" style={{ padding: '5px', }}>
                        <input type="text" onChange={
                            (e) => {
                                setLastName(e.target.value)
                            }} className="form-control" id="floatingInput" placeholder="Surname" style={{ height: '45px', }} />
                        <label for="floatingInput">Last Name</label>
                    </div>

                    <div className="row g-3" style={{ padding: '5px', }}>
                        <div className="col-sm-7">
                            <input type="text" onChange={
                                (e) => {
                                    setCity(e.target.value)
                                }}
                                className="form-control" placeholder="City" aria-label="City" style={{ height: '45px', }} />
                        </div>
                        <div className="col-sm">
                            <input type="text" onChange={
                                (e) => {
                                    setState(e.target.value)
                                }} className="form-control" placeholder="State" aria-label="State" style={{ height: '45px', width: '200px' }} />
                        </div>
                        <div className="col-sm">
                            <input type="text" onChange={
                                (e) => {
                                    setPostalCode(e.target.value)
                                }} className="form-control" placeholder="Zip" aria-label="Zip" style={{ height: '45px', }} />
                        </div>
                    </div>

                    <div className="col-auto" style={{ padding: '5px' }}>
                        <input type="text" onChange={
                            (e) => {
                                setCountry(e.target.value)
                            }} className="form-control" placeholder="Country" aria-label="Country" style={{ height: '45px', }} />
                    </div>

                    <div className="row" style={{ padding: '5px' }}>
                        <div className="col">
                            <input type="date" onChange={
                                (e) => {
                                    setBirthDate(e.target.value)
                                }} className="form-control" placeholder="Birthdate DD/MM/YYYY" aria-label="Birthdate" style={{ height: '45px', }} />
                        </div>
                        <div className="col">
                            <input type="text" onChange={
                                (e) => {
                                    setGender(e.target.value)
                                }} className="form-control" placeholder="Gender" aria-label="Gender" style={{ height: '45px', }} />
                        </div>
                    </div>

                    <button className="btn btn-success" onClick={onUpdateUser} type="submit" style={{ height: '45px', width: '100%', marginTop: '15px' }}>Update User Profile</button>
                </div>
            </div>

        </div >
    )
}

export default ProfilePage