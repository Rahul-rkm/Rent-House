import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebase.config"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const { name, email, password } = formData;
    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp()
            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate("/sign-in")
        }
        catch (e) {
            toast.error('Something went wrong. Please try again. ')
        }
    }

    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome </p>
                </header>
                <form onSubmit={submitHandler}>
                    <input type='text' className='nameInput' id='name' placeholder='Name..' value={name} onChange={onChange}></input>
                    <input type='email' className='emailInput' id='email' placeholder='Email Address..' value={email} onChange={onChange}></input>
                    <div className='passwordInputDiv'>
                        <input type={showPassword ? 'text' : 'password'} className='passwordInput' id='password' placeholder='Password' value={password} onChange={onChange}></input>
                        <img src={visibilityIcon} alt='Show password' className='showPassword' onClick={() => setShowPassword(prev => !prev)} />
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink' >Forgot Password</Link>
                    <div className='signUpBar'>
                        <p className='signUpText'>Sign Up</p>
                        <button className='signUpButton'>
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
                {/* <OAuth /> */}

                <Link to='/sign-in' className='registerLink'>
                    Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp