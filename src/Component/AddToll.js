import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

export const VEHICLE_TYPE = [
  "Car/Jeep/Van",
  "LCV",
  "Truck/Bus",
  "Heavy vehicle",
];

function AddToll({
  tollName,
  onChange,
  saveTollEntry,
  vehicleFareDetails,
  onVehicleFareChange,
  closeDialog,
}) {
  return (
    <div id="id01" className="modal">
      <div className="model-sub-component">
        <span onClick={closeDialog} class="close">
          &times;
        </span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Add new toll</h3>
        </div>

        <div className="input-container">
          <label>Toll Name*</label>
          <input
            placeholder="Entr toll name"
            className="input"
            name="tollName"
            value={tollName}
            onChange={onChange}
          />
        </div>

        <div className="input-container">
          <label>vehicle fare details*</label>
          {VEHICLE_TYPE.map((value, index) => {
            let {
              vehicleType = "",
              singleJourney = "",
              returnJourney = "",
            } = vehicleFareDetails[index] || {};
            return (
              <div
                key={index}
                style={{
                  display: "inline-flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <select
                  style={{ width: "33%" }}
                  value={vehicleType}
                  name="vehicleType"
                  className="input"
                  onChange={(e) => {
                    onVehicleFareChange(e, index);
                  }}
                >
                  {VEHICLE_TYPE.map((toll, index) => {
                    return (
                      <option
                        key="key"
                        value={toll}
                        style={{ textTransform: "capitalize" }}
                      >
                        {toll}
                      </option>
                    );
                  })}
                </select>
                <CustomInput
                  placeholder="Single Journey"
                  value={singleJourney}
                  name="singleJourney"
                  style={{ marginLeft: 15, width: "33%" }}
                  onChange={(e) => {
                    onVehicleFareChange(e, index);
                  }}
                />
                <CustomInput
                  placeholder="Return Journey"
                  name="returnJourney"
                  value={returnJourney}
                  style={{ marginLeft: 15, width: "33%" }}
                  onChange={(e) => {
                    onVehicleFareChange(e, index);
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="input-container" style={{ marginTop: 35 }}>
          <CustomButton style={{ height: 35 }} onClick={saveTollEntry}>
            Add details
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default AddToll;
