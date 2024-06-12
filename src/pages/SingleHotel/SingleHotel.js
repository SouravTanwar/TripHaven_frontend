import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Alert, AuthModal, FinalPrice, HotelDetails, HotelImages, Navbar, ProfileDropDown, SearchStaywithDate } from "../../components";
import "./SingleHotel.css"
import { useAlert, useAuth, useDate } from "../../Context";


export const SingleHotel = () => {

    const {id} = useParams();
    const [singleHotel, setSingleHotel] = useState({});

    const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
    const { isSearchModalOpen } = useDate();
    const { alert } = useAlert();


    useEffect(()=>{

        (async () => {
            try {
                const {data} = await axios.get(`https://triphaven.onrender.com/api/hotels/${id}`);
                setSingleHotel(data);
            } catch (error) {
                console.log(error);
            }
        })()

    })

    const {name, state} = singleHotel

    return (
    
    <div className="relative">
        <Navbar />
        <main className="single-hotel-page">
        <p className="hotel-name-add">
            {name}, {state}
        </p>
        <HotelImages singleHotel={singleHotel} />
        <div className="d-flex">
            <HotelDetails singleHotel={singleHotel} />
            <FinalPrice singleHotel={singleHotel} />
        </div>
        </main>
        {isSearchModalOpen && <SearchStaywithDate />}
        {isDropDownModalOpen && <ProfileDropDown />}
        {isAuthModalOpen && <AuthModal />}
        {alert.open && <Alert />}
    </div>

    )
}