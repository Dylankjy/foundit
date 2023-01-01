import { useEffect, useState } from "react"
import ItemModal from "../../pages/manage/ItemModal"
import dataService from "../../services/data.service"
import SearchBox from "../Home/SearchBox"
import ItemListEntry from "./ItemListEntry"

const ItemList = () => {
    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const [itemModalVisibility, setItemModalVisibility] = useState(false)

    const toggleItemModal = () => {
        setItemModalVisibility(!itemModalVisibility)
    }

    const fetchItems = async () => {
        const response = await dataService.get(`items/?search=${searchQuery}`)
        setItems(response.data.items)
    }

    useEffect(() => {
        setLoading(true)
        fetchItems().then(() => setLoading(false))
    }, [searchQuery])

    return (
        <>
            <section className="section">
                <div className="container">
                    <nav className="level">
                        {/* Left side */}
                        <div className="level-left">
                            <div className="level-item">
                                <a onClick={toggleItemModal} className="button is-success">Add item</a>
                            </div>
                        </div>
                        {/* Right side */}
                        <div className="level-right">
                            <div className="level-item"><SearchBox searchSetter={setSearchQuery} loadingSetter={setLoading} /></div>
                        </div>
                    </nav>
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Date added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={(loading) ? 'loading-fade' : ''}>
                            {items.map((item, i) => {
                                return <ItemListEntry key={item._id} {...item} />
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            {itemModalVisibility && <ItemModal visibilitySetter={setItemModalVisibility} />}
        </>
    )
}

export default ItemList;
