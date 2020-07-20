import thunk from 'redux-thunk'
const {createStore, applyMiddleware, compose} = require('redux')
const initialState = {
    Products: [],
    Cart: [],
    Order: [],
    isLogin: false
}

function Store(state=initialState, action) {
    console.log('store invoked')
    switch (action.type) {
        case 'loggedIn':
            state.isLogin = true
            return state    
        case 'loggedOut':
            state.isLogin = false
            return state
        case 'getCart':
            state.Cart = action.payload
            return state
        case 'getOrder':
            state.Order = action.payload 
            return state
        case 'getProduct':
            state.Products = action.payload
            return state
        
        default:
            return state;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const AppStore = createStore(Store, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
))
AppStore.subscribe(() => console.log(AppStore.getState()))

export {AppStore}