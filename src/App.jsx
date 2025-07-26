import Landing from './components/Landing'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Regester from './pages/Regester'
import Dashboard from './pages/Dashboard'
import Create from './components/Create'
import NoteDetail from './components/NoteDetail'
import './App.css'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import {useAuth} from './context/AuthContext'
import AfterLoginProtect from './components/AfterLoginProtect';
import Test from './components/Test'

import GoogleComp from './components/GoogleComp'

function App() {
  const { isLoggedIn, logout, login } = useAuth();

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">

      <Routes>
        <Route path='/' element={<AfterLoginProtect><Landing /></AfterLoginProtect>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/login' element={<AfterLoginProtect><Login /></AfterLoginProtect>}></Route>
        <Route path='/regester' element={<Regester />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        {/* <Route path='/create' element={<Create />}></Route> */}
        <Route path='/note/:id' element={<NoteDetail />}></Route>
        <Route path='/test' element={<Test />}></Route>
        <Route path='/googleco' element={<GoogleComp />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
