import { getAuth, updateProfile } from "firebase/auth"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Profile = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email
    })
    const { name, email } = formData;
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // Update the display name in firebase
                await updateProfile(auth.currentUser, { displayName: name })

                // Update in firestore
                const useRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(useRef, { name })
                toast.success('Updated Successfully in Database')
            }
        }
        catch (err) {
            toast.error('Could not update the user profile')
        }
    }
    const onChangeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
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
                <div className="profileCard">
                    <form>
                        <input type="text" id="name"
                            className={changeDetails ? 'profileNameActive' : 'profileName'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChangeHandler}
                        />
                        <input type="email" id="email"
                            className={'profileEmail'}
                            disabled={true}
                            value={email}
                            onChange={onChangeHandler}
                        />
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Profile