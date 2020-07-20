import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navigationbar() {
	const login = useSelector((store) => store.isLogin);
	const dispatch = useDispatch()
	const [variant, setVariant] = useState('light');
	const [variantCart, setVariantCart] = useState('light');
	const [variantOrder, setVariantOrder] = useState('light');
	const [variantProduct, setVariantProduct] = useState('light');

	function loggedOut() {
		dispatch({type: 'loggedOut'})
		localStorage.removeItem('Access_Token')
	}

	if (login === true) {
		return (
			<>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand>Notte's Shack</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Link to="/">
								<Button
									variant={variant}
									onMouseEnter={(e) => {
										setVariant('primary');
									}}
									onMouseLeave={(e) => setVariant('light')}
								>
									Home
								</Button>
							</Link>
							<Link to="/product">
								<Button
									variant={variantProduct}
									onMouseEnter={(e) => setVariant('primary')}
									onMouseLeave={(e) => setVariantProduct('light')}
								>
									Product
								</Button>
							</Link>
							<Link to="/cart">
								<Button
									variant={variantCart}
									onMouseEnter={(e) => setVariant('primary')}
									onMouseLeave={(e) => setVariantCart('light')}
								>
									Cart
								</Button>
							</Link>
							<Link to="/orderhistory">
								<Button
									variant={variantOrder}
									onMouseEnter={(e) => setVariant('primary')}
									onMouseLeave={(e) => setVariantOrder('light')}
								>
									Order History
								</Button>
							</Link>
						</Nav>
						<NavDropdown title="User" id="basic-nav-dropdown">
							<NavDropdown.Item>
								<Link to="/" onClick={loggedOut}>Logout</Link>
							</NavDropdown.Item>
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
						<Link to="/">
							<Button
								variant={variant}
								onMouseEnter={(e) => setVariant('primary')}
								onMouseLeave={(e) => setVariant('light')}
							>
								Home
							</Button>
						</Link>
					</Nav>
					<NavDropdown title="User" id="basic-nav-dropdown">
						<NavDropdown.Item>
							<Link to="/login">Login</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/register">Register</Link>
						</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

export default Navigationbar;
