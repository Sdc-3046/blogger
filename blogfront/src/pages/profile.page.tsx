import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getuserProfile, updateprofile } from '../services/user.service';
import Dropdown from 'react-bootstrap/Dropdown'

const ProfilePage = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userCity, setCity] = useState('')
    const [userState, setState] = useState('')
    const [userCountry, setCountry] = useState('')
    const [userPostalCode, setPostalCode] = useState('')
    const [userBirthDate, setBirthDate] = useState('')  
    const [userGender, setGender] = useState('')
    
    
    useEffect(() => {
        loadProfile()
    }, [])


    const navigate = useNavigate()

    const onUpdateUser = async () => {
        const result = await updateprofile(firstName, lastName, sessionStorage['userEmail'], userCity, userState, userCountry, userPostalCode, userBirthDate, userGender)
        
        if (result) {
            navigate('/myprofile')
        }
    }

    

    const loadProfile = async () => {
        const result = await getuserProfile(sessionStorage['userEmail'])
        if (result) {
            setFirstName(result.firstName)
            setLastName(result.lastName)
            setCity(result.userCity)
            setState(result.userState)
            setCountry(result.userCountry)
            setPostalCode(result.userPostalCode)
            setGender(result.userGender)
            setBirthDate(result.userBirthDate   )
        }
    } 

    const myblogList=()=>{
        navigate('/dashboard')
    }

    const myProfile = async () => {
        navigate('/myprofile')
    }

    const createblog = async()=>{
        navigate('/createblog')
    }

    const logout = () => {
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
            <h2>Profile</h2>
            <div className='currentprofile'>
                <input type="text" value={firstName} className="profileInputBox" onChange={(e)=>{setFirstName(e.target.value)}} />
                <input type="text" value={lastName} className="profileInputBox" onChange={(e)=>{setLastName(e.target.value)}} />
                <input type="text" value={userCity} className="profileInputBox" onChange={(e)=>{setCity(e.target.value)}} />
                <input type="text" value={userState} className="profileInputBox" onChange={(e)=>{setState(e.target.value)}} />
                <input type="text" value={userCountry} className="profileInputBox" onChange={(e)=>{setCountry(e.target.value)}} />
                <input type="text" value={userPostalCode} className="profileInputBox" onChange={(e)=>{setPostalCode(e.target.value)}} />
                <input type="text" value={userGender} className="profileInputBox" onChange={(e)=>{setGender(e.target.value)}} />
                <input type="date" value={userBirthDate} className="profileInputBox" onChange={(e)=>{setBirthDate(e.target.value)}} />    

                <button className="btn btn-success" onClick={onUpdateUser} type="submit" style={{ height: '45px', width: '40%', marginTop: '15px' }}>Update Profile</button>
            </div>

        </div >
    )
}

export default ProfilePage