import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote,}from "./"
import { savingNewNotes, setNote, setSaving, upDateNote, setPhotosToActiveNote, deleteNodeById } from "./journalSlice";
import { LoadNotes, fileUpLoad } from "../../helpers";


export const starNewNote = ()=>{
    return async (dispatch, getState)  => {
        
        dispatch(savingNewNotes());

        const {uid} = getState().auth;

        const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls:[],
        }
        const newDoc = doc(collection( FirebaseDB,`${ uid }/journal-_-/notas`) );
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }

}

export const startLoadingNote = () =>{

        return async(dispatch, getState) => {
        
            const {uid} = getState().auth; 
            if(!uid) throw new Error('No deberias de ser capas de verme. uid error.');
            
            const notes = await LoadNotes(uid);

            dispatch(setNote(notes));

        }

}

export const startSaveNote = ()=>{
    return async(dispatch, getState) => {
    
    dispatch(setSaving());
    
    const {uid} = getState().auth;
    const {active: note} = getState().journal;
    
    const noteToFireStore = {...note};
    delete noteToFireStore.id;
    
    const docRef = doc(FirebaseDB, `${uid}/journal-_-/notas/${note.id}`);
    await setDoc( docRef, noteToFireStore, {merge: true} ) 
    dispatch(upDateNote(note));
    }

}

export const starUpLoadingFiles= (files = []) => {
    return async( dispatch ) => {
        dispatch (setSaving());
        
        // await fileUpLoad(files[0]);
        const fileuploadPromises = [];
        for (const file of files) {
            fileuploadPromises.push(fileUpLoad(file));
        }

        const photosUrls = await Promise.all(fileuploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));
    } 

}
export const startDeletingNote= () => {
    return async(dispatch, getState)=>{
        const {uid} =getState().auth;
        const {active:note}= getState().journal;
        
        const docRef = doc(FirebaseDB, `${uid}/journal-_-/notas/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNodeById( note.id ))
    }


}