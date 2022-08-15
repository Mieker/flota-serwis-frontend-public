import { useContext, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";

import VehicleForm from "../Forms/VehicleForm";
import VehiclesContext from "../../store/vehicles-context";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Actions.module.css";

const AddVehicle = () => {
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { baseUrl } = vehCtx;
  const [isVehicleUploading, setIsVehicleUploading] = useState(false);
  const [error, setError] = useState(null);

  const vehiclePictureUploadingHandler = () => {
    setIsVehicleUploading(true);
  };

  const cancelHandler = () => {
    history.push("/");
  };

  const addVehicleHandler = async (formData) => {
    setError(null);
    const url = baseUrl + "/vehicles";
    setIsVehicleUploading(true);
    try {
      const response = await fetch(url, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        history.replace("/");
      } else if (data.message) {
        throw new Error(data.message);
      } else {
        throw new Error("Nie można dodać zasobu do bazy danych!");
      }
    } catch (error) {
      setIsVehicleUploading(false);
      setError(error.message);
    }
  };

  return (
    <Fragment>
      <VehicleForm
        onCancel={cancelHandler}
        onSubmitForm={addVehicleHandler}
        headName="Dodaj pojazd:"
        actionName="Dodaj"
        onPictureUploading={vehiclePictureUploadingHandler}
      />
      {isVehicleUploading && <LoadingSpinner />}
      {error && <p className={classes.error}>BŁĄD: {error}</p>}
    </Fragment>
  );
};

export default AddVehicle;
