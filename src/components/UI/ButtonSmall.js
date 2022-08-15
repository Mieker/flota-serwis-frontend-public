import classes from "./ButtonSmall.module.css";

const ButtonSmall = (props) => {
  return (
    <button className={classes.button_small} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default ButtonSmall;
