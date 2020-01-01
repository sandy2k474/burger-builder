import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './Contact-Data/ContactData'

class Checkout extends Component {

   state = {
       ingredients: null,
       price: 0
   }

   componentWillMount()
   {
       let queryParams = new URLSearchParams(this.props.location.search);
      
       let inputIngredients = {};
       let price = 0

       for(let param of queryParams.entries())
       {
        if(param[0] === 'price')
        {
            price = param[1];
        }
        else {
        inputIngredients[param[0]] = +param[1];
        }
       }

       this.setState(
            {
             ingredients: inputIngredients,
             price: price
            }
       );
  }

   checkoutCancelledHandler = () => {
     //this.props.histoty.goBack();
     this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
    //this.props.histoty.goBack();
    this.props.history.replace('/checkout/contact-data')
  }

    render() {
      return (
          <React.Fragment>
          <div>
              <CheckoutSummary 
              ingredients = {this.state.ingredients} 
              checkoutCancelled = {this.checkoutCancelledHandler}
              checkoutContinued = {this.checkoutContinuedHandler} />
          </div>
          <div>
          <Route 
            path={this.props.match.path + '/contact-data'} 
            render={(props) => (
                <ContactData ingredients={this.state.ingredients} price= {this.state.price} {...props}/>
            )} />
          </div>
          </React.Fragment>
      )
    }
}

export default Checkout;