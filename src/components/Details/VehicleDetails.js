import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import VehiclesContext from "../../store/vehicles-context";
import Button from "../UI/Button";
import ButtonSmall from "../UI/ButtonSmall";
import Cart from "../UI/Cart";
import MalfunctionsList from "./MalfunctionsList";

import defaultVehImg from "../../assets/defaultVehicle.jpg";

import classes from "./VehicleDetails.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const VehicleDetails = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { vehicleDetailsIdCache, baseUrl } = vehCtx;
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [vehicleImageDisplay, setVehicleImageDisplay] = useState({
    display: "none",
  });
  const [showImage, setShowImage] = useState(false);
  const [error, setError] = useState(null);
  const [isPhotoError, setIsPhotoError] = useState(false);

  const [efficiencyStatus, setEfficiencyStatus] = useState("SPRAWNY");

  let efficiencyColorStyle =
    efficiencyStatus === "SPRAWNY" ? classes.efficient : classes.not_efficient;

  const archiveVehicleHandler = async () => {
    const url = baseUrl + "/vehicles/" + vehicleDetailsIdCache + "/archive";
    await fetch(url, {
      method: "PATCH",
    });
    history.replace("/dashboard");
  };

  const returnHandler = () => {
    history.push("/dashboard");
  };

  const fetchVehicleDetails = async (id) => {
    const url = baseUrl + "/vehicles/" + id;

    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Nie można pobrać zasobów z bazy danych!");
      })
      .then((data) => {
        if (data.malfunctions) {
          data.malfunctions = data.malfunctions.filter(
            (malfunction) => malfunction.archived === false
          );
        }
        setVehicleDetails(data);
        if (data.isTechnicallyEfficient === true) {
          setEfficiencyStatus("SPRAWNY");
        } else {
          setEfficiencyStatus("NIESPRAWNY");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const imageLoadedHandler = () => {
    setVehicleImageDisplay({ display: "block" });
    setShowImage(true);
  };

  const photoErrorHandler = () => {
    setShowImage(true);
    setIsPhotoError(true);
  };

  const switchEfficiencyHandler = async () => {
    await fetch(
      baseUrl +
        "/vehicles/" +
        vehicleDetailsIdCache +
        "/switch_technical_efficiency",
      {
        method: "PATCH",
      }
    );
    if (efficiencyStatus === "SPRAWNY") {
      setEfficiencyStatus("NIESPRAWNY");
    } else {
      setEfficiencyStatus("SPRAWNY");
    }
  };

  useEffect(() => {
    if (vehicleDetailsIdCache === "") {
      vehCtx.changeVehicleDetailsIdCache(id);
    }
    fetchVehicleDetails(id);
  }, []);

  return (
    <Fragment>
      {error && <p className={classes.error}>BŁĄD: {error}</p>}
      {!error && (
        <div className={classes.vehicle_details}>
          {vehicleDetails.modelName && (
            <div className={classes.vehicle_details_head}>
              <h1>
                {vehicleDetails.modelName}, {vehicleDetails.registrationNumber};
              </h1>
              <div className={classes.buttons_holder}>
                <Button onClick={archiveVehicleHandler}>Archiwizuj</Button>
                <Link to="/modify-vehicle">
                  <Button>Modyfikuj</Button>
                </Link>
                <Button onClick={returnHandler}>Powrót</Button>
              </div>
            </div>
          )}
          {vehicleDetails.modelName && (
            <Cart className={classes.cart}>
              <div className={classes.details_holder}>
                <div>
                  <p>
                    <b>KATEGORIA:</b> {vehicleDetails.category}
                  </p>
                  <p>
                    <b>MODEL:</b> {vehicleDetails.modelName}
                  </p>
                  <p>
                    <b>NUMER REJESTRACYJNY:</b>{" "}
                    {vehicleDetails.registrationNumber}
                  </p>
                  <p>
                    <b>VIN:</b> {vehicleDetails.vin}
                  </p>
                  <p>
                    <b>ROK PRODUKCJI:</b> {vehicleDetails.yearOfProduction}
                  </p>
                  <p>
                    <b>UŻYTKOWNIK:</b> {vehicleDetails.user}
                  </p>
                </div>
                <div>
                  <p className={efficiencyColorStyle}>
                    <b>{efficiencyStatus} </b>
                    <Button onClick={switchEfficiencyHandler}>
                      {efficiencyStatus === "NIESPRAWNY"
                        ? "SPRAWNY"
                        : "NIESPRAWNY"}
                    </Button>
                  </p>
                  <Link to="/add-malfunction">
                    <ButtonSmall>Dodaj niesprawność</ButtonSmall>
                  </Link>
                  <MalfunctionsList
                    malfunctions={vehicleDetails.malfunctions}
                  />
                </div>
              </div>
            </Cart>
          )}
          {vehicleDetails.modelName && (
            <div className={classes.vehicle_img}>
              {!showImage && vehicleDetails.photoUrl !== null && (
                <LoadingSpinner />
              )}
              {vehicleDetails.photoUrl && (
                <img
                  src={vehicleDetails.photoUrl}
                  alt="Zdjęcie pojazdu"
                  onLoad={imageLoadedHandler}
                  style={vehicleImageDisplay}
                  onError={photoErrorHandler}
                />
              )}
              {(vehicleDetails.photoUrl === null || isPhotoError) && (
                <img src={defaultVehImg} alt="Zdjęcie pojazdu" />
              )}
            </div>
          )}
          {!vehicleDetails.modelName && <LoadingSpinner />}
        </div>
      )}
    </Fragment>
  );
};

export default VehicleDetails;
