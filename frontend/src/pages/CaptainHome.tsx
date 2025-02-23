import { useEffect } from "react"
import captainStore from "../store/captain.store"
import apiInstance from "../api/apiInstance"
import { useNavigate } from "react-router"

export default function CaptainHome() {
  const captain = captainStore(state=>state.captain)
  const setCaptain = captainStore(state=>state.setCaptain)
  const navigate = useNavigate()

  const logout = async function() {
    try {
        let res = await apiInstance.get('/captain/logout')
        if (res.data.success) {
            setCaptain("", "", null)
            navigate('/captains/signin')
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    apiInstance.get('/captain/profile')
    .then((res)=>{
       if (!res.data.success) navigate('/captains/signin')
       setCaptain(res.data.data.email, res.data.data.fullname.firstName + " " + res.data.data.fullname.lastName, res.data.data.profile)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])
  console.log(captain)

  return (
    <div className="h-screen bg-black text-white text-center text-xl font-bold">
      <h1 className='text-3xl font-sans font-bold mb-6 text-center'>Welcome {captain.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
