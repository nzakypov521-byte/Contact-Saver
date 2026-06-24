import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Contact, InpDataType } from "../types/types";

interface Props {
  onSubmit: (cont: Contact) => void;
  existingContInfo?: InpDataType;
  isEdit?: boolean;
}

const initialState: InpDataType = {
  name: "",
  surname: "",
  phone: "",
};

function ContactForm({onSubmit, existingContInfo = initialState, isEdit=false }: Props) {
  const [contact, setContact] = useState<InpDataType>(existingContInfo);

  function ChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setContact((prev) => (
        {
            ...prev,
            [name]: value
        }    
    ))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
        id: isEdit ? (contact.id ?? crypto.randomUUID()) : crypto.randomUUID(),
        name: contact.name,
        surname: contact.surname,
        phone: contact.phone,
    })

    if (!isEdit) setContact(initialState)
    if (isEdit) alert('DATA SAVED')
  }

  return (
    <div className="w-full flex h-150 justify-center items-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 shadow-xl w-150 p-5 border border-[#c9c3c357] rounded-2xl items-center"
      >
        {isEdit ? (<span className="w-full text-start px-3 -mb-6.25">Имя</span>) : ''}
        <input
          value={contact.name}
          name='name'
          onChange={ChangeHandler}
          className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1"
          type="text"
          placeholder="Введите имя"
        />
        {isEdit ? (<span className="w-full text-start px-3 -mb-6.25">Фамилия</span>) : ''}
        <input
          value={contact.surname}
          name='surname'
          onChange={ChangeHandler}
          className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1"
          type="text"
          placeholder="Введите фамилию"
        />
        {isEdit ? (<span className="w-full text-start px-3 -mb-6.25">Номер телефона</span>) : ''}
        <input
          value={contact.phone}
          name='phone'
          onChange={ChangeHandler}
          className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1"
          type="text"
          placeholder="Введите номер телефона"
        />
        <button
          className="hover:cursor-pointer bg-[#8f8a8a42] w-50 rounded-2xl"
          type="submit"
        >
          {isEdit ? 'Изменить':'Добавить'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
