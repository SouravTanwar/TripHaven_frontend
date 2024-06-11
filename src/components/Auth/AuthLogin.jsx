import "./Auth.css"
import { validateNumber, validatePassword } from "../../Utils"
import { useRef } from "react"
import { useAuth } from "../../Context"
import { loginHandler } from "../../Services"

export const AuthLogin = () => {

    const {authDispatch, number, password} = useAuth()

    const validationStates = useRef({
        isNumberValid: false,
        isNameValid: false
    })

    const handleNumberChange = (event) => {
        validationStates.current.isNumberValid = validateNumber(event.target.value)

        if(validationStates.current.isNumberValid) {
            console.log("valid input")
            authDispatch({
                type: "NUMBER",
                payload: event.target.value
            })
        }
        else {
            console.log("Invalid Number");
        }        
    }


    const handlePasswordChange = (event) => {
        validationStates.current.isPasswordlValid = validatePassword(event.target.value)

        if(validationStates.current.isPasswordlValid){
            console.log("valid input")
            authDispatch({
                type: "PASSWORD",
                payload: event.target.value
            })
        }
        else {
            console.log("Invalid Password");
        } 
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const {isNumberValid, isPasswordlValid} = validationStates.current;

        if( isNumberValid && isPasswordlValid ){
            const {accessToken, username} = await loginHandler(number, password)
            authDispatch({
                type: "SET_ACCESS_TOKEN",
                payload: accessToken
            })

            authDispatch({
                type: "SET_USER_NAME",
                payload: username
            })
        }
        authDispatch({
            type: "CLEAR_USER_DATA"
        })

        authDispatch({
            type: "SHOW_AUTH_MODAL",
        })

    }


    const handleTestCredentialClick = async () => {
        const { accessToken, username } = await loginHandler(8080808080, "Asdf@123")
        authDispatch({
            type: "SET_ACCESS_TOKEN",
            payload: accessToken
        })
        authDispatch({
            type: "SET_USER_NAME",
            payload: username
        })
        authDispatch({
            type: "CLEAR_USER_DATA"
        })

        authDispatch({
            type: "SHOW_AUTH_MODAL",
        })
    }


    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number <span className="asterisk">*</span></label>
                    <input 
                    className="auth-input" 
                    defaultValue={number} 
                    maxLength="10" 
                    placeholder="Enter Mobile Number" 
                    type="number" 
                    required 
                    onChange={handleNumberChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password <span className="asterisk">*</span></label>
                    <input 
                    className="auth-input" 
                    defaultValue={password} 
                    placeholder="Enter Password" 
                    type="password" 
                    required 
                    onChange={handlePasswordChange} />
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Login</button>
                </div>
            </form>
            <div className="cta">
                <button className="button btn-outline-primary cursor-pointer" onClick={handleTestCredentialClick}>
                    Login with Test Credentials
                </button>
            </div>
        </div>
    )
}