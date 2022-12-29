import { useEffect, useState } from "react"
import dataService from "../../services/data.service"
import SearchBox from "../Home/SearchBox"
import ItemListEntry from "./ItemListEntry"

const ItemList = () => {
    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)

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
            <SearchBox searchSetter={setSearchQuery} loadingSetter={setLoading} />
            <section className="section">
                <div className="container">
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
        </>
    )
}

export default ItemList;
