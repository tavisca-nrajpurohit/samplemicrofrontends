import { createStore, combineReducers, applyMiddleware} from '@rakoon-badshah/dynamic-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer= (state = {}, action)=>{
    return state;
}

const consoleLogger = store => next => action =>{
    console.log("__________ LOGGER SERVICE __________");
    console.log('Previous State', store.getState());
    console.log('Dispatching', action);
    let result = next(action);
    console.log('Next State', store.getState());
    return result;
}


export const store = createStore(combineReducers({
    app: rootReducer
}),composeWithDevTools(
    applyMiddleware(consoleLogger)
));