import { create } from "zustand";
import type { Contact } from "../types/types";
import makeRequest from "../utils/makeRequest.ts";
import type { IdFromPOSTFetch} from "../types/types";
import type { DataFromGETFetch } from "../types/types";

const baseURL =
  "https://contactsaver-4c25a-default-rtdb.europe-west1.firebasedatabase.app";

interface ContactState {
  contacts: Contact[]
  currentContact: Contact | null
  fetchContacts: () => Promise<void>;
  addContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  getContact: (id: string) => Promise<Contact>;
  editContact: (cont: Contact) => Promise<void>;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  currentContact: null,
  fetchContacts: async () => {
    try {
      const data = await makeRequest<DataFromGETFetch>(`${baseURL}/contacts.json`, 'GET')
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

      const data = await makeRequest<IdFromPOSTFetch>(baseURL + '/contacts.json', 'POST', newContact)
      const generatedId = data.name

      set((state) => ({ 
        contacts: [...state.contacts, { ...newContact, id: generatedId }] 
      }))

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
    const contact = await makeRequest<Contact>(`${baseURL}/contacts/${id}.json`, 'GET')
    set(() => ({ currentContact: contact }))
    return { ...contact, id: id};
  },

  editContact: async (newdata: Contact) => {
    try {
      const { id, ...bodyData} = newdata
      const res = await fetch(`${baseURL}/contacts/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(bodyData),
      });
      if (res.ok) {
        set((state) => {
          const updatedContacts = state.contacts.map((contact) =>
            contact.id === newdata.id ? { ...contact, ...newdata } : contact
          );
    
          return { contacts: updatedContacts };
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
}));
