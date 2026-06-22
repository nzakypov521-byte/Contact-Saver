import React, { useState } from "react";
import { useContactStore } from "../api/useContactStorage";
function EditForm({ id }: { id: string}) {
    const contact = useContactStore((state) => state.getContact(id))
    const editContact = useContactStore((state) => state.editContact)
    const [name, setName] = useState<string>(contact.name)
    const [surname, setSurname] = useState<string>(contact.surname)
    const [phone, setPhone] = useState<string>(contact.phone)

    function handleEdit(event: React.FormEvent) {
        event.preventDefault()

        editContact({
            id: id,
            name: name,
            surname: surname,
            phone: phone
        })
    }

  return (
    
    <div className="w-full flex h-150 justify-center items-center">
      <form
        action=""
        onSubmit={handleEdit}
        className="flex flex-col gap-10 shadow-xl w-150 p-5 border border-[#c9c3c357] rounded-2xl items-center"
      >
        <span className="w-full text-start px-3 mb-[-25px]">Имя</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1"
          type="text"
        />
        <span className="w-full text-start px-3 mb-[-25px]">Фамилия</span>
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1"
          type="text"
        />
        <span className="w-full text-start px-3 mb-[-25px]">Номер Телефона</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1"
          type="text"
        />
        <button
          className="hover:cursor-pointer bg-[#8f8a8a42] w-50 rounded-2xl"
          type="submit"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default EditForm;
