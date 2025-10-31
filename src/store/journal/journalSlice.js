import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls:[],//http://foto.jpg, http://foto2.jpg, http://foto3.jpg 
        // },
    },
    reducers: {
        savingNewNotes: (state) => {
            state.isSaving = true; 
        },
        addNewEmptyNote:(state, action)=>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) =>{
            state.active = action.payload; 
            state.messageSaved = '';
        },
        setNote: (state, action) =>{
            state.notes =action.payload;
        },
        setSaving: (state) =>{
            state.isSaving = true
            state.messageSaved = ''; 
        },
        upDateNote: (state, action) =>{
            state.isSaving = false
            state.notes = state.notes.map(note => {
            
                if (note.id === action.payload.id){
                    return action.payload; 
                }

                return note;
            }); 

            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        
        },

        setPhotosToActiveNote: (state, action) =>{
            state.active.imageUrls = [...state.active.imageUrls,...action.payload ];
            state.isSaving = false;
        },

        clearNotesLougout: (state) =>{
         state.isSaving = false;
         state.messageSaved = '';
         state.notes = [];
         state.active = null;
        },

        deleteNodeById: (state, action) =>{
            state.active= null;
            state.notes= state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNotes,
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    upDateNote,
    setPhotosToActiveNote,
    clearNotesLougout,
    deleteNodeById,
} =journalSlice.actions;