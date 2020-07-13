import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Details() {
	useEffect(() => {});

	if (localStorage.getItem('access_token')) {
		return (
			<>
				<h1>Details</h1>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Details;
