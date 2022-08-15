import { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import VehicleForm from "../Forms/VehicleForm";
import VehiclesContext from "../../store/vehicles-context";
import ButtonSmall from "../UI/ButtonSmall";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./ModifyVehicle.module.css";

const ModifyVehicle = () => {
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { vehicleDetailsIdCache, baseUrl } = vehCtx;
  const [vehicleToModify, setVehicleToModify] = useState({});
  const [isVehicleUploading, setIsVehicleUploading] = useState(false);
  const [error, setError] = useState(null);

  let headName =
    "Modyfikacja pojazdu: " +
    vehicleToModify.modelName +
    ", " +
    vehicleToModify.registrationNumber;

  const cancelHandler = () => {
    history.goBack();
  };

  const vehiclePictureUploadingHandler = () => {
    setIsVehicleUploading(true);
  };

  const modifyVehicleHandler = async (formData) => {
    setError(null);
    const url = baseUrl + "/vehicles/" + vehicleDetailsIdCache;
    setIsVehicleUploading(true);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        history.goBack();
      } else if (data.message) {
        throw new Error(data.message);
      } else {
        throw Error("Nie można zaktualizować zasobu w bazie danych!");
      }
    } catch (error) {
      setIsVehicleUploading(false);
      setError(error.message);
    }
  };

  const getVehicleById = async (id) => {
    const url = baseUrl + "/vehicles/" + id;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setVehicleToModify(data));
  };

  const deletePhotoHandler = async () => {
    const url = baseUrl + "/vehicles/" + vehicleDetailsIdCache;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ photoUrl: " " }),
    });
    if (response.ok) {
      history.goBack();
    }
  };

  useEffect(() => {
    getVehicleById(vehicleDetailsIdCache);
  }, []);

  return (
    <Fragment>
      <VehicleForm
        onCancel={cancelHandler}
        onSubmitForm={modifyVehicleHandler}
        headName={headName}
        actionName="Modyfikuj"
        onPictureUploading={vehiclePictureUploadingHandler}
      />
      {isVehicleUploading && <LoadingSpinner />}
      {error && <p className={classes.error}>BŁĄD: {error}</p>}
      <div className={classes.additional_options_wrapper}>
        <p>Dodatkowe opcje modyfikacji:</p>
        <ButtonSmall onClick={deletePhotoHandler}>
          Usuń zdjęcie pojazdu
        </ButtonSmall>
      </div>
    </Fragment>
  );
};

export default ModifyVehicle;
