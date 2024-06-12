import "./FinalPrice.css"
import {useAlert, useAuth, useDate} from "../../Context"
import { DateSelector } from "../DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";


export const FinalPrice  = ({singleHotel}) => {

    const {_id, price, rating } = singleHotel;

    const navigate = useNavigate()

    const {guests, checkInDate, checkOutDate, dateDispatch} = useDate()

    const {setAlert} = useAlert()

    const {accessToken, authDispatch} = useAuth()

    const numberOfNights = checkInDate && checkOutDate ? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24): 0 

    const handleGuestChange = (event) => {

        dateDispatch({
            type: "GUESTS",
            payload: event.target.value
        })

    }

    const handleReserveClick = () => {
        if (!checkInDate) {

            setAlert({
                open: true,
                message: "Select a Check-in Date",
                type: "info"
            })
        } else if (!checkOutDate) {
            
            setAlert({
                open: true,
                message: "Select a Check-out Date",
                type: "info"
            })
        } else if (guests < 1) {
            
            setAlert({
                open: true,
                message: "Add number of guests",
                type: "info"
            })
        } else if (accessToken) {
            navigate(`/confirm-booking/stay/${_id}`);
        } else {
            authDispatch({
                type: "SHOW_AUTH_MODAL"
            })
        }
    }

    return (
        <div className="price-details-container d-flex direction-column gap shadow">
            <div className="price-rating d-flex align-center justify-space-between">
                <p>
                    <span className="fs-bold fs-large"> Rs. {price} </span> 
                    night 
                </p>
                <span className="rating d-flex align-center">
                    <span className="material-symbols-outlined"> star </span>
                    <span>{rating}</span>
                </span>
                
            </div>
            <div className="d-flex direction-column">
                <div className="grid-container-two-col selected-dates">
                    <div className="checkin loc-container">
                        <label className="label">Check in</label>
                        <DateSelector checkInType="in" />
                    </div>
                    <div className="checkin loc-container">
                        <label className="label">Check out</label>
                        <DateSelector checkInType="out" />
                    </div>
                </div>
                <div className="guests gutter-sm">
                    <p>GUESTS</p>
                    <input className="guest-count-input" type="number" placeholder="Add Guests" value={guests} onChange={handleGuestChange} /> 
                </div>
                
            </div>
            <div>
                <button 
                className="button btn-reserve btn-primary cursor" 
                onClick={handleReserveClick}
                >
                    Reserve
                </button>
            </div>
            <div className="price-distribution d-flex direction-column">
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
                    <span className="span">Rs. {price * numberOfNights + 200}</span>
                </div>
            </div>
        </div>
    )
}