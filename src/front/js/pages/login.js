import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const Login = () => {
	const { store, actions } = useContext(Context);
	const { email, setEmail} = useState("")
	const { password, setPassword} = useState("")

	const handleClick = () => {

		const opts = {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				"email": "test",
    			"password": "test",
			})
		}
		fetch('https://curly-space-couscous-7v94gvgx79pq3rgx6-3001.app.github.dev/api/token', opts)
		.then(resp => {
			if(resp.status === 200) return resp.json();
			else alert('There has been an error')
		})
		.then()
		.catch(error => {
			console.log('There was an error', error)
		})
		console.log(email, password)

	}

	return (
		
		<div className="row justify-content-center">
			<div className="text-center">
				<h1>Login</h1>
			</div>
			<div className='col-md-3'>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control className='text-center' type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control className='text-center' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</Form.Group>
					<div className="text-center">
						<Button className='justify-content-center' variant="dark" type="submit" onClick={handleClick()}>
							Submit
						</Button>
					</div>
					
				</Form>
			</div>
		</div>
	);
};
