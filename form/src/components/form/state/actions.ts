export const ADD_TO_LIST_REQUEST = "ADD_TO_LIST_REQUEST";

export function ACTION_ADD_TO_LIST_REQUEST(data){
    return {
        type: ADD_TO_LIST_REQUEST,
        formType:'search',
        payload: data
    }
}