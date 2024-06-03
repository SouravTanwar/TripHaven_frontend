import "./Navbar.css"

export const Navbar = () => {
    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-1">
                <a className="link" href="/">
                    TripHaven
                </a>
            </h1>
            <div className="form-container d-flex align-center cursor-pointer shadow"> 
                <span className="form-option"> Any Where</span>

                <span className="border-right-1px"></span>

                <span className="form-option"> Any Week</span>

                <span className="border-right-1px"></span>

                <span className="form-option"> Add Guests</span>

                <span class="material-symbols-outlined search">search</span>
            </div>
            <nav className="d-flex align-center gap-large">

                <div className="nav d-flex align-center cursor-pointer">
                    <span className="material-symbols-outlined profile-option menu"> 
                        menu
                    </span>
                    <span className="material-symbols-outlined profile-option person">
                        account_circle
                    </span>
                </div>

            </nav>
        </header>
    )
}