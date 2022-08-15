import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return <header className={classes.header}>
    <Link to="/">
      <div className={classes.logo}>FlotaSerwis</div>
    </Link>
  </header>;
};

export default MainHeader;
