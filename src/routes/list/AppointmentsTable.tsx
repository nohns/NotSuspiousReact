import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Appointment, AppointmentCreateData } from "@/model/Appointment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppointmentForm } from "@/components/AppointmentForm";
import { useState } from "react";
import { format } from "date-fns";
import { da as daLocale } from "date-fns/locale";
interface AppointmentsTableProps {
  items: Appointment[];
  showEditButton?: boolean;
  onEditSubmit?: (
    appointment: Appointment,
    data: AppointmentCreateData,
  ) => void;
}

function EditDialog({
  data,
  onSubmit,
}: {
  data: Appointment;
  onSubmit: (data: AppointmentCreateData) => void;
}) {
  const [open, setOpen] = useState(false);
  function onFormSubmit(data: AppointmentCreateData) {
    setOpen(false);
    onSubmit(data);
  }
  return (
    <Dialog open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="secondary">
          Rediger
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Rediger aftale</DialogTitle>
          <DialogDescription>
            Foretag de nødvendige ændringer og kilk opdatér
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          onSubmit={onFormSubmit}
          initialData={data}
          submitTitle="Opdatér"
        />
      </DialogContent>
    </Dialog>
  );
}

export default function AppointmentsTable({
  items,
  showEditButton = false,
  onEditSubmit,
}: AppointmentsTableProps) {
  function onEditDialogSubmit(item: Appointment, data: AppointmentCreateData) {
    onEditSubmit?.(item, data);
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Kunde</TableHead>
          <TableHead>Bil</TableHead>
          <TableHead>Dato</TableHead>
          <TableHead>Opgave</TableHead>
          {showEditButton && (
            <TableHead className="w-8">
              <span className="sr-only">Handling</span>
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className="hover:bg-transparent">
            <TableCell className="font-medium">{item.customerName}</TableCell>
            <TableCell>
              {item.carBrand} {item.carModel} ({item.licensePlate})
            </TableCell>
            <TableCell>
              {format(item.date, "d. MMMM yyyy", { locale: daLocale })}
            </TableCell>
            <TableCell>{item.taskDescription}</TableCell>
            {showEditButton && (
              <TableCell>
                <EditDialog
                  data={item}
                  onSubmit={(data) => onEditDialogSubmit(item, data)}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
