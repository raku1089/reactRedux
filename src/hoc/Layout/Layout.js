import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Aux/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}
        />
        <main className="Content">{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStatetoprops = (state) => {
  return { isAuthenticated: state.auth.token !== null };
};
export default connect(mapStatetoprops)(Layout);
