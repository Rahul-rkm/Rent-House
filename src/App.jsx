import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Explore, ForgotPassword, Offers, Profile, SignIn, SignUp } from './pages'
import { Navbar } from './components'
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/test" element={<Navbar />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
