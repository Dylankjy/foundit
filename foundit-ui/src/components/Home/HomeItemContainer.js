import { useEffect, useState } from "react"
import dataService from "../../services/data.service"
import HomeItemEntry from "./HomeItemEntry"
import SearchBox from "./SearchBox"

const HomeItemContainer = () => {

    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchItems = async () => {
        const response = await dataService.get(`items/?search=${searchQuery}`)
        console.log(response.data.items)
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
                    <div className={(loading) ? 'columns is-multiline loading-fade' : 'columns is-multiline'}>
                        {items.map((item, i) => {
                            return <HomeItemEntry key={item._id} {...item} />
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeItemContainer
