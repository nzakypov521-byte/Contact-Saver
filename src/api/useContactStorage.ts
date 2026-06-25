import { create } from "zustand";
import type { Contact } from "../types/types";

const baseURL =
  "https://contactsaver-4c25a-default-rtdb.europe-west1.firebasedatabase.app";

interface ContactState {
  contacts: Contact[];
  fetchContacts: () => Promise<void>;
  addContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  getContact: (id: string) => Promise<Contact>;
  editContact: (cont: Contact) => void;
}

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: [],
  fetchContacts: async () => {
    try {
      const res = await fetch(`${baseURL}/contacts.json`);
      if (!res.ok) throw new Error("Ошибка загрузки");

      const data = await res.json();
      const contacts = Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key
        }
      })


      set({ contacts: contacts });
    } catch (e) {
      console.error("Не удалось загрузить контакты с сервера:", e);
    }
  },
  addContact: async (newContact) => {
    try {
      const res = await fetch(`${baseURL}/contacts.json`, {
        method: "POST",
        body: JSON.stringify(newContact),
      });
      if (res.ok) {
        set((state) => {
          const updatedContacts = [...state.contacts, newContact];
          return { contacts: updatedContacts };
        });
        window.location.href = '/'
      }
    } catch (e) {
      console.error(e);
    }
  },

  deleteContact: async (id: string) => {
    try {
      const res = await fetch(`${baseURL}/contacts/${id}.json`, {
        method: "DELETE"
      });
      if (res.ok) {
        set((state) => {
          const updatedContacts = state.contacts.filter((c) => c.id !== id);
          return { contacts: updatedContacts };
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  getContact: async (id: string): Promise<Contact> => {
    const res = await fetch(`${baseURL}/contacts/${id}.json`)
    const contact = await res.json()
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
