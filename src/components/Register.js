import { useState, useEffect } from "react"
import axios from "axios"
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [message, setMessage] = useState('')
    const [valid, setValid] = useState('')


    const handleRegister = (e) => {
        e.preventDefault()
        console.log(username, password, cpassword)
        axios.post('http://localhost:3005/users/register', { username, password })
            .then(response => console.log(response.data))
            .catch(err => window.alert(err.response.data.error))
    }

    //use state is asyncronous so it follows steps so first ma nei set state garcha ani check garcha


    // const handleChange=(e)=>{
    //     setCPassword(e.target.value)
    //     if (password!==cpassword){
    //         setValid('is-invalid')
    //         setMessage('password doesnot match')
    //         return
    //     }
    //     setValid('is-valid')
    // }


    useEffect(() => {
        if (password !== cpassword) {
            setValid('is-invalid')
            setMessage('password and confirm password does not match')
            return
        }
        setValid('is-valid')

    }, [cpassword, password])

    return (
        <>
            <p>Registration Form</p>
            <Form>
                <FormGroup>
                    <Label for="username">
                        Username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="enter your username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passsword">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cpasssword">
                        Confirm Password
                    </Label>
                    <Input className={valid}
                        id="cpassword"
                        name="cpassword"
                        placeholder="re-enter your password"
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}

                    />
                    <FormFeedback >{message} </FormFeedback>

                </FormGroup>
                <Button color='primary' onClick={handleRegister}>Register</Button>
            </Form>
        </>
    )
}
export default Register