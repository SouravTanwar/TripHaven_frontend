import { Fragment } from "react"
import { Navbar, HotelCard, ProfileDropDown, AuthModal } from "../../components"
import { useAlert, useAuth, useWishlist } from "../../Context"
import "./Wishlist.css"
import { useNavigate } from "react-router-dom"
import { Alert } from "@mui/material"

export const Wishlist = () => {

    const { wishlist } = useWishlist()

    const { isAuthModalOpen, isDropDownModalOpen } = useAuth()

    const { alert } = useAlert()

    const navigate = useNavigate()

    const handleClickHereClick = () => {
        navigate("/")
    }


    return (
        <Fragment>
            <Navbar route="wishlist" />
            <h2 className="heading-wishlist">Your Wishlist</h2>
            {
                wishlist.length > 0 ? <section className="wishlist-page d-flex align-center wrap gap-larger">
                    {
                        wishlist && wishlist.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} /> )
                    }
                </section> : <p className="d-flex justify-center">Wishlist Empty. &nbsp;<span className="click-here" onClick={handleClickHereClick}>Click here</span> &nbsp; to add to wishlist </p>
            }
            {
                isDropDownModalOpen && <ProfileDropDown />
            }
            {
                isAuthModalOpen && <AuthModal />
            }
            {
                alert.open && <Alert />
            }
        </Fragment>
    )
}