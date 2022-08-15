import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Modal from "../UI/Modal";
import Button from "../UI/Button";

import classes from "./MalfunctionDetails.module.css";
import VehiclesContext from "../../store/vehicles-context";

const MalfunctionDetails = (props) => {
  const history = useHistory();
  const vehCtx = useContext(VehiclesContext);
  const { changeMalfunctionDetailsIdCache, baseUrl } = vehCtx;
  const malfunctionData = props.malfunction;
  const { id: malfunctionId } = malfunctionData;

  const archiveMalfunctionHandler = async () => {
    const url = baseUrl + "/malfunctions/" + malfunctionId + "/archive";
    await fetch(url, {
      method: "PATCH",
    });
    history.replace("/dashboard");
  };

  useEffect(() => {
    changeMalfunctionDetailsIdCache(malfunctionId);
  }, [changeMalfunctionDetailsIdCache, malfunctionId]);

  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.malfunctionDetails_h2}>
        NIESPRAWNOŚĆ: {malfunctionData.title}
      </h2>
      <div className={classes.buttons_holder}>
        <Button onClick={archiveMalfunctionHandler}>Archiwizuj</Button>
        <Link to="/modify-malfunction">
          <Button>Modyfikuj</Button>
        </Link>
        <Button onClick={props.onClose}>Powrót</Button>
      </div>
      <div className={classes.malfunctionDetails_lines}>
        <div>
          <b>Opis:</b> {malfunctionData.description}
        </div>
        <div>
          <b>Data powstania:</b> {malfunctionData.dateOfFailure.split(" ")[0]}
        </div>
        <div>
          <b>Podjęte działania:</b> {malfunctionData.actionTaken}
        </div>
        <div>
          <b>Miejsce naprawy:</b> {malfunctionData.placeOfRepair}
        </div>
        <div>
          <b>Przewidywany czas zakończenia naprawy:</b>{" "}
          {malfunctionData.expectedDateOfCompletion.split(" ")[0]}
        </div>
      </div>
    </Modal>
  );
};

export default MalfunctionDetails;
