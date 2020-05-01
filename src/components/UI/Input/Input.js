import React from "react";
import "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = ["InputElement"];
  if (props.touched && props.inValid && props.shouldValidate) {
    inputClasses.push("Invalid");
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option option={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
