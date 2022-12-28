import { useEffect, useState } from "react"
import dataService from "../../services/data.service"
import HomeItemEntry from "./HomeItemEntry"

const HomeItemContainer = () => {

    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const response = await dataService.get("items")
        setItems(response.data.items)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-multiline">
                    {items.map((item, i) => {
                        return <HomeItemEntry key={item._id} {...item} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default HomeItemContainer
