export const getHotelsByRoomsAndBeds = (hotels, noOfBedrooms, noOfBeds, noOfBathrooms ) => {

    if(noOfBathrooms === "Any" || noOfBedrooms === "Any" || noOfBeds === "Any" ) 
        return hotels

    const filteredHotels = hotels.filter(({numberOfBedrooms, numberOfBeds, numberOfBathrooms}) => 
        numberOfBathrooms === noOfBathrooms ||
        numberOfBedrooms === noOfBedrooms ||
        numberOfBeds === noOfBeds )
    
    return filteredHotels
}