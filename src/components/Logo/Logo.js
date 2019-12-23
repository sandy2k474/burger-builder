import React from 'react'
import LogoImage from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const logo = () => (
<div className={classes.Logo}>
<img src={LogoImage} alt="Burger Logo" />
</div>
);

export default logo;