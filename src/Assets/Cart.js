import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from 'axios'

function Cart() {
	const dispatch = useDispatch();

	useEffect(() => {
        Axios({
			url: 'https://frozen-meadow-20864.herokuapp.com/cart',
			method: 'GET',
			headers: {
				access_token: localStorage.getItem('Access_Token'),
			},
        })
            .then((result) => {
                console.log('Cart Result',result.data)
                dispatch({
                    type:'getCart',
                    payload: result.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    });

	if (localStorage.getItem('Access_Token')) {
        dispatch({ type: 'loggedIn' });
		return (
			<>
				<h1>Cart</h1>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Cart;
