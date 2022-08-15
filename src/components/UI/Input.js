import React, { Fragment } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputStyle = !props.isValid
    ? `${classes.input} ${classes.invalid_input}`
    : classes.input;

  return (
    <Fragment>
      {props.type !== "select" ? (
        <div className={inputStyle}>
          <label htmlFor={props.id}>{props.label}</label>
          <div className={classes.input_wrapper}>
            <input id={props.id} ref={ref} type={props.type} />
            {!props.isValid && (
              <div className={classes.invalid_input_error_message}>
                <p>{props.errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.input}>
          <label htmlFor={props.id}>{props.label}</label>
          <div className={classes.input_wrapper}>
            <select id={props.id} ref={ref} onFocus={props.onFocus}>
              {props.selectItems.map((item) => (
                <option key={item + "Key"}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </Fragment>
  );
});

export default Input;
