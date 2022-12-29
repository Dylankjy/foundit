import { DateTime } from "luxon"

const ItemListEntry = (props) => {
    const { imgUrl = 'https://bulma.io/images/placeholders/1280x960.png', name, createdAt } = props
    return (
        <tr>
            <td>
                <figure className="image is-4by3">
                    <img src={imgUrl} alt={name} />
                </figure>
            </td>
            <td>{name}</td>
            <td>{DateTime.fromISO(new Date(createdAt).toISOString()).toFormat('d LLL yyyy')}</td>
            <td></td>
        </tr>
    )
}

export default ItemListEntry
