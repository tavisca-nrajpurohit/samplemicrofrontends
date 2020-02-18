import { LitElement, html, property} from 'lit-element';
import {reducer} from './state/reducer';
import {get} from '@rakoon-badshah/dynamic-redux';
import {GetAbstract} from './CartApi';
import {connect} from '@orxe/store-connect';
import {ACTION_ADD_TO_CART_REQUEST} from './state/actions';

export class MyCart extends LitElement {

  @property({type : String})  
  propPath="app";
  @property({type : Object})  
  store;

  @property({type:Array}) searches=[];
  numberOfSearches=0;

  constructor(){
      super();
  }

  firstUpdated(){
    if(this.store){
      this.store.attachReducers({ [this.propPath]:reducer(this.propPath)});
      this.resetData();
      this.store.subscribe(()=>{
        if(!get(this.store.getState(),this.propPath)["abstractUpdated"]){
          this.resetDataAndCallGetAbstract();
        }else{
          this.resetData();
        }
      });
    }

    //////////////////////////////////////////////////////
    const search$ = connect('search');
    search$.subscribe(res => {
        alert("CART connect called");
        console.log("cart response",res);
        if(res["state"]["data"][0]!=undefined){   
          let stdata:any = res["state"]["data"][0]["action"];
          this.store.dispatch(ACTION_ADD_TO_CART_REQUEST(stdata.payload,stdata.formType));
        }
    });
    //////////////////////////////////////////////////////

  }

  render(){
    return html`
        <h1>Cart</h1>
        ${this.numberOfSearches>0?html`
          <h3>Items:</h3>
          <ul>
              ${Object.keys(this.searches).map(item=>
                html`<li><b>${this.searches[item]["data"]["searchQuery"]}:</b><br>${this.searches[item]["abstract"]}</li><br>`)
              }
          </ul>
          <hr>
          `:html`empty`
        }
                `;
  }

  resetDataAndCallGetAbstract(){
    let st = this.store.getState();
    let data = get(st,this.propPath);
    this.searches= data["searchesByID"];
    this.numberOfSearches = data.numberOfSearches;
    GetAbstract(this.numberOfSearches, this.store, this.propPath);
  }


  resetData(){
    let st = this.store.getState();
    let data = get(st,this.propPath);
    this.searches= data["searchesByID"];
    this.numberOfSearches = data.numberOfSearches;
  }
  
}
customElements.define('my-cart', MyCart);