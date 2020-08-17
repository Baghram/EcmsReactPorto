import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Product.css';
import ProductCard from './ProductCard';

function Product() {
	const dispatch = useDispatch();
	const ProductLists = useSelector((store) => store.Products);

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
				console.log('Product Data', result.data);
				dispatch({
					type: 'getProduct',
					payload: result.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, [dispatch]);

	if (localStorage.getItem('Access_Token')) {
		dispatch({ type: 'loggedIn' });
		return (
			<>
				<h1>Product</h1>
				<div className="darkmode-ignore">
					<div className="productTable">
						{ProductLists.map((ProductList) => (
							<ProductCard key={ProductList.id} data={ProductList}></ProductCard>
						))}
					</div>
				</div>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Product;
