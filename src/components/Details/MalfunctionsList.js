import { useState } from "react";
import MalfunctionDetails from "./MalfunctionDetails";

import classes from "./MalfunctionsList.module.css";

const MalfunctionsList = (props) => {
  const listOfMalfunctions = props.malfunctions || [];
  const [isMalfunctionDetailsShown, setIsMalfunctionDetailsShown] =
    useState(false);
  const [malfunctionDetails, setMalfunctionDetails] = useState({});

  const showDetailsHandler = (malfunction) => {
    setMalfunctionDetails(malfunction);
    setIsMalfunctionDetailsShown(true);
  };

  const hideDetailsHandler = () => {
    setIsMalfunctionDetailsShown(false);
  };

  return (
    <div className={classes.malfunction_list}>
      <ul>
        {listOfMalfunctions.map((malfunction) => {
          return (
            <li
              key={malfunction.id}
              onClick={(event) => showDetailsHandler(malfunction)}
            >
              {malfunction.title}
            </li>
          );
        })}
      </ul>
      {isMalfunctionDetailsShown && (
        <MalfunctionDetails
          malfunction={malfunctionDetails}
          onClose={hideDetailsHandler}
        />
      )}
    </div>
  );
};

export default MalfunctionsList;
