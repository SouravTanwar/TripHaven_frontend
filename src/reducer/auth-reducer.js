export const authReducer = (state, {type, payload}) => {
    switch(type){
        case "SHOW_AUTH_MODAL":
            return{
                ...state,
                isAuthModalOpen: !state.isAuthModalOpen
            }
        
        case "SET_TO_LOGIN":
                return {
                    ...state,
                    selectedTab: "login"
                }

        case "SET_TO_SIGNUP":
                return {
                    ...state,
                    selectedTab: "signup"

            }

        default:
            return state;
    }
}