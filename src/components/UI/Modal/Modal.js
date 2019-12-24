import React, {Component} from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import BackDrop from '../Backdrop/Backdrop'

class Modal extends Component {



shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
}
 
render() {

 return <Aux>

{this.props.show ? <BackDrop clicked={this.props.modalClosed}/> : null}

<div className={classes.Modal} 
            style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'}}>
    {this.props.children}
    </div>
    </Aux>
 }
}

export default Modal;
