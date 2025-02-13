import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type User = {
    email: string,
    profile: string,
}

let user: User = {
    email: "",
    profile: "",
}

const userSlice = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.email = action.payload.email;
            state.profile = action.payload.profile;
        }
    }
})


export const { setUser } = userSlice.actions
export default userSlice.reducer