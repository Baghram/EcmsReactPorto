import React, { useEffect } from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'


function Product() {
    const dispatch = useDispatch()

    //Get Product List useEffect
	useEffect(() => {
		Axios({
			url: 'https://frozen-meadow-20864.herokuapp.com/product',
			method: 'GET',
			headers: {
				access_token: localStorage.getItem('Access_Token'),
			},
        })
            .then((result) => {
                console.log('Product Data', result.data)
                dispatch({
                    type:'getProduct',
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
				<h1>Product</h1>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Product