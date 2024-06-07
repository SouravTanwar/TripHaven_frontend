
const ratings = ["1", "2", "3", "4", "5"]

export const Ratings = () => {

    return(
        <div className="filter-container" >
            <span className="filter-label">Ratings</span>
            <div className="d-flex align-center gap-large">
                {
                    ratings.map((rating) => (
                        <span className="span-label aminity-count star d-flex align-center justify-center cursor-pointer on-hover " key={rating} >{rating} &up</span>) )
                }
            </div>
        </div>
    )
}