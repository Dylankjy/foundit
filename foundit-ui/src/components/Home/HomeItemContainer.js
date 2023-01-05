import { useEffect, useState } from "react"
import dataService from "../../services/data.service"
import HomeItemEntry from "./HomeItemEntry"
import SearchBox from "./SearchBox"
import InfiniteScroll from 'react-infinite-scroll-component';
import NoMoreItems from "./NoMoreItems";
import NoResults from "./NoResult";
import EndMessage from "./EndMessage";

const HomeItemContainer = () => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")
    const [previousSearchQuery, setPreviousSearchQuery] = useState("")

    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const fetchItems = async () => {
        const response = await dataService.get(`items/?search=${searchQuery}&limit=12&page=${page}`)
        if (searchQuery !== previousSearchQuery) {
            setPage(0)
            setItems(response.data.items)
            setPreviousSearchQuery(searchQuery)
            setHasMore(true)
        } else {
            setItems(items.concat(response.data.items))
            setHasMore(true)
        }

        if (response.data.page === response.data.totalPages -1) {
            setHasMore(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchItems().then(() => setLoading(false))
    }, [searchQuery, page])

    return (
        <>
            <section className="section">
                <div className="container">
                    <SearchBox searchSetter={setSearchQuery} loadingSetter={setLoading} />
                </div>
            </section>
            <InfiniteScroll dataLength={items.length} next={() => setPage(page + 1)} hasMore={hasMore} endMessage={<EndMessage dataLength={items.length} />}>
                <section className="section">
                    <div className="container">
                        <div className={(loading) ? 'columns is-multiline loading-fade' : 'columns is-multiline'}>
                            {items.map((item, i) => {
                                return <HomeItemEntry key={item._id} {...item} />
                            })}
                        </div>
                    </div>
                </section>
                {(items.length === 0 && !loading) && <NoResults />}
            </InfiniteScroll>
        </>
    )
}

export default HomeItemContainer
