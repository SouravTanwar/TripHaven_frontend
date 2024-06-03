import "./Navbar.css"

export const Navbar = () => {
    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-1">
                <a className="link" href="/">TripHaven</a>
            </h1>
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