import EditForm from "../components/EditForm"
import { useParams } from 'react-router-dom'

function EditContact() {
    const { id } = useParams()

    return (
        <>
            <EditForm id={String(id)}></EditForm>
        </>
    )
}

export default EditContact