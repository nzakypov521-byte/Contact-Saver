import EditForm from "../components/EditForm"
import { useParams } from 'react-router-dom'
import Header from "../components/Header"

function EditContact() {
    const { id } = useParams()

    return (
        <div>
            <Header></Header>
            <EditForm id={String(id)}></EditForm>
        </div>
    )
}

export default EditContact