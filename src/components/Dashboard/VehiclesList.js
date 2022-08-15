import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import VehiclesContext from "../../store/vehicles-context";
import VehiclesListItem from "./VehiclesListItem";

import classes from "./VehiclesList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const VehiclesList = () => {
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { vehicles, baseUrl, loadVehicles, changeVehicleDetailsIdCache } =
    vehCtx;
  const [isVehicleListLoading, setIsVehicleListLoading] = useState(false);
  const [error, setError] = useState(null);

  const showDetailsHandler = (id) => {
    changeVehicleDetailsIdCache(id);
    history.push("/vehicle-details/" + id);
  };

  const vehiclesToDisplay = vehicles.map((vehicle) => (
    <VehiclesListItem
      key={vehicle.id}
      id={vehicle.id}
      name={vehicle.modelName}
      year={vehicle.yearOfProduction}
      registration={vehicle.registrationNumber}
      efficiency={vehicle.isTechnicallyEfficient ? "sprawny" : "niesprawny"}
      onShowDetails={showDetailsHandler}
    />
  ));

  const fetchVehicleListFromDb = useCallback(async () => {
    const url = baseUrl + "/vehicles?isArchived=false";
    let vehiclesData = [];
    setIsVehicleListLoading(true);
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Nie można pobrać zasobów z bazy danych!");
      })
      .then((data) => (vehiclesData = data))
      .catch((error) => {
        setError(error.message);
      });
    loadVehicles(vehiclesData);
    setIsVehicleListLoading(false);
  }, [baseUrl]);

  useEffect(() => {
    fetchVehicleListFromDb();
  }, [fetchVehicleListFromDb]);

  let vehicleListContent = isVehicleListLoading ? (
    <LoadingSpinner />
  ) : (
    <ul>{vehiclesToDisplay}</ul>
  );

  return (
    <Fragment>
      {error && <p className={classes.vehicles_list_error}>BŁĄD: {error}</p>}
      <div className={classes.vehicles_list}>{vehicleListContent}</div>
    </Fragment>
  );
};

export default VehiclesList;
