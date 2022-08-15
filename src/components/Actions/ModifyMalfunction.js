import { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import MalfunctionForm from "../Forms/MalfunctionForm";
import VehiclesContext from "../../store/vehicles-context";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Actions.module.css";

const ModifyMalfunction = () => {
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { vehicleDetailsIdCache, malfunctionDetailsIdCache, baseUrl } = vehCtx;
  const [vehicleToModify, setVehicleToModify] = useState({});
  const [malfunctionToModify, setMalfunctionToModify] = useState({});
  const [isMalfunctionUploading, setIsMalfunctionUploading] = useState(false);
  const [error, setError] = useState(null);

  let headName =
    "Modyfikacja niesprawności: " +
    malfunctionToModify.title +
    ", przy pojeździe: " +
    vehicleToModify.modelName +
    ", " +
    vehicleToModify.registrationNumber;

  const cancelHandler = () => {
    history.goBack();
  };

  const modifyMalfunctionHandler = async (formData) => {
    const url = baseUrl + "/malfunctions/" + malfunctionDetailsIdCache;
    setIsMalfunctionUploading(true);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        history.goBack();
      } else {
        throw new Error("Nie można zaktualizować zasobu w bazie danych!");
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

  const getMalfunctionById = async (id) => {
    const url = baseUrl + "/malfunctions/" + id;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setMalfunctionToModify(data));
  };

  useEffect(() => {
    getVehicleById(vehicleDetailsIdCache);
    getMalfunctionById(malfunctionDetailsIdCache);
  }, []);

  return (
    <Fragment>
      <MalfunctionForm
        onCancel={cancelHandler}
        onSubmitForm={modifyMalfunctionHandler}
        headName={headName}
        actionName="Modyfikuj"
      />
      {isMalfunctionUploading && <LoadingSpinner />}
      {error && <p className={classes.error}>BŁĄD: {error}</p>}
    </Fragment>
  );
};

export default ModifyMalfunction;
