import React, { useState } from "react";
import { useContactStore } from '../api/useContactStorage'

function AddForm() {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    const addContact = useContactStore((state) => state.addContact)

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        addContact({
            id: crypto.randomUUID(),
            name: name,
            surname: surname,
            phone: phone
        })

        setName('')
        setSurname('')
        setPhone('')
    }

  return (
    <div className="w-full flex h-150 justify-center items-center" onSubmit={handleSubmit}>
      <form action="" className="flex flex-col gap-10 shadow-xl w-150 p-5 border border-[#c9c3c357] rounded-2xl items-center">
        <input value={name} onChange={(e) => setName(e.target.value)}  className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1" type="text" placeholder="Введите имя" />
        <input value={surname} onChange={(e) => setSurname(e.target.value)}  className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1" type="text" placeholder="Введите фамилию" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)}  className="w-full bg-[#d4d4d450] rounded-xl outline-0 text-sm px-4 py-1" type="text" placeholder="Введите номер телефона" />
        <button className="hover:cursor-pointer bg-[#8f8a8a42] w-50 rounded-2xl" type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddForm;
