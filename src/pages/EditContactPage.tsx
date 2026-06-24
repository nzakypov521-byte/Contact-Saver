import EditForm from "../components/EditForm"
import { useParams } from 'react-router-dom'

function EditContact() {
    const { id } = useParams()

    return (
        <div>
            <EditForm id={String(id)}></EditForm>
        </div>
    )
}

export default EditContact