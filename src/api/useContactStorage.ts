import { create } from 'zustand'
import type { Contact } from "../types/types"

interface ContactState {
    contacts: Contact[],
    addContact: (contact: Contact) => void,
    deleteContact: (id: string) => void,
}

const getLocalStorageData = (): Contact[] => {
    const saved = localStorage.getItem('Contacts')
    return saved ? JSON.parse(saved) : []
}

export const useContactStore = create<ContactState>((set) => ({
    contacts: getLocalStorageData(),
    addContact: (newContact) => set((state) => {
        const updatedContacts = [...state.contacts, newContact]
        localStorage.setItem('contacts-storage', JSON.stringify(updatedContacts))
        return { contacts: updatedContacts}
    }),
    deleteContact: (id:string) => set((state) => {
        const updatedContacts = state.contacts.filter((c) => c.id !== id)
        localStorage.setItem('contacts-storage', JSON.stringify(updatedContacts))
        return {contacts: updatedContacts}
    })
    
}))