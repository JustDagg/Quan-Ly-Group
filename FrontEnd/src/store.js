import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import viewReducer from './reducers/viewReducer';
import { userInfoReducer } from './reducers/userReducers';

const rootReducer = combineReducers({
    view: viewReducer,
    userInfo: userInfoReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;

