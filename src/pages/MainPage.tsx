import { useEffect } from "react";
import { useContactStore } from "../api/useContactStorage";
import "../App.css";
import ContactItem from "../components/ContactItem";

function MainPage() {
  const contacts = useContactStore((state) => state.contacts);
  const fetchContacts = useContactStore((state) => state.fetchContacts);
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
  return (
    <div className="w-full h-150 flex justify-center items-center">
      <div className="w-150 shadow-md p-5 rounded-xl flex flex-col gap-4 max-h-100 overflow-auto">
        {contacts.map((cont) => {
          return <ContactItem key={cont.id} contact={cont}></ContactItem>;
        })}
      </div>
    </div>
  );
}

export default MainPage;
