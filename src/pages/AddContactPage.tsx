import { toast } from "react-toastify"
import { useContactStore } from "../api/useContactStorage"
import ContactForm from "../components/ContactForm"
import type { Contact } from "../types/types"
import { useNavigate } from "react-router-dom"


function AddContactPage() {
    const addContact = useContactStore((state) => state.addContact)
    const navigate = useNavigate()

    function addContactFunction(cont: Contact) {
        addContact(cont)
        toast.success('КОНТАКТ ДОБАВЛЕН') 
        navigate('/')
    }

    return (
            <ContactForm onSubmit={addContactFunction}/>
    )
}

export default AddContactPage