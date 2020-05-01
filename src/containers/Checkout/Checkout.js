import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return (
      <div>
        {summary}

        {/* <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    purchased: state.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
