import "./Filter.css"
import { FreeCancel, PriceRange, PropertyType, Ratings, RoomsAndBeds } from "./index"
import { useFilter } from "../../Context"

export const Filter = () => {

    const {filterDispatch} = useFilter()

    const handleFilterModalCloseClick = () => {
        filterDispatch({

            type: "SHOW_FILTER_MODAL"

        })

    }


    return (
        <div className="filter-modal" >
            <div className="filter-page shadow" >
                <div className="d-flex align-center justify-space-between">
                    <span className="filter-label">Filter</span>
                    <button className="button btn-close cursor-pointer d-flex align-center justify-center" onClick={handleFilterModalCloseClick}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <PriceRange />
                <RoomsAndBeds />
                <PropertyType />
                <Ratings />
                <FreeCancel />
                <div className="d-flex align-center justify-space-between">
                    <button className="button cursor btn-link-primary">Clear All</button>
                    <button className="button cursor btn-primary btn-apply">Apply</button>
                </div>
            </div>
        </div>

    )
}