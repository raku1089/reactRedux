import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "./Auth.css";
import * as actionTypes from "../../store/actions";
import { updateObject, checkValidity } from "../../shared/utility";

import Spinner from "../../components/UI/Spinner/Spinner";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
    isSignup: true,
  };
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectpath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  switchAuthModeHandler = () => {
    this.setState((prev) => {
      return { isSignup: !prev.isSignup };
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
        inValid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    let authRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectpath} />
    ) : null;
    return (
      <div className="Auth">
        {errorMessage}
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
          <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
            SWITCH TO
            {this.state.isSignup ? " SIGNIN" : " SIGNUP"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionTypes.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actionTypes.setAuthRedirectPath("/")),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectpath: state.auth.authRedirectpath,
    buildingBurger: state.burgerBuilder.building,
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Auth);
