import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Captain = {
    fullname:  string,
    email: string,
    profile: string,
}

const captain: Captain = {
    fullname: "",
    email: "",
    profile: "",
}

const captainSlice = createSlice({
    name: "captain",
    initialState: captain,
    reducers: {
        setCaptain: (state, action: PayloadAction<Captain>) => {
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
            state.profile = action.payload.profile;
        }
    }
})


export const { setCaptain } = captainSlice.actions;
export default captainSlice.reducer;