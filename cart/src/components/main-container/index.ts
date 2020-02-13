import { LitElement, html} from 'lit-element';
import '../cart';
import {store} from './store';

export class MainContainer extends LitElement {
    render(){
        return html`<my-cart 
            .store="${store}"
            propPath="app.Cart" 
            ></my-cart>`;
    }
}
customElements.define('main-container-cart', MainContainer);