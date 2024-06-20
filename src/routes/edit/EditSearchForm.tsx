import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AppointmentFilterMethod,
  isAppointmentFilterMethod,
} from "@/model/Appointment";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";

interface EditSearchFormProps {
  onSubmit: (method: AppointmentFilterMethod, query: string) => void;
}

function EditSearchForm({ onSubmit }: EditSearchFormProps) {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState<string>("");
  const [error, setError] = useState<string>();

  // Handle form validation, before sending data up the tree
  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (method === "") {
      setError("Angiv søgemetode");
      return;
    }
    if (method !== "customerName" && method !== "licensePlate") {
      console.error("For some reason, method type is unrecognized.");
      return;
    }
    onSubmit(method, input);
  }

  function onMethodChange(val: string) {
    setError(undefined);
    setMethod(val);
  }

  let inputPlaceholder = "";
  if (method === "customerName") {
    inputPlaceholder = "F.eks. Peter Petersen";
  } else if (method === "licensePlate") {
    inputPlaceholder = "F.eks. AB12345";
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="flex gap-2">
        <Select defaultValue={method} onValueChange={onMethodChange}>
          <SelectTrigger className="max-w-52">
            <SelectValue placeholder="Vælg søgemetode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="customerName">Kundenavn</SelectItem>
              <SelectItem value="licensePlate">Nummerplade</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          className="max-w-52"
          value={input}
          placeholder={inputPlaceholder}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          className="flex items-center"
          disabled={!isAppointmentFilterMethod(method) || input === ""}
        >
          Søg
          <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
        </Button>
      </div>
      {error && (
        <div className="py-2 text-red-500 font-medium text-sm">{error}</div>
      )}
    </form>
  );
}

export default EditSearchForm;
