import CustomButton from "./CustomButton";
import { VEHICLE_TYPES } from "../Utils/Types";
import CustomInput from "./CustomInput";

function AddVehicle({
  tolls,
  tollName,
  type,
  vehicleNumber,
  tariff,
  onChange,
  saveVehcleEntry,
  closeDialog,
}) {
  return (
    <div id="id01" className="modal">
      <div className="model-sub-component">
        <span onClick={closeDialog} class="close">
          &times;
        </span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Add new entry</h3>
        </div>

        <div className="input-container">
          <label>Select toll number*</label>
          <select
            name="tollName"
            value={tollName}
            className="input"
            onChange={onChange}
          >
            {tolls.map((toll, index) => {
              return (
                <option
                  key="key"
                  value={toll.tollName}
                  style={{ textTransform: "capitalize" }}
                >
                  {toll.tollName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-container">
          <label>Select vehicle type*</label>
          <select
            className="input"
            name="type"
            value={type}
            onChange={onChange}
          >
            {VEHICLE_TYPES.map((vehicleType, index) => {
              return (
                <option
                  key="key"
                  value={vehicleType}
                  style={{ textTransform: "capitalize" }}
                >
                  {vehicleType}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input-container">
          <label>Vehicle number*</label>
          <CustomInput
            required={true}
            className="input"
            name="vehicleNumber"
            value={vehicleNumber}
            onChange={onChange}
          />
        </div>

        <div className="input-container">
          <label>Tariff*</label>
          <CustomInput
            required={true}
            className="input"
            name="tariff"
            value={tariff}
            onChange={onChange}
          />
        </div>

        <div className="input-container" style={{ marginTop: 35 }}>
          <CustomButton style={{ height: 35 }} onClick={saveVehcleEntry}>
            Add Entry
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default AddVehicle;
