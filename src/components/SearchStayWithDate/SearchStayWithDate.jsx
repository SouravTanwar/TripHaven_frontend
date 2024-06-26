import { DateSelector } from "../DateSelector/DateSelector"
import "./SearchStayWithDate.css"
import { useDate, useCategory } from "../../Context"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export const SearchStaywithDate = () => {

    const [hotels, setHotels] = useState([])
    const [isVisible, setIsVisible] = useState(true);
    const { destination, guests, dateDispatch, isSearchResultOpen } = useDate()
    const { hotelCategory } = useCategory()

    const navigate = useNavigate()

    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`https://triphaven.onrender.com/api/hotels?category=${hotelCategory}`);
                setHotels(data);
            } catch (error) {
                console.log(error);
            }
        })()
    },[hotelCategory])

    const handleDestinationChange = (event) => {
        setIsVisible(true)
        dateDispatch({
            type: "DESTINATION",
            payload: event.target.value
        })
    }

    const handleGuestChange = (event) => {
        dateDispatch({
            type: "GUESTS",
            payload: event.target.value
        })
    }


    const handleSearchResultClick = (address) => {
        dateDispatch({
            type: "DESTINATION",
            payload: address
        })
        setIsVisible(false);
    }


    const handleDestinationFocus = () => {
        dateDispatch({
            type: "SHOW_SEARCH_RESULT"
        })
    }



    const handleSearchButtonClick = () => {

        dateDispatch({
            type : "CLOSE_SEARCH_MODAL"
        })

        navigate(`/hotels/${destination}`)
    }

    const HandleSearchContainerClick = () => {
        
        dateDispatch({
            type : "CLOSE_SEARCH_MODAL"
        })
    }



    const destinationOptions = hotels.filter(
        ({address, city, state, country}) => 
            address.toLowerCase().includes(destination.toLowerCase()) || 
            city.toLowerCase().includes(destination.toLowerCase()) || 
            state.toLowerCase().includes(destination.toLowerCase()) || 
            country.toLowerCase().includes(destination.toLowerCase())
        )

    const uniqueDestinationOptions = Array.from(new Set(destinationOptions.map(({ address, city }) => `${address},${city}`))).map(combination => {
        const [address, city] = combination.split(",");
        return { address, city };
    })


    return (
        <div className="destination-container" onDoubleClick={HandleSearchContainerClick} >
            <div className="destination-options d-flex align-center absolute">
                <div className="location-container">
                    <label className="label">Where</label>
                    <input
                        value={destination}
                        className="input search-dest" 
                        placeholder="Search Destination" 
                        onChange={handleDestinationChange}
                        onFocus={handleDestinationFocus} 
                        autoFocus />
                </div > 
                <div className="location-container">
                    <label className="label">Check in</label>
                    <DateSelector checkInType="in" />
                </div>
                <div className="location-container">
                    <label className="label">Check out</label>
                    <DateSelector checkInType="out" />
                </div>
                <div className="location-container">
                    <label className="label">No. of Guests</label>
                    <input
                        value={guests}
                        className="input search-dest" 
                        placeholder="Add guests" 
                        onChange={handleGuestChange} />
                </div>
                <div className="search-container d-flex align-center cursor" onClick = {handleSearchButtonClick} >
                    <span className="material-symbols-outlined">search</span>
                    <span>Search</span>
                </div>
            </div>
            {
                isSearchResultOpen && (
                    <div className="search-result-container absolute" >
                        {
                            uniqueDestinationOptions && isVisible && uniqueDestinationOptions.map(({ address, city }) => (
                                <p className="p cursor-pointer" onClick={() => handleSearchResultClick(address)} >
                                    {address},{city}
                                </p>
                            ))
                        }
                    </div>
                )
            }
            
        </div>
    )
}