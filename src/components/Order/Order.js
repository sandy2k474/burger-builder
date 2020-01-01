import React from 'react'
import classes from './Order.css'

const order = (props) => {

    console.log("Order Ingredients: ", props.ingredients);

    let displayIngredients = [];

     for (let igName in props.ingredients) {
      displayIngredients.push(
      <span key={igName} style={{textTransform: 'capitalize', margin: '0 10px', padding: '5px', border: '1px solid #eee' , boxSizing: 'border-box'}}>{igName} ({props.ingredients[igName]})</span>)
     }

return (
    <div className={classes.Order}>
        <p>Ingredients: {displayIngredients} </p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>
);
}

export default order;