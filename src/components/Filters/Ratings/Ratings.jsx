import { useFilter } from "../../../Context"

const ratings = ["1", "2", "3", "4", "5"]

export const Ratings = () => {

    const {tripHavenRating, filterDispatch} = useFilter()

    const handleRatingsClick = (rating) => {
        filterDispatch({
            type: "RATING",
            payload: rating
        })
    }

    return(
        <div className="filter-container" >
            <span className="filter-label">Ratings</span>
            <div className="d-flex align-center gap-large">
                {
                    ratings.map((rating) => (
                        <span className={`span-label aminity-count star d-flex align-center justify-center cursor-pointer on-hover ${tripHavenRating.toString() === rating ? "selected" : ""  } `} onClick={() => handleRatingsClick(rating) } key={rating} >{rating} &up</span>) )
                }
            </div>
        </div>
    )
}