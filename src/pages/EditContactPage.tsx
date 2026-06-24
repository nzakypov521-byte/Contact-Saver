import { useContactStore } from "../api/useContactStorage"
import ContactForm from "../components/ContactForm"
import { useParams } from 'react-router-dom'

function EditContact() {
    const { id } = useParams()
    const contact = useContactStore((state) => state.getContact(id))
    const editContact = useContactStore((state) => state.editContact)

    return (
        <>
            <ContactForm isEdit onSubmit={editContact} existingContInfo={contact}/>
        </>
    )
}

export default EditContact