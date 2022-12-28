const SearchBox = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input className="input" type="text" autoComplete="off" placeholder="Search for an item" name="query" />
                    </p>
                    <p className="control">
                        <button className="button is-primary">
                            <i className="fa-solid fa-search" /> Search
                        </button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SearchBox
