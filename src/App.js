import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Assets/Home';
import Login from './Assets/Login';
import Register from './Assets/Register';
import { AppStore } from './Store/AppStore';
import Details from './Assets/Details';
import Order from './Assets/Order';
import Cart from './Assets/Cart';
import NavigationBar from './Assets/Navbar';
import Product from './Assets/Product';
import Darkmode from 'darkmode-js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Flip } from 'react-toastify';
import Update from './Assets/Update'

function App() {
	const option = {
		label: '🌙',
	};
	new Darkmode(option).showWidget();

	
	return (
		<div className="App">
			<Provider store={AppStore}>
				<Router>
					<ToastContainer transition={Flip}></ToastContainer>
					<NavigationBar></NavigationBar>
					<Switch>
						<Route path="/details/:id">
							<Details></Details>
						</Route>
						<Route path="/cart/update/:id">
							<Update></Update>
						</Route>
						<Route path="/cart">
							<Cart></Cart>
						</Route>
						<Route path="/orderhistory">
							<Order></Order>
						</Route>
						<Route path="/login">
							<Login></Login>
						</Route>
						<Route path="/register">
							<Register></Register>
						</Route>
						<Route path="/product">
							<Product></Product>
						</Route>
						<Route path="/">
							<Home></Home>
						</Route>
					</Switch>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
