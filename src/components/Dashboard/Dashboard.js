import { Link } from "react-router-dom";

import Button from "../UI/Button";
import VehiclesList from "./VehiclesList";

import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
      <div className={classes.add_button}>
        <Link to="/add-vehicle">
          <Button>Dodaj nowy pojazd</Button>
        </Link>
      </div>
      <VehiclesList />
    </div>
  );
};

export default Dashboard;
