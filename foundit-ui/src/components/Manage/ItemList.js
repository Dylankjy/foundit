import { useEffect, useState } from "react"
import ItemModal from "./ItemModal"
import dataService from "../../services/data.service"
import SearchBox from "../Home/SearchBox"
import ItemListEntry from "./ItemListEntry"
import ItemDeleteModal from "./ItemDeleteModal"

const ItemList = () => {
    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const [loading, setLoading] = useState(false)
    const [onChange, setOnChange] = useState(false)

    const [showAddEditModal, setShowAddEditModal] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteModalData, setDeleteModalData] = useState({})

    const invokeUpdate = () => {
        setOnChange(!onChange)
    }

    const fetchItems = async () => {
        const response = await dataService.get(`items/?search=${searchQuery}`)
        setItems(response.data.items)
    }

    useEffect(() => {
        setLoading(true)
        fetchItems().then(() => setLoading(false))
    }, [searchQuery, onChange])

    return (
        <>
            <section className="section">
                <div className="container">
                    <nav className="level">
                        {/* Left side */}
                        <div className="level-left">
                            <div className="level-item">
                                <button onClick={setShowAddEditModal} className="button is-success">Add item</button>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={(loading) ? 'loading-fade' : ''}>
                            {items.map((item, i) => {
                                return <ItemListEntry key={item._id} {...item} changeInvoker={invokeUpdate} modalSetter={setShowDeleteModal} modalDataSetter={setDeleteModalData} />
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            {showAddEditModal && <ItemModal visibilitySetter={setShowAddEditModal} changeInvoker={invokeUpdate} />}
            {showDeleteModal && <ItemDeleteModal visibilitySetter={setShowDeleteModal} changeInvoker={invokeUpdate} itemName={deleteModalData.name} itemId={deleteModalData._id} />}
            {showDeleteModal && <ItemDeleteModal visibilitySetter={setShowDeleteModal} changeInvoker={invokeUpdate} data={deleteModalData} />}
        </>
    )
}

export default ItemList;
