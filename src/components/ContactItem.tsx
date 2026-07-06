import type { Contact } from "../types/types";
import { useContactStore } from "../api/useContactStorage";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, SquarePen } from "lucide-react";

function ContactItem({ contact }: { contact: Contact }) {
  const removeContact = useContactStore((state) => state.deleteContact);
  return (
    <div className="flex">
      <div className="w-full flex flex-row border border-black rounded-2xl p-2 gap-3 justify-between">
        <div className="flex flex-row gap-3">
          <div>{contact.name}</div>
          <div>{contact.surname}</div>
        </div>
        <div className="flex flex-row gap-2">
          <NavLink
            to={`/editContact/${contact.id}`}
            className="hover:cursor-pointer hover:text-gray-500"
          >
            <SquarePen />
          </NavLink>
          <button
            className="hover:cursor-pointer hover:text-red-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeContact(contact?.id);
              toast.warn("ДАННЫЕ УДАЛЕНЫ");
            }}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
