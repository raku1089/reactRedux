import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ orders: fetchOrders, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    // let order = <Spinner />;
    // if (this.state.loading) {
    //   order = this.state.orders.map((order) => <Order />);
    // }

    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
