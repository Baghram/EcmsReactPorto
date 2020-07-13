import React, { useEffect } from 'react'
import {Redirect} from 'react-router-dom'

function Cart() {

    useEffect(() => {

    }) 

    if(localStorage.getItem('access_token')) {
        return (
            <>
                <h1>Cart</h1>
            </>
        );
    }
    else {
        return <Redirect to="login"></Redirect>
    }
}

export default Cart 