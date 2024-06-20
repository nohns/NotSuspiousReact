export interface Appointment {
  id: string;
  customerName: string;
  address: string;
  carBrand: string;
  carModel: string;
  licensePlate: string;
  date: string;
  taskDescription: string;
}

export type AppointmentCreateData = Omit<Appointment, "id">;
export type AppointmentFilterMethod = "customerName" | "licensePlate";

export function isAppointmentFilterMethod(
  method: string,
): method is AppointmentFilterMethod {
  return method === "customerName" || method === "licensePlate";
}
