import { useState } from "react"
import userService from "../services/userService"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { useNavigate } from "react-router-dom"
function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const Navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username,password)
        userService.login({username, password})
            .then(response => {
                console.log(response.data)
                window.localStorage.setItem('token', response.data.token)
                window.alert(response.data.status)
                Navigate('/home')
            }
            ).catch(err => window.alert(err.response.data.err))
    }
    return (
        <div>
            <h2>Login</h2>
            <Form>
                <FormGroup >
                    <Label for="username">
                        username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="enter Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </FormGroup>
                {' '}
                <FormGroup >
                    <Label for="Password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder=" Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </FormGroup>
                {' '}
                <Button onClick={handleSubmit}>
                    Login
                </Button>
            </Form>

        </div>

    )
}

export default Login