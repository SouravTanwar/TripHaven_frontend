import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Payment.css"
import axios from "axios"
import { useDate } from "../../Context"

export const Payment = () => {

    const params = useParams()
    const {id} = params

    const [singleHotel, setSingleHotel] = useState({});

    const {guests, checkInDate, checkOutDate} = useDate()

    const numberOfNights = checkInDate && checkOutDate ? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24): 0 

    const navigate = useNavigate()


    useEffect(()=>{

        (async () => {
            try {
                const {data} = await axios.get(`https://triphaven.onrender.com/api/hotels/${id}`);
                setSingleHotel(data);
            } catch (error) {
                console.log(error);
            }
        })()

    },[id])

    const {image, name, address, state, rating, price} = singleHotel

    const totalPayableAmount = price * numberOfNights + 200

    const HandleConfirmBookingClick = () => {
        navigate("/")
    }

    return (
        <Fragment>
            <header className="heading">
                <h1 className="heading-1">
                    <Link className="link" to="/">TripHaven</Link>
                </h1>
            </header>
            <main className="main d-flex justify-center">
                <div className="final-details-container d-flex direction-column gap-md">
                    <h2>Trip Details</h2>
                    <div className="dates-and-guests d-flex direction-column gap-md">
                        <h3>Your Trip</h3>
                        <div>
                            <p>Dates</p>
                            <span>
                                {checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short" })} - {checkOutDate.toLocaleDateString("en-US", {day: "numeric", month: "short" })}
                            </span>
                        </div>
                        <div>
                            <p>Guests</p>
                            <span>{guests} Guests</span>
                        </div>
                    </div>
                    <div className="d-flex direction-column gap-sm">
                        <h3>pay with</h3>
                        <div>Razorpay</div>
                    </div>
                    <button className="button btn-primary btn-reserve cursor btn-pay" onClick={HandleConfirmBookingClick}>
                        confirm Booking
                    </button>
                </div>
                <div className="final-details d-flex direction-column gap-large">
                    <div className="d-flex gap-sm">
                        <img className="image" src={image} alt={name} />
                        <div className="d-flex direction-column">
                            <div className="d-flex direction-column grow-shrink-basis">
                                <span>{name}</span>
                                <span>{address}, {state}</span>
                            </div>
                            <div className="rating-container">
                                <span className="rating d-flex align-center">
                                    <span className="material-symbols-outlined">star</span>
                                    <span>{rating}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="tag">
                        Your booking is protected by <strong className="strong">TripHaven</strong> cover
                    </div>
                    <div className="price-detail-container">
                        <div className="price-distribution d-flex direction-column">
                            <h3>Price Details</h3>
                            <div className="final-price d-flex align-center justify-space-between">
                                <span className="span">Rs. {price} X {numberOfNights} nigths</span>
                                <span className="span">Rs. {price * numberOfNights}</span>
                            </div>
                            <div className="final-price d-flex align-center justify-space-between">
                                <span className="span">Service Fee</span>
                                <span className="span">Rs. 200</span>
                            </div>
                            <div className="final-price d-flex align-center justify-space-between">
                                <span className="span">Total</span>
                                <span className="span">Rs. {totalPayableAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}