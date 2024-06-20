import client from "@/api/client/axios";
import { Appointment, AppointmentFilterMethod } from "@/model/Appointment";
import { useQuery } from "@tanstack/react-query";

type Filters = Partial<
  Record<AppointmentFilterMethod | "date", string | undefined>
>;
const getAppointments = async (filters: Filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => params.set(key, value));
  const response = await client.get<Appointment[]>(
    `http://localhost:3000/appointments?${params.toString()}`,
  );

  return response.data;
};

export const useGetAppointmentsByDate = (queryDate?: string) =>
  useGetAppointmentsByFilter("date", queryDate);

export const useGetAppointmentsByFilter = (
  method?: AppointmentFilterMethod | "date",
  query?: string,
) => {
  const { isLoading, error, data } = useQuery<Appointment[]>({
    queryKey: ["appointments", `[${method}]=${query}`],
    queryFn: () => getAppointments({ [method!]: query }),
    enabled: !!method && !!query,
  });

  return {
    data,
    isLoading,
    error,
  };
};
