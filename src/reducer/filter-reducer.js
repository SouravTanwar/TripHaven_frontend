export const filterReducer = (state, {type, payload}) => {

    switch(type) {
        case "SHOW_FILTER_MODAL":
            return {
                ...state,
                isFilterModalOpen: !state.isFilterModalOpen
            }
        
        case "MINIMUM_PRICE":
            return {
                ...state,
                priceRange: [Math.min(payload.newValue[0], payload.priceRange[1] - payload.minDifference), payload.priceRange[1]]
            }

            case "MAXIMUM_PRICE":
                return {
                    ...state,
                    priceRange: [payload.priceRange[0], Math.max(payload.newValue[1], payload.priceRange[0] + payload.minDifference)]
                }
        
        default:
            return state
    }

}