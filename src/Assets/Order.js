import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Order() {
	useEffect(() => {});

	if (localStorage.getItem('access_token')) {
		return (
			<>
				<h1>Order History</h1>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Order;
