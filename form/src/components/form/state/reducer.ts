import {customFormState} from './customFormState';
import {ADD_TO_LIST_REQUEST} from './actions'
import {set} from '@rakoon-badshah/dynamic-redux'


const initialState: customFormState = {
    isFormSubmitted:false,
    text_SearchQuery:"",
    text_description:""
};

function formSubmitted(state:customFormState,action):customFormState{
let newState =  set(state,'isFormSubmitted',true);
newState = set(newState,'text_SearchQuery',action.payload.name);
newState = set(newState,'text_description',action.payload.nickName);
return newState;
}


export const reducer = (propPath) => (state = initialState, action)=>{
    if(action.formType=="search"){
        switch(action.type){
            case ADD_TO_LIST_REQUEST:
                return formSubmitted(state,action);
            default:
                return state;
        };
    }else{
        return state;
    }
    
}
