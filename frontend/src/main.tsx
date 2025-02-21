import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import UserSignin from './pages/UserSignin.tsx'
import UserSignup from './pages/UserSignup.tsx'
import CaptainSignin from './pages/CaptainSignin.tsx'
import CaptainSignup from './pages/CaptainSignup.tsx'
import Home from './pages/Home.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users">
            <Route index element={<Home/>} />
            <Route path="signin" element={<UserSignin />} />
            <Route path="signup" element={<UserSignup />} />
          </Route>
          <Route path="/captains">
            <Route path="signin" element={<CaptainSignin />} />
            <Route path="signup" element={<CaptainSignup />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
