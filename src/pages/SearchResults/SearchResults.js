import { Fragment, useState, useEffect } from "react"
import { HotelCard, Navbar } from "../../components"
import { useDate, useCategory } from "../../Context"
import axios from "axios"




export const SearchResults = () => { 

    const {destination} = useDate();
    const {hotelCategory} = useCategory()

    const [hotels, setHotels] = useState([])

    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`https://triphaven.onrender.com/api/hotels?category=${hotelCategory}`);
                setHotels(data);
            } catch (error) {
                console.log(error);
            }
        })()
    },[destination])

    const filteredSearchResults = hotels.filter(({city, address, state}) => 
        address.toLowerCase() === destination.toLowerCase() || 
        city.toLowerCase() === destination.toLowerCase() || 
        state.toLowerCase() === destination.toLowerCase()
    );



        return (
            <Fragment>
                <Navbar />
                <section className="main d-flex align-center gap-larger">
                    {
                        filteredSearchResults ? filteredSearchResults.map(hotel =>(
                            <HotelCard key={hotel._id} hotel={hotel} /> )) : (<h3>Noting Found</h3> )
                    }
                </section>
            </Fragment>
        )
}