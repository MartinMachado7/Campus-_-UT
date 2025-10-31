import { handleDrawerClose, handleDrawerOpen } from "./journalBarSlice"

export const StarnavBart = ()=>{
    return async (dispatch)=>{
       dispatch (handleDrawerOpen())
    }
};
export const StarsideBar = ()=>{
    return async (dispatch)=>{
        dispatch(handleDrawerClose())
    }
}