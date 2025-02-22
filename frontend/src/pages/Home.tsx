import { useEffect } from 'react'
import userStore from '../store/users.store'
import apiInstance from '../api/apiInstance'
import { useNavigate } from 'react-router'

export default function Home() {
  const user = userStore((state) => state.user)
  console.log(user)

  const navigate = useNavigate()

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
    <div className='h-screen bg-black text-white text-center text-xl font-bold'>Welcome {user.email}</div>
  )
}
