import { Link } from 'react-router';
import userStore from './store/users.store';

function App() {
  let { user } = userStore();
  console.log(user);
  
  return (
    <div className="min-w-full min-h-screen flex flex-col items-center">
      <h1 className='absolute top-[5vh] text-black text-5xl text-center font-extrabold z-10 mt-0'>RideMe</h1>
      <div className="flex justify-start mt-0">
        <img 
          src="https://images.unsplash.com/photo-1514749204155-24e484635226?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Cab Booking"
          className="mb-8 w-screen h-[85vh] md:h-[90vh] md:object-cover relative z-0 opacity-90"
        />
      </div>
      <div className="flex flex-col justify-center mt-auto pb-4">
        <h1 className='text-3xl font-sans font-bold mb-6 text-center'>Looking for a Ride</h1>
        <Link to="/users/signin" className='text-center'>
          <button className="bg-amber-400 text-white text-center text-xl font-mono font-bold rounded-xl w-[50vw] md:w-[30vw] py-2 px-4">
            Continue
          </button>
        </Link>
      </div>
        
    </div>
  )
}

export default App