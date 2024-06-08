import { createContext, useContext, useReducer } from "react"
import { authReducer } from "../reducer"


const initialValue = {
    isAuthModalOpen: false,
    name:"",
    number:"",
    email:"",
    password:"",
    selectedTab: "login"
}

const AuthContext = createContext(initialValue)

const AuthProvider = ({children}) => {

    const [{isAuthModalOpen, name, number, email, password, selectedTab}, authDispatch] = useReducer(authReducer, initialValue)


    return (
        <AuthContext.Provider value= {{isAuthModalOpen, name, number, email, password, selectedTab, authDispatch}} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }