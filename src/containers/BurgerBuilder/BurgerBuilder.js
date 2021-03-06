import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildConrtols from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
    meat: 1.5,
    salad: 0.5,
    cheese: 0.6,
    bacon: 0.7
};

class BurgerBuilder extends Component {

   state = {

        ingredients : null,

        totalPrice: 4,

        purchasable: false,

        purchasing: false,

        loading: false,

        error: null

   }

   componentDidMount() 
   {
       axios.get("/ingredients.json")
            .then(response => {
               this.setState(
                   {ingredients: response.data}
               );
            })
            .catch(error => {
               console.log(error.message);
            })    
   }

    updatePurchaseState = (updatedIngredients) => {
        const ingredientsSum = Object.keys(updatedIngredients)
        .map(igKey => {
            return updatedIngredients[igKey];
        }).reduce((sum, el) => {
            return (sum + el);
        }, 0);

       this.setState(
           {
           purchasable: ingredientsSum > 0
           }
       );

    }


    addIngredientHandler = (type) => {

    let oldCount = this.state.ingredients[type];
    let updatedCount = oldCount + 1;
    let updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = updatedCount
    let oldPrice = this.state.totalPrice;
    let updatedPrice = oldPrice + INGREDIENTS_PRICES[type];

    this.setState(
        {
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        }
    );

    console.log("Ingredients [From State]", this.state.ingredients);
    
    this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
    
        let oldCount = this.state.ingredients[type];

        if(oldCount <= 0)
        {
            return;
        }

        let updatedCount = oldCount - 1;
        let updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount
        let oldPrice = this.state.totalPrice;
        let updatedPrice = oldPrice - INGREDIENTS_PRICES[type];

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            }
        );

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState(
            {
                purchasing: true
            }
        );
    }

    orderCancelledHandler = () => {
        this.setState(
            {
                purchasing: false
            }
        );
    }

    orderPlacedHandler = () => {
       // alert("Congradulations...Your order is placed successfully !!");


        let queryParams = [];

        for(let i in this.state.ingredients) {
           queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    

    render () {

    let orderSummary = null;
    
    if(this.state.ingredients)
    {
        orderSummary= <OrderSummary 
            ingredients = {this.state.ingredients} 
            totalPrice = {this.state.totalPrice}
            orderPurchased = {this.orderPlacedHandler}
            orderCancelled={this.orderCancelledHandler} />;
    }

    if(this.state.loading) {
        orderSummary = <Spinner />
    }

     const disabledInfo = {...this.state.ingredients};
     
     for(let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
     }

     return (
         <Aux>
         {this.state.ingredients ? <Burger ingredients={this.state.ingredients} /> : <Spinner />}
         <Modal show = {this.state.purchasing}
                modalClosed={this.orderCancelledHandler} > 
             {orderSummary}
         </Modal>
         <BuildConrtols 
            addedIngredient = {this.addIngredientHandler}
            removedIngredient = {this.removeIngredientHandler}
            disabledInfo = {disabledInfo}
            purchasable = {this.state.purchasable}
            ordered = {this.purchaseHandler}
            price = {this.state.totalPrice}/>
        </Aux>
        ); 
     }
}

export default withErrorHandler(BurgerBuilder, axios);