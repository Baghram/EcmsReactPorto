import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigationbar() {
	const [login, setLogin] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setLogin(true);
		}
	}, []);

	if (login === true) {
		return (
			<>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand>Notte's Shack</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Link to="/">Home</Link>
							<Link to="/cart">Cart</Link>
							<Link to="/order">Order History</Link>
						</Nav>
						<NavDropdown title="User" id="basic-nav-dropdown">
							<NavDropdown.Item><Link to="/">Logout</Link></NavDropdown.Item>
						</NavDropdown>
					</Navbar.Collapse>
				</Navbar>
			</>
		);
	}

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand>Notte's Shack</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link to="/"><Button variant="light">Home</Button></Link>
						<Link to="/cart"><Button variant="light">Cart</Button></Link>
						<Link to="/orderhistory"><Button variant="light">Order History</Button></Link>
					</Nav>
					<NavDropdown title="User" id="basic-nav-dropdown">
						<NavDropdown.Item><Link to="/login">Login</Link></NavDropdown.Item>
						<NavDropdown.Item><Link to="/register">Register</Link></NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

export default Navigationbar;
