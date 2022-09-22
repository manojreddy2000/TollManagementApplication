function VehiclesTable({ vehicles, searchQuery }) {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr style={{ width: "100%", padding: "5px" }}>
          <th className="table-header">VEHICLE TYPE</th>
          <th className="table-header">VEHICLE NUMBER</th>
          <th className="table-header">DATE/TIME</th>
          <th className="table-header">TOLL NAME</th>
          <th className="table-header">TARIFF</th>
        </tr>
        {vehicles.map((vehicle) => {
          return (
            <tr style={{ width: "100%", padding: "5px" }}>
              <td className="table-data">{vehicle.type}</td>
              <td className="table-data">{vehicle.vehicleNumber}</td>
              <td className="table-data">{vehicle.dateAndTime}</td>
              <td className="table-data">{vehicle.tollName}</td>
              <td className="table-data">{vehicle.tariff}</td>
            </tr>
          );
        })}
      </table>
      {vehicles.length <= 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <label>
            {searchQuery ? "Vehicle not found" : "No data available"}
          </label>
        </div>
      )}
    </div>
  );
}

export default VehiclesTable;
