import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './components/auth/Login'
import SignUp from './components/auth/signup';
import ForgotPassword from './components/auth/Forgotpass';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import ResetPassword from './components/auth/Resetpass';
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './components/header-footer/Header';
// import SignUp from './components/auth/signup'


function App() {
  return (
    <>
    
    
    <Router>
    
      <Routes>

        {/*Routes that are  in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element = {<Home/>}/>
        {/*  <Route path = 'properties' element = {<Properties/>}/>
        <Route path = 'about' element = {<About/>}/>   */}

<Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Forgot-Password" element={<ForgotPassword />} />
        <Route path="/Reset-Password" element={<ResetPassword />} />
        </Route>


        {/* Other Routes that are not in Layout */}

        </Routes>
    </Router>





    </>
  );
}

export default App;

