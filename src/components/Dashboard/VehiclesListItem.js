import classes from "./VehiclesListItem.module.css";

const VehiclesListItem = (props) => {
  const { name, year, registration, efficiency, id } = props;

  let efficiencyColorStyle =
    efficiency === "sprawny" ? classes.efficient : classes.not_efficient;

  let barEfficiencyStyleOnSmallScreen = efficiency === "sprawny"? classes.list_item : `${classes.list_item} ${classes.list_item_unefficient_on_small_screen}`;

  const showDetails = () => {
    props.onShowDetails(id);
  };

  return (
    <li className={barEfficiencyStyleOnSmallScreen} onClick={showDetails}>
      <div>
        <p>{name}</p>
      </div>
      <div className={classes.year}>
        <p>{year}</p>
      </div>
      <div>
        <p>{registration}</p>
      </div>
      <div className={efficiencyColorStyle}>
        <p>{efficiency}</p>
      </div>
    </li>
  );
};

export default VehiclesListItem;
