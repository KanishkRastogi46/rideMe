import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

interface Captain {
    captain : {
        email: string,
        name: string,
        profile: string
    },
    setCaptain(email: string, name: string, profile: string | null): void
}

const captainStore = create<Captain>() (devtools((set)=>{
    return {
        captain: {
            email: '',
            name: '',
            profile: ''
        },
        
        setCaptain: (email: string, name: string, profile: string | null) => set((state)=>{
            return {
                captain: {
                    email: email,
                    name: name,
                    profile: profile || ''
                }
            }
        }),
    }
}))

export default captainStore;