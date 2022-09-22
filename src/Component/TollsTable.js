import { VEHICLE_TYPE } from "./AddToll";

function TollTable({ tolls, searchQuery }) {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr style={{ width: "100%", padding: "5px" }}>
          <th className="table-header">TOLL NAME</th>
          <th className="table-header">Car/Jeep/Van</th>
          <th className="table-header">LCV</th>
          <th className="table-header">Truck/Bus</th>
          <th className="table-header">Heavy vehicle</th>
        </tr>
        {tolls.map((toll) => {
          let carJeepInfo = toll.vehicleFareDetails.find(
            (data) => data.vehicleType === VEHICLE_TYPE[0]
          );

          let lcv = toll.vehicleFareDetails.find(
            (data) => data.vehicleType === VEHICLE_TYPE[1]
          );

          let trucBus = toll.vehicleFareDetails.find(
            (data) => data.vehicleType === VEHICLE_TYPE[2]
          );

          let heavyVehicle = toll.vehicleFareDetails.find(
            (data) => data.vehicleType === VEHICLE_TYPE[3]
          );

          return (
            <tr style={{ width: "100%", padding: "5px" }}>
              <td className="table-data">{toll.tollName}</td>
              <td className="table-data">{`${
                carJeepInfo?.singleJourney || "-"
              }/${carJeepInfo?.returnJourney || "-"}`}</td>
              <td className="table-data">{`${lcv?.singleJourney || "-"}/${
                lcv?.returnJourney || "-"
              }`}</td>
              <td className="table-data">{`${trucBus?.singleJourney || "-"}/${
                trucBus?.returnJourney || "-"
              }`}</td>
              <td className="table-data">{`${
                heavyVehicle?.singleJourney || "-"
              }/${heavyVehicle?.returnJourney || "-"}`}</td>
            </tr>
          );
        })}
      </table>
      {tolls.length <= 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <label>{searchQuery ? "Toll not found" : "No data available"}</label>
        </div>
      )}
    </div>
  );
}

export default TollTable;
