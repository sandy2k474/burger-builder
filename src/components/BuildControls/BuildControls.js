import React from 'react'
import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl'

let controls = [
    {label: "Salad", type: "salad"},
    {label: "Meat", type: "meat"},
    {label: "Cheese", type: "cheese"},
    {label: "Bacon", type: "bacon"}
];

const buildControls = (props) => (

    <div className={classes.BuildControls}>

    <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>

    {
           controls.map(control => {
           return <BuildControl 
           key={control.label} 
           label={control.label} 
           addedIng = {() => props.addedIngredient(control.type)}
           removedIng = {() => props.removedIngredient(control.type)} 
           disabled = {props.disabledInfo[control.type]} />
        })
    }

    <button 
    className={classes.OrderButton} 
    disabled = {!props.purchasable}
    onClick={props.ordered}>ORDER NOW</button>
    
    </div>
);

export default buildControls;