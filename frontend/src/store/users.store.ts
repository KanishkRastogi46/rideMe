import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
    user : {
        email: string,
        name: string,
        profile: string
    },
    setUser(email: string, name: string, profile: string | null): void
}

const userStore = create<User>() (devtools((set)=>{
    return {
        user: {
            email: '',
            name: '',
            profile: ''
        },
        
        setUser: (email: string, name: string, profile: string | null) => set(
            {
                user: {
                    email: email,
                    name: name,
                    profile: profile || ''
                }
            }
        ),
    }
}))

export default userStore;