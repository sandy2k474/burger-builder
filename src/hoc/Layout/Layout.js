import React, {Component} from 'react'
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer : false
    }
    
    sideDrawerToogledHandler = () => {
    
        this.setState((prevState) => {
            return {
                showSideDrawer : !prevState.showSideDrawer
            }
        });
        
    }

    sideDrawerClosedHandler = () => {
    
        this.setState(
            {
                showSideDrawer: false
            }
        );
        
    }

    render(){
        return <Aux>
        {this.state.showSideDrawer ? <SideDrawer show = {this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>: null }
        <Toolbar toggleSideDrawer={this.sideDrawerToogledHandler}/> 
        <main className={classes.Content}>{this.props.children}</main>
        </Aux>;
    }
}

export default Layout;