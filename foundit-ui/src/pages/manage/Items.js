import ItemList from "../../components/Manage/ItemList"
import Navbar from "../../components/Global/Navbar"

const ManageItems = () => {
    return (
        <>
            <Navbar />
            <section className="section">
                <div className="container">
                    <h1 className="title">Manage items</h1>
                </div>
            </section>
            <ItemList />
        </>
    )
}

export default ManageItems
