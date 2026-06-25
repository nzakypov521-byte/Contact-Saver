import { useEffect, useState } from "react";
import { useContactStore } from "../api/useContactStorage";
import ContactForm from "../components/ContactForm";
import { useParams } from "react-router-dom";
import type { Contact } from "../types/types";

function EditContact() {
  const { id } = useParams();
  const getContact = useContactStore((state) => state.getContact);
  const editContact = useContactStore((state) => state.editContact);
  const [contact, setContact] = useState<Contact | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getContact(id!).then((res) => {
        setContact(res);
      });
    }
  }, [getContact, id]);

  if (contact === undefined) {
    return <div className="text-center mt-20">Загрузка...</div>;
  }

  return (
    <>
      <ContactForm
        key={id}
        isEdit
        onSubmit={editContact}
        existingContInfo={contact ?? undefined}
      />
    </>
  );
}

export default EditContact;
