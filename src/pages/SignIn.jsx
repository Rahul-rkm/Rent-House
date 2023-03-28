import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { async } from '@firebase/util'
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const { email, password } = formData;
    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) { // <- means user is successfully signed in
                toast.success("Login successful")
                navigate("/")
            }

        } catch (error) {
            toast.error('Bad credentials')
        }
    }
    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome </p>
                </header>
                <form onSubmit={submitHandler}>
                    <input required type='email' className='emailInput' id='email' placeholder='Email Address..' value={email} onChange={onChange}></input>
                    <div className='passwordInputDiv'>
                        <input required type={showPassword ? 'text' : 'password'} className='passwordInput' id='password' placeholder='Password' value={password} onChange={onChange}></input>
                        <img src={visibilityIcon} alt='Show password' className='showPassword' onClick={() => setShowPassword(prev => !prev)} />
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink' >Forgot Password</Link>
                    <div className='signInBar'>
                        <p className='signInText'>Sign In</p>
                        <button className='signInButton'>
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
                {/* <OAuth /> */}

                <Link to='/sign-up' className='registerLink'>
                    Sign Up Instead
                </Link>
            </div>
        </>
    )
}

export default SignIn