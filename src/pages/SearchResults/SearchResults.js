import { Fragment, useState, useEffect } from "react"
import { Alert, AuthModal, HotelCard, Navbar, ProfileDropDown, SearchStaywithDate } from "../../components"
import { useDate, useCategory, useAlert, useAuth } from "../../Context"
import axios from "axios"




export const SearchResults = () => { 

    const {destination} = useDate();
    const {hotelCategory} = useCategory()
    const {alert} = useAlert()

    const [hotels, setHotels] = useState([])

    const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
    const { isSearchModalOpen } = useDate();

    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`https://triphaven.onrender.com/api/hotels?category=${hotelCategory}`);
                setHotels(data);
            } catch (error) {
                console.log(error);
            }
        })()
    },[destination, hotelCategory])

    const filteredSearchResults = hotels.filter(({city, address, state}) => 
        address.toLowerCase() === destination.toLowerCase() || 
        city.toLowerCase() === destination.toLowerCase() || 
        state.toLowerCase() === destination.toLowerCase()
    );



        return (
            <Fragment>
                <Navbar />
                <section className="main d-flex align-center wrap gap-larger">
                    {
                        filteredSearchResults ? filteredSearchResults.map(hotel =>(
                            <HotelCard key={hotel._id} hotel={hotel} /> )) : (<h3>Noting Found</h3> )
                    }
                </section>
                {isSearchModalOpen && <SearchStaywithDate />}
                {isDropDownModalOpen && <ProfileDropDown />}
                {isAuthModalOpen && <AuthModal />}
                {alert.open && <Alert />}
            </Fragment>
        )
}