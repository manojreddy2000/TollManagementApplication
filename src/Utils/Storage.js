const VEHICLES = "vehicles";
const TOLLS = "tolls";

export function storeVehicleDate(data = []) {
  console.log(data);
  localStorage.setItem(VEHICLES, JSON.stringify(data));
}

export function getVehicleDate() {
  console.log(localStorage.getItem(VEHICLES));
  return JSON.parse(localStorage.getItem(VEHICLES) || "[]");
}

export function storeTolls(data = []) {
  localStorage.setItem(TOLLS, JSON.stringify(data));
}

export function getTolls() {
  return JSON.parse(localStorage.getItem(TOLLS) || "[]");
}
