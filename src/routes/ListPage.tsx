import Subpage from "@/components/Subpage";
import AppointmentsTable from "./list/AppointmentsTable";
import { useMemo, useState } from "react";
import SearchForm from "./list/SearchForm";
import { format } from "date-fns";
import { LoadingSpinner } from "@/components/Spinner";
import { useGetAppointmentsByDate } from "@/api/endpoints/getAppointments";

function ListPage() {
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const queryDate = useMemo(
    () =>
      appointmentDate ? format(appointmentDate!, "yyyy-MM-dd") : undefined,
    [appointmentDate],
  );
  const { isLoading, error, data } = useGetAppointmentsByDate(queryDate);

  return (
    <Subpage
      title="Dine aftaler"
      description="Se dine aftaler på specifikke datoer"
    >
      <SearchForm onSearch={(date) => setAppointmentDate(date)} />
      <div className="pt-4">
        {isLoading && <LoadingSpinner />}
        {error && <p>Der opstod en fejl ved hentning af aftaler</p>}
        {!isLoading && !error && !!data?.length && (
          <AppointmentsTable items={data} />
        )}
        {data && data.length === 0 && (
          <p className="text-gray-400">
            Ingen aftaler fundet på den valgte dato 😥
          </p>
        )}
        {!queryDate && (
          <p className="text-gray-400">Vælg en dato for at se dine aftaler</p>
        )}
      </div>
    </Subpage>
  );
}

export default ListPage;
