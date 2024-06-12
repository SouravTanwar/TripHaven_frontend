import { useRef, useState } from "react"
import { useAuth, useAlert } from "../../Context"
import { signupHandler } from "../../Services"
import { validateEmail, validateName, validateNumber, validatePassword } from "../../Utils"
import "./Auth.css"

export const AuthSignup = () => {

    const { username, email, password, confirmPassword, number, authDispatch } = useAuth()

    const { setAlert } = useAlert()

    const validationStates = useRef({
        isNumberValid: false,
        isNameValid: false,
        isEmailValid: false,
        isPasswordlValid: false,
        isConfirmPasswordlValid: false,
    })

    const [newPassword, setNewPassword] = useState("")

    
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

    const handleNameChange = (event) => {
        validationStates.current.isNameValid = validateName(event.target.value)

        if(validationStates.current.isNameValid){
            console.log("valid input")
            authDispatch({
                type: "NAME",
                payload: event.target.value
            })
        }
        else {
            console.log("Invalid Name");
        } 
    }

    const handleEmailChange = (event) => {
        validationStates.current.isEmailValid = validateEmail(event.target.value)

        if(validationStates.current.isEmailValid){
            console.log("valid input")
            authDispatch({
                type: "EMAIL",
                payload: event.target.value
            })
        }
        else {
            console.log("Invalid Email");
        } 
    }

    const handlePasswordChange = (event) => {
        validationStates.current.isPasswordlValid = validatePassword(event.target.value)

        if(validationStates.current.isPasswordlValid){
            console.log("valid input")
            setNewPassword(event.target.value)
            authDispatch({
                type: "PASSWORD",
                payload: event.target.value
            })
        }
        else {
            console.log("Invalid Password");
        } 
    }

    const handleConfirmPasswordChange = (event) => {
        validationStates.current.isConfirmPasswordlValid = newPassword === event.target.value ? true : false

        if(validationStates.current.isConfirmPasswordlValid){
            console.log("valid input")
            authDispatch({
                type: "CONFIRM_PASSWORD",
                payload: event.target.value
            })
        }
        else {
            console.log("Invalid Password");
        } 
    }

    const HandleFormSubmit = async (event) => {

        event.preventDefault()

        const {
            isNumberValid,
            isNameValid,
            isEmailValid,
            isPasswordlValid,
            isConfirmPasswordlValid,
        } = validationStates.current;
        
        if(!isNumberValid){
            setAlert({
                open: true,
                message: "Enter a Valid 10 digit no",
                type: "info"
            })
        }else if(!isNameValid){
            setAlert({
                open: true,
                message: "Please Enter a valid name",
                type: "info"
            })
        }else if(!isEmailValid){
            setAlert({
                open: true,
                message: "Please Enter a valid email",
                type: "info"
            })
        }else if(!isPasswordlValid){
            setAlert({
                open: true,
                message: "Please Enter a Password with atleast 8 char, upperCase, lowerCase, Digit, SpecialChar",
                type: "info"
            })
        }else if(!isConfirmPasswordlValid){
            setAlert({
                open: true,
                message: "Confirm password should be same as password",
                type: "info"
            })
        }else{
            
            if(await signupHandler(username, number, email, password, setAlert)){

                authDispatch({
                    type: "CLEAR_USER_DATA"
                })
                authDispatch({
                    type: "SET_TO_LOGIN"
                })
            }
        }
        
    }


    return (
        <div className="auth-container">
            <form onSubmit={HandleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number <span className="asterisk">*</span></label>
                    <input className="auth-input" maxLength="10" placeholder="Enter Mobile Number" defaultValue={number} type="number" required onChange={handleNumberChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Name <span className="asterisk">*</span></label>
                    <input className="auth-input" placeholder="Enter Name" defaultValue={username} required onChange={handleNameChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Email <span className="asterisk">*</span></label>
                    <input className="auth-input" placeholder="Enter Email" defaultValue={email} type="email" required onChange={handleEmailChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password <span className="asterisk">*</span></label>
                    <input className="auth-input" placeholder="Enter Password" defaultValue={password} type="password" required onChange={handlePasswordChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Confirm Password <span className="asterisk">*</span></label>
                    <input className="auth-input" placeholder="Enter Password" defaultValue={confirmPassword} type="password" required onChange={handleConfirmPasswordChange}/>
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Submit</button>
                </div>
            </form>
        </div>
    )
}