import type { Contact } from "../types/types";
import { useContactStore } from "../api/useContactStorage";
import { NavLink } from "react-router-dom";

function ContactItem({ contact }: { contact: Contact }) {
  const removeContact = useContactStore((state) => state.deleteContact);
  return (
    <div className="flex">
      <NavLink to='/' className="hover:cursor-pointer w-full flex flex-row border border-black rounded-2xl p-2 gap-3 justify-between">
        <div className="flex flex-row gap-3">
          <div>{contact.name}</div>
          <div>{contact.surname}</div>
        </div>
        <button className="hover:cursor-pointer hover:text-red-500" onClick={() => {removeContact(contact.id)}}>Удалить</button>
      </NavLink>
    </div>
  );
}

export default ContactItem;