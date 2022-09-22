import React, { Component } from "react";
import AddToll, { VEHICLE_TYPE } from "../Component/AddToll";
import AddVehicle from "../Component/AddVehicle";
import CustomButton from "../Component/CustomButton";
import CustomInput from "../Component/CustomInput";
import TollsTable from "../Component/TollsTable";
import VehiclesTable from "../Component/VehiclesTable";
import {
  getTolls,
  getVehicleDate,
  storeTolls,
  storeVehicleDate,
} from "../Utils/Storage";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      showAddVehicleDialog: false,
      tollName: "",
      type: "bus",
      vehicleNumber: "",
      tariff: "",
      tolls: [],
      showAddToll: false,
      vehicleFareDetails: [],
      showAllTolls: false,
      searchQuery: "",
      errorMessage: "",
    };
  }

  componentDidMount = () => {
    let vehicles = getVehicleDate();
    let tolls = getTolls();
    this.setState({
      vehicles,
      tolls,
    });
  };

  handleAddVehicleEntry = () => {
    this.setState({
      tollName: "",
      type: "bus",
      vehicleNumber: "",
      tariff: "",
      showAddVehicleDialog: true,
    });
  };

  onChange = (event, value) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveVehcleEntry = () => {
    let { vehicles, tollName, type, vehicleNumber, tariff, tolls } = this.state;
    console.log(tollName, type, vehicleNumber, tariff);

    tollName = tollName || tolls[0].tollName;

    if (!vehicleNumber) {
      this.setState({ errorMessage: "Enter Vehicle number." }, this.showError);
      return;
    }

    if (!tariff) {
      this.setState({ errorMessage: "Enter teriff." }, this.showError);
      return;
    }

    vehicles.push({
      tollName,
      type,
      vehicleNumber,
      tariff,
      dateAndTime: new Date().toISOString(),
    });

    this.setState({ vehicles, showAddVehicleDialog: false }, () => {
      storeVehicleDate(vehicles);
    });
  };

  handleAddTollEntry = () => {
    this.setState({
      tollName: "",
      showAddToll: true,
    });
  };

  onVehicleFareChange = (event, index) => {
    console.log(event, index);
    let { vehicleFareDetails } = this.state;
    let fare = vehicleFareDetails[index] || {};
    fare[event.target.name] = event.target.value;
    vehicleFareDetails[index] = fare;

    this.setState({
      vehicleFareDetails,
    });
  };

  saveTollEntry = () => {
    let { vehicleFareDetails, tollName, tolls } = this.state;

    vehicleFareDetails = vehicleFareDetails.map((data) => {
      data.tollName = data.tollName || VEHICLE_TYPE[0];
      return data;
    });

    tollName = tollName || tolls[0];
    tolls.push({
      tollName,
      vehicleFareDetails,
      dateAndTime: new Date().toISOString(),
    });

    this.setState({ tolls, showAddToll: false }, () => {
      storeTolls(tolls);
    });
  };

  toggleAllTollsView = () => {
    this.setState((prevState, props) => ({
      showAllTolls: !prevState.showAllTolls,
    }));
  };

  search = (event) => {
    let { showAllTolls } = this.state;
    let searchQuery = event.target.value?.trim();

    console.log(searchQuery);

    let tolls = getTolls();
    let vehicles = getVehicleDate();

    if (showAllTolls) {
      tolls = tolls.filter(
        (toll) => toll.tollName?.includes(searchQuery) || false
      );
    } else {
      vehicles = vehicles.filter(
        (vehicle) => vehicle.vehicleNumber?.includes(searchQuery) || false
      );
    }

    this.setState({
      tolls,
      vehicles,
      searchQuery,
    });
  };

  showError = () => {
    var element = document.getElementById("snackbar");
    element.className = "show";
    setTimeout(function () {
      element.className = element.className.replace("show", "");
    }, 3000);
  };

  closeDialog = () => {
    this.setState({
      showAddToll: false,
      showAddVehicleDialog: false,
    });
  };

  render() {
    let {
      vehicles,
      showAddVehicleDialog,
      tolls,
      tollName,
      type,
      vehicleNumber,
      tariff,
      showAddToll,
      vehicleFareDetails,
      showAllTolls,
      searchQuery,
      errorMessage,
    } = this.state;

    return (
      <div className="mt-5 d-felx justify-content-left">
        <h4>Toll Management application</h4>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4>
              {showAllTolls ? "Tollgate List" : "Toll entries/Vehicle entries"}
            </h4>
            {
              //FilterIcon
            }
            <CustomInput
              onChange={this.search}
              placeholder={showAllTolls ? "Search a toll" : "Search a vehicle"}
              style={{ minHeight: 30, height: 30, margin: 0, marginLeft: 10 }}
            />
          </div>
          <div>
            <CustomButton
              style={{ marginLeft: 20 }}
              onClick={this.handleAddVehicleEntry}
            >
              Add vehicle entry
            </CustomButton>
            <CustomButton
              style={{ marginLeft: 20 }}
              onClick={this.handleAddTollEntry}
            >
              Add new toll
            </CustomButton>
            <CustomButton
              style={{ marginLeft: 20 }}
              onClick={this.toggleAllTollsView}
            >
              View all tolls
              {/* {showAllTolls ? "View vehicles" : "View all tolls"} */}
            </CustomButton>
          </div>
        </div>
        <div>
          {!showAllTolls && (
            <VehiclesTable vehicles={vehicles} searchQuery={searchQuery} />
          )}
          {showAllTolls && (
            <TollsTable tolls={tolls} searchQuery={searchQuery} />
          )}

          {showAddVehicleDialog && (
            <AddVehicle
              tolls={tolls}
              tollName={tollName}
              type={type}
              vehicleNumber={vehicleNumber}
              tariff={tariff}
              onChange={this.onChange}
              saveVehcleEntry={this.saveVehcleEntry}
              closeDialog={this.closeDialog}
            />
          )}

          {showAddToll && (
            <AddToll
              tollName={tollName}
              vehicleFareDetails={vehicleFareDetails}
              onChange={this.onChange}
              onVehicleFareChange={this.onVehicleFareChange}
              saveTollEntry={this.saveTollEntry}
              closeDialog={this.closeDialog}
            />
          )}
        </div>
        <div id="snackbar">{errorMessage}</div>
      </div>
    );
  }
}
