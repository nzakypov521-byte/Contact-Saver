import { create } from "zustand";
import type { Contact } from "../types/types";

interface ContactState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
  getContact: (id: string) => Contact;
  editContact: (cont: Contact) => void;
}

const getLocalStorageData = (): Contact[] => {
  const saved = localStorage.getItem("Contacts");
  return saved ? JSON.parse(saved) : [];
};

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: getLocalStorageData(),
  addContact: (newContact) =>
    set((state) => {
      const updatedContacts = [...state.contacts, newContact];
      localStorage.setItem("contacts-storage", JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    }),
  deleteContact: (id: string) =>
    set((state) => {
      const updatedContacts = state.contacts.filter((c) => c.id !== id);
      localStorage.setItem("contacts-storage", JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    }),
  getContact: (id: string): Contact => {
    const contact = get().contacts.find((c) => c.id === id);
    if (!contact) throw new Error(`Contact with id ${id} not found`);
    return contact;
  },
  editContact: (newdata: Contact) =>
    set((state) => {
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === newdata.id ? { ...contact, ...newdata } : contact
      );

      localStorage.setItem("contact-storage", JSON.stringify(updatedContacts));

      return { contacts: updatedContacts };
    }),
}));
