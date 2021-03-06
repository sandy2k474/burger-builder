import React from 'react'
import classes from './Backdrop.css'

const backDrop = (props) => (
    <div className={classes.Backdrop}
         onClick={props.clicked}></div>
);

export default backDrop;