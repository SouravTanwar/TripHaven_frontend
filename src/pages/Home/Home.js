import { Navbar, HotelCard, Categories, SearchStaywithDate, Filter, AuthModal } from "../../components"
import axios from "axios"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import "./Home.css"
import { useAuth, useCategory, useDate, useFilter } from "../../Context"
import { getHotelsByCancelation, getHotelsByPrice, getHotelsByPropertyType, getHotelsByRatings, getHotelsByRoomsAndBeds } from "../../Utils"


export const Home = () => {

    const [hasMore, setHasMore] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(16)
    const [testData, setTestData] = useState([])
    const [hotels, setHotels] = useState([])

    const {isSearchModalOpen} = useDate()

    const {isFilterModalOpen, priceRange,  noOfBedrooms, noOfBeds, noOfBathrooms, propertyType, tripHavenRating, isCancelable} = useFilter()

    const { hotelCategory } = useCategory()

    const { isAuthModalOpen } = useAuth()


    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`https://triphaven.onrender.com/api/hotels?category=${hotelCategory}`);
                setTestData(data);
                setHotels(data ? data.slice(0,16) : []);
            } catch (error) {
                console.log(error);
            }
        })()
    },[hotelCategory])

    const fetchMoreData = () => {
        if(hotels.length >= testData.length){
            setHasMore(false)
            return
        }

        setTimeout(() => {
            if (hotels && hotels.length > 0){
                setHotels(hotels.concat(testData.slice(currentIndex, currentIndex + 16)))
                setCurrentIndex(prev => prev + 16)
            }
            else{
                setHotels([])
            }
        },1000)
    }


    const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange)
    const filteredHotelsByRoomsAndBeds = getHotelsByRoomsAndBeds (filteredHotelsByPrice, noOfBedrooms, noOfBeds, noOfBathrooms)

    const filteredHotelsByPropertyType = getHotelsByPropertyType(filteredHotelsByRoomsAndBeds, propertyType)

    const filteredHotelsByRatings = getHotelsByRatings(filteredHotelsByPropertyType, tripHavenRating)

    const filteredHotelsByCancelation = getHotelsByCancelation(filteredHotelsByRatings, isCancelable)


    return (
        <div className="relative">
            <Navbar />
            <Categories />
            {
                hotels && hotels.length > 0 ? (
                    <InfiniteScroll 
                        dataLength={hotels.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={hotels.length > 0 && <h3 className="alert-text">Loading .....</h3>}
                        endMessage={<p className="alert-text">You have seen it all</p>}
                    >
                        <main className="main d-flex align-center wrap gap-larger">
                            {
                                filteredHotelsByCancelation && filteredHotelsByCancelation.map((hotel) => (<HotelCard key={hotel._id} hotel={hotel} />))
                            }
                        </main>
                    </InfiniteScroll>
                ) : (<></>)
            }
            {
                isSearchModalOpen && <SearchStaywithDate />
            }
            {
                isFilterModalOpen && <Filter />
            }
            {
                isAuthModalOpen && <AuthModal />
            }
        </div>
    )
}