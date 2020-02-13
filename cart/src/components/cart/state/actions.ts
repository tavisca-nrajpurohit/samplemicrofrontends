export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const CART_SET_ABSTRACT = "CART_SET_ABSTRACT";

export function ACTION_ADD_TO_CART_REQUEST(data,formType){
    return {
        type: ADD_TO_CART_REQUEST,
        formType:formType,
        payload: data
    }
}

export function ACTION_CART_SET_ABSTRACT(abstract){
    return {
        type: CART_SET_ABSTRACT,
        payload: abstract
    }
}