import { useState } from "react"
import SubscribeModal from "./SubscribeModal";

const Navbar = () => {
    const [mobileNavbarExpand, setMobileNavbarExpandBtn] = useState(false);
    const toggleMobileNavbarExpandBtn = () => {
        setMobileNavbarExpandBtn(!mobileNavbarExpand)
    }

    const [showSubscribeModal, setShowSubscribeModal] = useState(false)

    return (
        <>
            <nav id="navbar" className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item has-text-weight-bold" href="/">
                            Foundit
                        </a>

                        <button className={mobileNavbarExpand ? 'navbar-burger is-active' : 'navbar-burger'} aria-label="menu" aria-expanded="false" id="mobileNavbarExpandBtn" onClick={toggleMobileNavbarExpandBtn}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <button className="button is-primary" onClick={() => setShowSubscribeModal(true)}><i class="fa-solid fa-paper-plane"></i>&ensp;Subscribe to emails</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {
                (showSubscribeModal) && (
                    <SubscribeModal onClose={() => setShowSubscribeModal(false)} onSubmit={() => {alert('Check your inbox for a confirmation email to complete the subscription.')}} />
                )
            }
        </>
    )
}

export default Navbar