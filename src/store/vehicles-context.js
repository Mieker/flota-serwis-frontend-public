import React, { useState } from "react";

const VehiclesContext = React.createContext({
  vehicles: [],
  vehicleCategories: [],
  vehicleDetailsIdCache: "",
  malfunctionDetailsIdCache: "",
  baseUrl: "",
  changeVehicleDetailsIdCache: (id) => {},
  changeMalfunctionDetailsIdCache: (id) => {},
  loadVehicles: (dataFromDb) => {},
});

export const VehiclesContextProvider = (props) => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleCategories, setVehicleCategories] = useState([
    "OSOBOWE",
    "MOTOCYKLE",
    "DOSTAWCZE",
    "CIEZAROWE",
    "BUDOWLANE",
    "PRZYCZEPY",
    "ROLNICZE",
    "SPECJALNE",
  ]);
  const [vehicleDetailsIdCache, setVehicleDetailsIdCache] = useState("");
  const [malfunctionDetailsIdCache, setMalfunctionDetailsIdCache] =
    useState("");
  // const baseUrl = "http://localhost:8080/api";
  const baseUrl = "https://flotaserwis-backend.herokuapp.com/api";
  
  const changeVehicleDetailsIdCache = (id) => {
    setVehicleDetailsIdCache(id);
  };

  const changeMalfunctionDetailsIdCache = (id) => {
    setMalfunctionDetailsIdCache(id);
  };

  const loadVehicles = (dataFromDb) => {
    setVehicles(dataFromDb.reverse());
  };

  const contextValue = {
    vehicles,
    vehicleCategories,
    vehicleDetailsIdCache,
    malfunctionDetailsIdCache,
    baseUrl,
    changeVehicleDetailsIdCache,
    changeMalfunctionDetailsIdCache,
    loadVehicles,
  };

  return (
    <VehiclesContext.Provider value={contextValue}>
      {props.children}
    </VehiclesContext.Provider>
  );
};

export default VehiclesContext;
