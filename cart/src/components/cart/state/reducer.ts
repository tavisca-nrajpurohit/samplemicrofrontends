import {customCartState} from './customCartState';
import {ADD_TO_CART_REQUEST,CART_SET_ABSTRACT} from './actions'
import {set} from '@rakoon-badshah/dynamic-redux'


const initialState: customCartState = {
    searchesByID: {
    },
    numberOfSearches:0,
    abstractUpdated:true
};

 function AddItemToCart(state:customCartState,action):customCartState{
        if(action.formType=="search"){
            return AddNamesToCart(state,action);
        }else{
            return state;
        }
    }

function AddNamesToCart(state:customCartState,action):customCartState{
    let counter = state.numberOfSearches;
    counter++;
    let newState = set(state,'searchesByID'+'.'+counter+'.data',action.payload);
    newState = set(newState,'numberOfSearches',counter);
    newState = set(newState,'abstractUpdated',false);
    return newState;
    }

function UpdateAbstractInCart(state:customCartState,action):customCartState{
    let itemIndex = state.numberOfSearches;
    let newState = set(state,'searchesByID'+'.'+itemIndex+'.abstract',action.payload);
    newState = set(newState,'abstractUpdated',true);
    return newState;
    }

export const reducer = (propPath) => (state = initialState, action)=>{
    switch(action.type){
        case ADD_TO_CART_REQUEST:
            return AddItemToCart(state,action);
        case CART_SET_ABSTRACT:
            return UpdateAbstractInCart(state,action);
        default:
            return state;
    };
}
    