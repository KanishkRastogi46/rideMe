
import userStore from '../store/users.store'

export default function Home() {
  const user = userStore((state) => state.user)
  console.log(user)

  return (
    <div>Home</div>
  )
}
