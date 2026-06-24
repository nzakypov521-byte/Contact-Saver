import { useContactStore } from "../api/useContactStorage"
import ContactForm from "../components/ContactForm"
import type { Contact } from "../types/types"

function AddContactPage() {
    const addContact = useContactStore((state) => state.addContact)

    function addContactFunction(cont: Contact) {
        addContact(cont)
    }

    return (
        <>
            <ContactForm onSubmit={addContactFunction}></ContactForm>
        </>
    )
}

export default AddContactPage