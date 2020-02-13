import {store} from './store';
import { LitElement, html} from 'lit-element';
import '../form';

export class App extends LitElement {
    render(){
        return html`<search-form 
            .store="${store}"
            propPath="app.searchForm" 
            ></search-form>`;
    }
}
customElements.define('main-form', App);