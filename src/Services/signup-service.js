import axios from "axios"

export const signupHandler = async (username, number, email, password, setAlert) => {
    try {
        const data = await axios.post("https://triphaven.onrender.com/api/auth/register", {
            username: username, number: number, email: email, password: password 
        } )

        console.log(data);

        setAlert({
            open: true,
            message: `Account Created:: username - ${username}`,
            type: "success"
        })

        return 1

    } catch (error) {
        console.log("error adding user to data");

        setAlert({
            open: true,
            message: `Error creating user or user already exist`,
            type: "warning"
        })

        return 0
    }
}