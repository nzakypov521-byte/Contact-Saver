import { create } from "zustand";
import type { Contact } from "../types/types";

const baseURL =
  "https://contactsaver-4c25a-default-rtdb.europe-west1.firebasedatabase.app";

interface ContactState {
  contacts: Contact[];
  fetchContacts: () => Promise<void>;
  addContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  getContact: (id: string) => Contact;
  editContact: (cont: Contact) => void;
}

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: [],
  fetchContacts: async () => {
    try {
      const res = await fetch(`${baseURL}/contacts.json`);
      if (!res.ok) throw new Error("Ошибка загрузки");

      const data = await res.json();
      const loadedContacts = data 
        ? (Array.isArray(data) ? data : Object.values(data)) 
        : [];

      set({ contacts: loadedContacts });
    } catch (e) {
      console.error("Не удалось загрузить контакты с сервера:", e);
    }
  },
  addContact: async (newContact) => {
    set((state) => {
      const updatedContacts = [...state.contacts, newContact];
      return { contacts: updatedContacts };
    });
    try {
      const currentContacts = get().contacts;
      const res = await fetch(`${baseURL}/contacts.json`, {
        method: "PUT",
        body: JSON.stringify(currentContacts),
      });
      if (res.ok) alert("GOOD");
    } catch (e) {
      console.error(e);
    }
  },

  deleteContact: async (id: string) => {
    set((state) => {
      const updatedContacts = state.contacts.filter((c) => c.id !== id);
      return { contacts: updatedContacts };
    });
    try {
      const updatedContacts = get().contacts;
      const res = await fetch(`${baseURL}/contacts.json`, {
        method: "PUT",
        body: JSON.stringify(updatedContacts),
      });
      if (res.ok) alert("GOOD");
    } catch (e) {
      console.error(e);
    }
  },

  getContact: (id: string): Contact => {
    const contact = get().contacts.find((c) => c.id === id);
    if (!contact) throw new Error(`Contact with id ${id} not found`);
    return contact;
  },

  editContact: async (newdata: Contact) => {
    set((state) => {
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === newdata.id ? { ...contact, ...newdata } : contact
      );

      return { contacts: updatedContacts };
    });
    try {
      const updatedContacts = get().contacts;
      const res = await fetch(`${baseURL}/contacts.json`, {
        method: "PUT",
        body: JSON.stringify(updatedContacts),
      });
      if (res.ok) alert("GOOD");
    } catch (e) {
      console.error(e);
    }
  },
}));
