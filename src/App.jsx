import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Explore, ForgotPassword, Offers, Profile, SignIn, SignUp } from './pages'
import { Navbar } from './components'
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
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
