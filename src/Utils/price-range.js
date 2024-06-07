
export const getHotelsByPrice = (hotels, priceRange) => {
    const filterredHotels = hotels.filter(hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1])

    return filterredHotels
}