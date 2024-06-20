import { AppointmentCreateData } from "@/model/Appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../client/axios";

async function patchAppointment({
  id,
  data,
}: {
  id: string;
  data: AppointmentCreateData;
}) {
  await client.put(`/appointments/${id}`, {
    id: id,
    ...data,
  });
}

export const useEditAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAppointment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
