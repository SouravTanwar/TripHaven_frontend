import { v4 as uuid } from "uuid"
import { useFilter } from "../../../Context"


const propertyTypes = [
    {id: uuid(), type: "House"}, 
    {id: uuid(), type: "Guest House"}, 
    {id: uuid(), type: "Flat"}, 
    {id: uuid(), type: "Hotel"}
]

export const PropertyType = () => {

    const {propertyType, filterDispatch} = useFilter()

    const handlePropertyClick = (type) => {
        filterDispatch({
            type: "PROPERTY_TYPE",
            payload: type
        })
    }

    return(
        <div className="filter-container" >
            <span className="filter-label">Property Type</span>
            <div className="d-flex gap-large">
                {
                    propertyTypes.map(({id, type}) => (
                        <span className={`span-label property-type cursor-pointer align-center justify-center on-hover 
                            ${propertyType === type ? "selected" : ""}`}
                        onClick={() => handlePropertyClick(type)}
                        key={id} >{type}</span>) )
                }
            </div>
        </div>
    )

}