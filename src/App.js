import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddVehiclePage from "./pages/AddVehiclePage";
import ModifyVehiclePage from "./pages/ModifyVehiclePage";
import AddMalfunctionPage from "./pages/AddMalfunctionPage";
import DashboardPage from "./pages/DashboardPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import VehiclesContext from "./store/vehicles-context";
import ModifyMalfunctionPage from "./pages/ModifyMalfunctionPage";

function App() {
  const vehCtx = useContext(VehiclesContext);
  const { vehicleDetailsIdCache } = vehCtx;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/add-vehicle">
          <AddVehiclePage />
        </Route>
        <Route path="/modify-vehicle">
          <ModifyVehiclePage />
        </Route>
        <Route path="/vehicle-details/:id">
          <VehicleDetailsPage />
        </Route>
        <Route path="/add-malfunction">
          {!vehicleDetailsIdCache && <Redirect to="/dashboard" />}
          <AddMalfunctionPage />
        </Route>
        <Route path="/modify-malfunction">
          {!vehicleDetailsIdCache && <Redirect to="/dashboard" />}
          <ModifyMalfunctionPage />
        </Route>
        <Route path="/*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
