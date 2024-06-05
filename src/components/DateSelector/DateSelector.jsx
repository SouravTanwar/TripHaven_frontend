import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css"
import { useState } from "react"
import { useDate } from "../../Context";


export const DateSelector = ({checkInType}) => {

    const {checkInDate, checkOutDate, dateDispatch} = useDate();

    const handleDateChange = (date) => {
        dateDispatch({
            type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
            payload: date

        });
    }

    return (
        <DatePicker className="search-dest input" 
        selected={checkInType === "in" ? checkInDate : checkOutDate} 
        onChange={date => handleDateChange(date)}
        dateFormat= "dd/MM/yyyy" 
        placeholderText="Add dates" 
        inDate={new Date()}
        closeOnScroll={true} />
    )

}