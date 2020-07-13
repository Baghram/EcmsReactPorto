import React, { useEffect } from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux'




function Product() {
    const dispatch = useDispatch()

    //Get Product List useEffect
	useEffect(() => {
		Axios({
			url: 'https://frozen-meadow-20864.herokuapp.com/product',
			method: 'GET',
			headers: {
				access_token: localStorage.getItem('access_token'),
			},
        })
            .then((result) => {
                dispatch({
                    type:'getProduct',
                    payload: result.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    });

    return (
        <>
        
        </>
    )
}

export default Product