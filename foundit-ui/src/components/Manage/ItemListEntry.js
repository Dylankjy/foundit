import { DateTime } from "luxon"
import { useState } from "react"
import ItemDeleteModal from "./ItemDeleteModal"

const ItemListEntry = (props) => {
    const { modalSetter, modalDataSetter } = props
    const { imgUrl = 'https://bulma.io/images/placeholders/1280x960.png', name, createdAt } = props

    const deleteItem = () => {
        modalDataSetter({ name, _id: props._id })
        modalSetter(true)
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
                        <button className="button is-light">
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
