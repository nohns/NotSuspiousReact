import { AppointmentCreateData } from "@/model/Appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../client/axios";

async function postAppointment(data: AppointmentCreateData) {
  await client.post(`/appointments`, data);
}

export const useAddAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAppointment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
