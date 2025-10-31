import { addNewEmptyNote, savingNewNotes, setActiveNote} from "../../../src/store/journal/journalSlice";
import{starNewNote } from "../../../src/store/journal";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

describe('pruebas en los thunk de journal', () => { 
    
    
    const dispatch = jest.fn();
    const getState = jest.fn();
    
    beforeEach (() => jest.clearAllMocks());
    
    
    test('starNewNote debe de crear una nueva nota.', async() => { 
        
        const uid = 'TEST -UID'
        getState.mockReturnValue({auth: { uid: uid } })
        
        await starNewNote()(dispatch, getState);
        
        expect(dispatch).toHaveBeenCalledWith(savingNewNotes());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls:'',

        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls:'',

        }));

        //Borrar de firebase
        const collectionRef = collection( FirebaseDB,`${ uid }/journal-_-/notas`);
        const docs = await getDocs(collectionRef);

        const delePromises = [];
        docs.forEach(doc => delePromises.push(deleteDoc(doc.ref)));
        await Promise.all(delePromises);
        

    }, 10000);

});