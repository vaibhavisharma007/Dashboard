import {createSlice} from "@reduxjs/toolkit";

const initialState={
    global:{
        mode:"dark"
    },
    userId:"787f7d6e6315398131f2f1d0"

};

export const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setMode: (state) => {
            return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
        }
    }
})

export const {setMode}=globalSlice.actions;

export default globalSlice.reducer;
