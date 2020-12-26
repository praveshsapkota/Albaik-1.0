import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

interface props {}

export const RegisterScreen: React.FC<props> = (location, history) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const submitHandler = async () => {};

	return (
		<div className="form">
			<h2>Sign Up</h2>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label> Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="confirmpassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Conform password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Row>
					<Col>
						<Checkbox
							defaultChecked
							size="small"
							inputProps={{ "aria-label": "checkbox with small size" }}
						/>
						I agree to the Terms and Conditions
					</Col>
				</Row>
				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an Account?{" "}
					{/* <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						Login
					</Link> */}
				</Col>
			</Row>
			<Form />
		</div>
	);
};
