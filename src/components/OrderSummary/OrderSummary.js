import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Button from '../UI/Button/Button'

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
                        .map(igKey => {
                        return <li key={igKey}>
                            <span style={{textTransform: "capitalize"}}>{igKey}</span> : {props.ingredients[igKey]}
                            </li>
                        }); 

    return <Aux>
        <h3>Order Summary</h3>
        <p>Your delicious burger will have following ingredients: </p>
        <ul>
        {ingredients}
        </ul>

                    <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>

        <p>Do you want to checkout ?</p>
        
        <Button btnType='Danger' clicked={props.orderCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={props.orderPurchased}>CONTINUE</Button>
      
    </Aux>

}

export default orderSummary;