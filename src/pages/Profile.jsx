import { getAuth } from "firebase/auth"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">Profile</p>
                <button type="button" className="logOut" onClick={onLogout}>Logout</button>
            </header>
        </div>
    )
}

export default Profile