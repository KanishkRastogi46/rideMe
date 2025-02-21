import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import image from '../assets/logo.png'
import apiInstance from '../api/apiInstance'

export default function UserSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation example
    if (password !== confirmPassword) {
      console.error('Passwords do not match')
      return
    }
    try {
      const response = await apiInstance.post("/user/register", {fullname: {firstName, lastName}, email, password})
      if (response.status === 200) {
        console.log('User created successfully')
        navigate('/users/signin')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white">
      <img src={image} alt="Logo" className="w-full h-[200px] object-contain" />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <Link to="/users/signin" className="text-amber-400 text-sm font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}