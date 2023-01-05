/* eslint-disable jsx-a11y/anchor-is-valid */
const Pagination = (props) => {
    const { page, setPage, totalPages } = props;

    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            { (page !== 0) && <a className="pagination-previous" onClick={() => setPage(page-1)}><i className="fa-solid fa-arrow-left"></i></a>}
            { (page !== totalPages - 1) && <a className="pagination-next" onClick={() => setPage(page+1)}><i className="fa-solid fa-arrow-right"></i></a>}
            <ul className="pagination-list">
                {
                    (page > 1) &&
                    <>
                        <li><a className="pagination-link" onClick={() => setPage(0)}>1</a></li>
                        <li><span className="pagination-ellipsis">…</span></li>
                    </>
                }

                {
                    (page > 0) && <li><a className="pagination-link" onClick={() => setPage(page-1)}>{page}</a></li>
                }
                
                <li><a className="pagination-link is-current" aria-current="page" onClick={() => setPage(page)}>{page + 1}</a></li>
                
                {
                    (totalPages > 1 && page < totalPages -1) && <li><a className="pagination-link" onClick={() => setPage(page+1)}>{page + 2}</a></li>
                }
                {
                    (page < totalPages - 2) &&
                    <>
                        <li><span className="pagination-ellipsis">…</span></li>
                        <li><a className="pagination-link" onClick={() => setPage(totalPages - 1)}>{totalPages}</a></li>
                    </>
                }

            </ul>
        </nav>
    )
}

export default Pagination