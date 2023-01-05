import { useEffect, useState } from "react"
import ItemModal from "./ItemModal"
import dataService from "../../services/data.service"
import SearchBox from "../Home/SearchBox"
import ItemListEntry from "./ItemListEntry"
import ItemDeleteModal from "./ItemDeleteModal"
import Pagination from "./Pagination"

const ItemList = () => {
    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [loading, setLoading] = useState(false)
    const [onChange, setOnChange] = useState(false)

    const [showAddEditModal, setShowAddEditModal] = useState(false)
    const [addEditModalData, setAddEditModalData] = useState(null)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteModalData, setDeleteModalData] = useState(null)

    const invokeUpdate = () => {
        setOnChange(!onChange)
    }

    const fetchItems = async () => {
        const response = await dataService.get(`items/?search=${searchQuery}&page=${page}`)
        setTotalPages(response.data.totalPages)
        setItems(response.data.items)
    }

    useEffect(() => {
        setLoading(true)
        fetchItems().then(() => setLoading(false))
    }, [searchQuery, onChange, page])

    const openAddEditModal = () => {
        setAddEditModalData(null)
        setShowAddEditModal(true)
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    <nav className="level">
                        {/* Left side */}
                        <div className="level-left">
                            <div className="level-item">
                                <button onClick={openAddEditModal} className="button is-success">Add item</button>
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
                                return <ItemListEntry
                                    key={item._id}
                                    {...item}
                                    changeInvoker={invokeUpdate}
                                    modalSetter={{ delete: setShowDeleteModal, edit: setShowAddEditModal }}
                                    modalDataSetter={{ delete: setDeleteModalData, edit: setAddEditModalData }} />
                            })}
                        </tbody>
                    </table>
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </div>
            </section>
            {showAddEditModal && <ItemModal visibilitySetter={setShowAddEditModal} changeInvoker={invokeUpdate} data={addEditModalData} key={addEditModalData} />}
            {showDeleteModal && <ItemDeleteModal visibilitySetter={setShowDeleteModal} changeInvoker={invokeUpdate} data={deleteModalData} />}
        </>
    )
}

export default ItemList;
