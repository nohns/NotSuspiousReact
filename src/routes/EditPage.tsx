import Subpage from "@/components/Subpage";
import EditSearchForm from "./edit/EditSearchForm";
import {
  Appointment,
  AppointmentCreateData,
  AppointmentFilterMethod,
} from "@/model/Appointment";
import AppointmentsTable from "./list/AppointmentsTable";
import { useState } from "react";
import { useGetAppointmentsByFilter } from "@/api/endpoints/getAppointments";
import { LoadingSpinner } from "@/components/Spinner";
import { useEditAppointmentMutation } from "@/api/endpoints/putAppointment";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon } from "@radix-ui/react-icons";

function EditPage() {
  const { toast } = useToast();

  // Query appointments corresponding to criteria
  const [method, setMethod] = useState<AppointmentFilterMethod>();
  const [query, setQuery] = useState<string | undefined>(undefined);
  function onFilterSubmit(method: AppointmentFilterMethod, query: string) {
    setMethod(method);
    setQuery(query);
  }
  const { isLoading, error, data } = useGetAppointmentsByFilter(method, query);

  // Update an appointment
  const editMutation = useEditAppointmentMutation();
  function onEditSubmit(appointment: Appointment, data: AppointmentCreateData) {
    editMutation.mutate({
      id: appointment.id,
      data,
    });
    toast({
      description: (
        <div className="flex items-center gap-2">
          <CheckIcon className="h-8 w-8" />
          <span className="font-semibold">Aftalen blev opdateret!</span>
        </div>
      ),
    });
  }

  return (
    <Subpage
      title="Rediger aftale"
      description="Find aftale udfra nummerplade og kundenavn"
    >
      <EditSearchForm onSubmit={onFilterSubmit} />

      <div className="pt-4">
        {isLoading && <LoadingSpinner />}
        {error && <p>Der opstod en fejl ved hentning af aftaler</p>}
        {!isLoading && !error && !!data?.length && (
          <AppointmentsTable
            items={data}
            showEditButton
            onEditSubmit={onEditSubmit}
          />
        )}
        {data && data.length === 0 && (
          <p className="text-gray-400">
            Ingen aftaler fundet med de valgte kriterier 😥
          </p>
        )}
      </div>
    </Subpage>
  );
}

export default EditPage;
