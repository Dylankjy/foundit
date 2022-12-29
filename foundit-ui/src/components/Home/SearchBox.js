import { useEffect, useState } from "react"
import dataService from "../../services/data.service"

const SearchBox = (props) => {

    const { searchSetter, loadingSetter } = props

    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        // Activate loading fade
        loadingSetter(true)
        // Delay until user has finished typing
        const delayDebounceFn = setTimeout(async () => {
            searchSetter(searchQuery)
            loadingSetter(false)
        }, 1200)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery, searchSetter])

    return (
        <section className="section">
            <div className="container">
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input className="input" type="text" autoComplete="off" placeholder="Search for an item" name="query" onKeyUp={(e) => setSearchQuery(e.target.value)} />
                    </p>
                    <p className="control">
                        <button className="button is-dark">
                            <i className="fa-solid fa-search" />&ensp;Search
                        </button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SearchBox
