import { DateTime } from "luxon"

const ItemListEntry = (props) => {
    const { modalSetter, modalDataSetter } = props
    const { imgUrl, name, createdAt, category, _id } = props

    // TODO: This is a fucking stupid workaround. PLEASE FIX THIS.
    const imgBase64 = imgUrl

    const deleteItem = () => {
        modalDataSetter.delete({ name, _id })
        modalSetter.delete(true)
    }

    const editItem = () => {
        modalDataSetter.edit({ name, _id, category, imgBase64 })
        modalSetter.edit(true)
    }

    return (
        <>
            <tr>
                <td>
                    <figure className="image is-4by3">
                        <img src={imgUrl} alt={name} />
                    </figure>
                </td>
                <td>{name}</td>
                <td>{DateTime.fromISO(new Date(createdAt).toISOString()).toFormat('d LLL yyyy')}</td>
                <td>
                    <span className="buttons is-right">
                        <button className="button is-light" onClick={editItem}>
                            <span className="icon is-small"><i className="fa-solid fa-pen-to-square"></i></span>
                        </button>
                        <button className="button is-light is-danger" onClick={deleteItem}>
                            <span className="icon is-small"><i className="fa-solid fa-trash"></i></span>
                        </button>
                    </span>
                </td>
            </tr>
        </>
    )
}

export default ItemListEntry
