import { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import MalfunctionForm from "../Forms/MalfunctionForm";
import VehiclesContext from "../../store/vehicles-context";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Actions.module.css";

const AddMalfunction = () => {
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { vehicleDetailsIdCache, baseUrl } = vehCtx;
  const [vehicleToModify, setVehicleToModify] = useState({});
  const [isMalfunctionUploading, setIsMalfunctionUploading] = useState(false);
  const [error, setError] = useState(null);

  let headName =
    "Dodaj niesprawność pojazdu: " +
    vehicleToModify.modelName +
    ", " +
    vehicleToModify.registrationNumber;

  const cancelHandler = () => {
    history.goBack();
  };

  const addMalfunctionHandler = async (malfunctionData) => {
    setError(null);
    const url =
      baseUrl + "/vehicles/" + vehicleDetailsIdCache + "/malfunctions";
    setIsMalfunctionUploading(true);
    try {
      const response = await fetch(url, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(malfunctionData),
      });
      if (response.ok) {
        history.goBack();
      } else {
        throw new Error("Nie można dodać zasobu do bazy danych!");
      }
    } catch (error) {
      setIsMalfunctionUploading(false);
      setError(error.message);
    }
  };

  const getVehicleById = async (id) => {
    const url = baseUrl + "/vehicles/" + id;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setVehicleToModify(data));
  };

  useEffect(() => {
    getVehicleById(vehicleDetailsIdCache);
  }, []);

  return (
    <Fragment>
      <MalfunctionForm
        onCancel={cancelHandler}
        onSubmitForm={addMalfunctionHandler}
        headName={headName}
        actionName="Dodaj"
      />
      {isMalfunctionUploading && <LoadingSpinner />}
      {error && <p className={classes.error}>BŁĄD: {error}</p>}
    </Fragment>
  );
};

export default AddMalfunction;
