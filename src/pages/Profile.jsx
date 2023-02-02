import { getAuth, updateProfile } from "firebase/auth"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

const Profile = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email
    })
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    const onSubmit = () => {
        console.log(123)
    }
    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">Profile</p>
                <button type="button" className="logOut" onClick={onLogout}>Logout</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">
                        Personal Details
                    </p>
                    <p className="changePersonalDetails" onClick={() => { changeDetails && onSubmit(); setChangeDetails(prev => !prev) }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>

                </div>
            </main>
        </div>
    )
}

export default Profile