import Subpage from "@/components/Subpage";
import { AppointmentForm } from "@/components/AppointmentForm";
import { AppointmentCreateData } from "@/model/Appointment";
import { useAddAppointmentMutation } from "@/api/endpoints/postAppointment";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@radix-ui/react-icons";

function BookPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addMutation = useAddAppointmentMutation();
  function onSubmitAppointment(data: AppointmentCreateData) {
    addMutation.mutate(data);
    toast({
      description: (
        <div className="flex items-center gap-2">
          <CheckIcon className="h-8 w-8" />
          <span className="font-semibold">Din aftale blev oprettet!</span>
        </div>
      ),
    });
    navigate("/");
  }

  return (
    <Subpage
      title="Book ny aftale"
      description="Udfyld formularen nedenfor for at booke en ny mekanikertid"
    >
      <AppointmentForm onSubmit={onSubmitAppointment} submitTitle="Book tid" />
    </Subpage>
  );
}

export default BookPage;
