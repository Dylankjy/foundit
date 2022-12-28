import { useEffect, useState } from "react"
import testdataService from "../../services/testdata.service"
import HomeItemEntry from "./HomeItemEntry"

const HomeItemContainer = () => {

    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const response = await testdataService.getItems()
        setItems(response.data)
    }

    useEffect(() => {
        console.log(items)
        fetchItems()
    }, [])

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-multiline">
                    {items.map((item, i) => {
                        return <HomeItemEntry {...item} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default HomeItemContainer
