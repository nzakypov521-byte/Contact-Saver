import { useEffect } from "react";
import { useContactStore } from "../api/useContactStorage";
import "../App.css";
import ContactItem from "../components/ContactItem";
import { toast } from "react-toastify";

function MainPage() {
  const contacts = useContactStore((state) => state.contacts);
  const fetchContacts = useContactStore((state) => state.fetchContacts);

  useEffect(() => {
    fetchContacts();
    toast.success('Данные успешно получены')
  }, [fetchContacts]);

  return (
    <div className="w-full h-150 flex justify-center items-center">
      <div className="w-150 shadow-md p-5 rounded-xl flex flex-col gap-4 max-h-100 overflow-auto">
        {contacts.map((cont) => {
          return <ContactItem key={cont.id} contact={cont}/>
        })}
      </div>
    </div>
  );
}

export default MainPage;
