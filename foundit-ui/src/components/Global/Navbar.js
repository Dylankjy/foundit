// import { useState } from "react"

const Navbar = () => {
    // const [mobileNavbarExpand, setMobileNavbarExpandBtn] = useState(false);
    // const toggleMobileNavbarExpandBtn = () => {
    //     setMobileNavbarExpandBtn(!mobileNavbarExpand)
    // }

    return (
        <nav id="navbar" className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item has-text-weight-bold" href="/">
                        Foundit
                    </a>

                    {/* <button className={mobileNavbarExpand ? 'navbar-burger is-active' : 'navbar-burger'} aria-label="menu" aria-expanded="false" id="mobileNavbarExpandBtn" onClick={toggleMobileNavbarExpandBtn}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button> */}
                </div>

                {/* <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                    </div>
                </div> */}
            </div>
        </nav>
    )
}

export default Navbar