import React from "react";
import "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = (props) => {
  let attachedClasses = props.open
    ? ["SideDrawer", "Open"]
    : ["SideDrawer", "Close"];
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className="LogoS">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
