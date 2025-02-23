import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import image from '../assets/logo.png'
import apiInstance from '../api/apiInstance'
import captainStore from '../store/captain.store'

export default function CaptainSignin() {
  const setCaptain = captainStore((state)=>state.setCaptain)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await apiInstance.post('/captain/login', { email, password })
      if (response.status === 200) {
        setCaptain(response.data.data.email, response.data.data.fullname.firstName + response.data.data.fullname.lastName, response.data.data.profile)
        navigate('/captains')
      }
    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white">
      <img src={image} alt="Logo" className="w-full h-[200px] object-contain" />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Captain Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none text-base placeholder:text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none text-base placeholder:text-sm border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-gray-600 text-sm">
                Show Password
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-amber-400 text-white font-bold text-lg py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <Link to="/captains/signup" className="text-amber-400 text-sm font-bold">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="text-center mt-auto mb-4">
          <Link to="/users/signin">
            <button className="bg-neutral-700 text-white font-bold text-lg py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full">
              User Sign In
            </button>
          </Link>
      </div>
    </div>
  )
}