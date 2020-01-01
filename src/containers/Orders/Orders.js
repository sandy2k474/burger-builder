import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component {
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
      axios.get('orders.json')
      .then(response => {
          console.log("My Orders: ", response.data)
          this.setState({loading: false})
        
          let myOrders = [];

          for(let key in response.data) {
              console.log("My Order: ", response.data[key]);
              myOrders.push({...response.data[key], id: key});
          }

          console.log("myOrders Array", myOrders);

         let orders =  myOrders.map(myOrder => {
             return <Order key = {myOrder.id} ingredients = {myOrder.ingredients} price = {myOrder.price} />
          })

          this.setState({orders: orders});

        })
      .catch(error => this.setState({loading: false}))    
    }

    render () {

        return this.state.loading ? <Spinner /> : (<div>
            {this.state.orders}
            </div>);
    }
}

export default Orders;