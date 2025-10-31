import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const LoadNotes = async(uid = '') => {

    if (!uid) throw new Error('uid no encontrado.');
    const collectionRecf = collection(FirebaseDB, `${uid}/journal-_-/notas`);
    const docs = await getDocs(collectionRecf);

    const notes =[];
    docs.forEach(doc =>{
        notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;

} 