import React, { useContext } from "react";
import { db, dbRef, dbOnValue } from '../firebase'

const NotesContext = React.createContext()

export function useNotes() {
    return useContext(NotesContext)
}

export function NotesProvider({ children }) {
    function getNotes() {
        const startNotesRef = dbRef(db, "all_notes/001")
        dbOnValue(startNotesRef, (snapshot) => {
            let allNotes = [];
            snapshot.forEach(snap => {
                allNotes.push(snap.val())
            })
        })
    }

    const value = {
        getNotes
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}