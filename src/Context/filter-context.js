import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer";


const initialValue = {
    isFilterModalOpen: false,
    priceRange:[500, 20000],
    noOfBedrooms: "Any",
    noOfBathrooms: "Any",
    noOfBeds: "Any",
}


const FilterContext = createContext(initialValue)

const FilterProvider = ({children}) => {

    const [{isFilterModalOpen, priceRange, noOfBedrooms, noOfBathrooms, noOfBeds}, filterDispatch] = useReducer(filterReducer, initialValue)

    return (
        <FilterContext.Provider value={{isFilterModalOpen, priceRange, noOfBedrooms, noOfBathrooms, noOfBeds, filterDispatch}} >
            {children}
        </FilterContext.Provider>
    )
}

const useFilter = () => useContext(FilterContext)

export { useFilter, FilterProvider }