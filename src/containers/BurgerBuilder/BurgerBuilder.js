import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // removeIngredientHandler = (type) => {
  //   const oldCouunt = this.state.ingredients[type];
  //   if (oldCouunt <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCouunt - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Rakesh",
    //     address: {
    //       city: "Bangalore",
    //       zip: "560103",
    //       country: "India",
    //     },
    //     email: "test@gmail.com",
    //     deliveryMethod: "fastest",
    //   },
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          puchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    let burger = this.props.error ? (
      <p>Failed to load ingredients</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />

          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={!this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onIngredientAdded: (ingName) =>
//       dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
//     onIngredientRemove: (igName) =>
//       dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName }),
//   };
// };
// const mapStateToProps = (state) => {
//   return { ings: state.ingredients, price: state.totalPrice };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
