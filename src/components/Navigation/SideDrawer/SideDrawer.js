import React from 'react' 
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Aux/Aux'
import BackDrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

   let sideDrawerClasses = [classes.SideDrawer, classes.Close];

    if(props.show) {

        sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }

   return(

     <Aux>

         {props.show ? <BackDrop clicked={props.closed}/> : null}
         
         {console.log("SideDrawer classes: " ,sideDrawerClasses.join(' '))}

         <div className={sideDrawerClasses.join(' ')}>
           <div className={classes.Logo}>
           <Logo />
           </div>
           <nav>
               <NavigationItems />
           </nav> 
        </div>
        </Aux>
    );
}

export default sideDrawer;