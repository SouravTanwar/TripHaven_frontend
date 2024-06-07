import axios from "axios"
import { useEffect, useState } from "react"
import "./Categories.css"
import { useCategory, useFilter } from "../../Context"


export const Categories = () => {

    const [categories, setCategories] = useState([])
    const [categoryToShow, setCategoryToShow] = useState(0)

    const {hotelCategory, setHotelCategory} = useCategory()

    const { filterDispatch } = useFilter()

    const handleRightButtonClick = () => {
        setCategoryToShow(prev => prev + 10)
    }

    const handleLeftButtonClick = () => {
        setCategoryToShow(prev => prev - 10)
    }

    const handleCategoryClick = (category) => {
        console.log({category});
        setHotelCategory(category)

    }

    const handleFilterClick = () => {

        filterDispatch({
            type: "SHOW_FILTER_MODAL",
        })

    }

    useEffect(() => {
        (async ()=> {
            try {
                const {data} = await axios.get("https://triphaven.onrender.com/api/categories")
                const categoriesVisible = data.slice(
                    categoryToShow +10 > data.length ? data.length -10 : categoryToShow,
                    categoryToShow > data.length ? data.length : categoryToShow + 10
                );
                setCategories(categoriesVisible);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [categoryToShow])

    return(
        <section className="categories d-flex align-center gap-large cursor-pointer">
            {
                categoryToShow >=10 && (
                <button 
                className="button btn-category btn-left fixed cursor-pointer d-flex align-center justify-center"
                onClick={handleLeftButtonClick}>
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                )
            }
            {
                categories && categories.map(({_id, category}) => (<span className={`${category === hotelCategory ? "border-bottom" : ""}`} key={_id} onClick={() => handleCategoryClick(category)}> {category} </span>))
            }
            {
                categoryToShow - 10 < categories.length && (
                <button 
                className="button btn-category btn-right fixed cursor-pointer d-flex align-center justify-center"
                onClick={handleRightButtonClick}>
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
                )
            }
            <button className="button btn-filter d-flex align-center gap-small cursor-pointer fixed" onClick={handleFilterClick} >
                <span className="material-symbols-outlined">filter_alt</span>
                <span>Filter</span>
            </button>
        </section>

    )
}