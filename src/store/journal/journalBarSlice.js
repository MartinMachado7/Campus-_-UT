import { createSlice } from "@reduxjs/toolkit";

const journalBar = createSlice({
name: 'journalBar',
initialState: {
open:Boolean,
setOpen: true,
},
reducers:{
handleDrawerOpen: (state)=>{
    state.setOpen = true; 
    state.open = null
},
handleDrawerClose: (state) =>{
    state.setOpen = false; 
    state.open = null
}

}
});
export const {
handleDrawerOpen,
handleDrawerClose
}=journalBar.actions;