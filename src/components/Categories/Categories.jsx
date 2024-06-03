import axios from "axios"
import { useEffect, useState } from "react"
import "./Categories.css"

export const Categories = () => {

    const [categories, setCategories] = useState([])
    const [categoryToShow, setCategoryToShow] = useState(0)

    const handleRightButtonClick = () => {
        setCategoryToShow(prev => prev + 10)
    }

    const handleLeftButtonClick = () => {
        setCategoryToShow(prev => prev - 10)
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
                className="button btn-category btn-left fixed cursor-pointer"
                onClick={handleLeftButtonClick}>
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                )
            }
            {
                categories && categories.map(({_id, category}) => (<span key={_id}> {category} </span>))
            }
            {
                categoryToShow - 10 < categories.length && (
                <button 
                className="button btn-category btn-right fixed cursor-pointer"
                onClick={handleRightButtonClick}>
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
                )
            }
            
        </section>

    )
}