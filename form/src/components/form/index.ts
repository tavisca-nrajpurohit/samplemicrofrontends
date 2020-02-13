import { LitElement, html, property} from 'lit-element';
import {reducer} from './state/reducer';
import {ACTION_ADD_TO_LIST_REQUEST} from './state/actions';
import '../../components/input';
import '@material/mwc-button';
import {get} from '@rakoon-badshah/dynamic-redux';
import {SearchContracts} from '@orxe/search-contract';

export class SearchForm extends LitElement {

  @property({type : String})  
  propPath="app";
  @property({type : Object})  
  store;

  searchQuery="";
  description="";

  render(){
    if(this.store){
      this.store.attachReducers({ [this.propPath]:reducer(this.propPath)});
      this.store.subscribe(()=>{
        let st = this.store.getState();
        this.searchQuery = get(st,this.propPath+".searchQuery.value");
        this.description = get(st,this.propPath+".description.value");
      });
    } 

    return html`
    Search Form:<br>
    <form>
    <my-input 
    .store="${this.store}"
    propPath="${this.propPath}.searchQuery" 
    label="searchQuery"
    value="${this.searchQuery}"
    ></my-input>
    <br>
    <my-input 
    .store="${this.store}"
    propPath="${this.propPath}.description" 
    label="description"
    value="${this.description}"
    ></my-input>
    <br>
    <mwc-button outlined label="Submit" @click = "${this.SubmitForm}"></mwc-button>
                </form>`;
  }

  SubmitForm(){
    let data = {
      searchQuery: this.searchQuery,
      description: this.description
    };
    this.store.dispatch(ACTION_ADD_TO_LIST_REQUEST(data));
    ////////////////////////////////////////////////////////////////////
    SearchContracts.searchStart(this.searchQuery);
    setTimeout(() => {
      const searchResults = [{result: 'Seach Completed for'+this.searchQuery+'!'}];
      SearchContracts.searchComplete(searchResults);
      alert("Search Complete triggered !");
      }, 5000);
    ////////////////////////////////////////////////////////////////////
  }
}
customElements.define('search-form', SearchForm);