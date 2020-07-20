import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Home() {
    const dispatch = useDispatch()
    if (localStorage.getItem('Access_Token')) {
		dispatch({ type: 'loggedIn' });
	}
    
    useEffect(() => {

    }) 
    
        return (
            <>
                <h1>Home</h1>
            </>
        );
	
}

export default Home;
