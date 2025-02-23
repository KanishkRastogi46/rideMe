import { useEffect } from 'react'
import userStore from '../store/users.store'
import apiInstance from '../api/apiInstance'
import { useNavigate } from 'react-router'

export default function Home() {
  const user = userStore((state) => state.user)
  const setUser = userStore((state) => state.setUser)
  console.log(user)

  const navigate = useNavigate()

  const logout = async function() {
    try {
        let res = await apiInstance.get('/user/logout')
        if (res.data.success) {
            setUser("", "", null)
            navigate('/users/signin')
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    apiInstance.get('/user/profile')
    .then((res) => {
      if (res.status === 200) {
        if (!res.data.success) navigate('/users/signin')
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="h-screen bg-black text-white text-center text-xl font-bold">
    <h1 className='text-3xl font-sans font-bold mb-6 text-center'>Welcome {user.email}</h1>
    <button onClick={logout}>Logout</button>
  </div>
  )
}
