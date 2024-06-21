import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parse } from "date-fns";
import { da as daLocale } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatAppointmentDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Appointment, AppointmentCreateData } from "@/model/Appointment";

const formSchema = z.object({
  customerName: z.string().min(1, {
    message: "Angiv kundens navn",
  }),
  address: z.string().min(1, {
    message: "Angiv kundens adresse",
  }),
  carBrand: z.string().min(1, {
    message: "Angiv bilens mærke",
  }),
  carModel: z.string().min(1, {
    message: "Angiv bilens model",
  }),
  licensePlate: z.string().regex(/[A-Z]{2}[0-9]{5}/, {
    message: "Angiv nummerplade i korrekt format",
  }),
  date: z.date({
    message: "Angiv dato for aftalen",
  }),
  taskDescription: z.string().min(1, {
    message: "Angiv en beskrivelse af opgaven",
  }),
});

interface AppointmentFormProps {
  onSubmit: (data: AppointmentCreateData) => void;
  submitTitle: string;
  initialData?: Partial<Appointment>;
}

export function AppointmentForm({
  onSubmit,
  submitTitle,
  initialData,
}: AppointmentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      address: "",
      carBrand: "",
      carModel: "",
      licensePlate: "",
      taskDescription: "",
      ...initialData,
      date: initialData?.date
        ? parse(initialData.date, "yyyy-MM-dd", new Date())
        : new Date(),
    },
  });

  function onFormSubmit({ date, ...data }: z.infer<typeof formSchema>) {
    onSubmit({
      date: formatAppointmentDate(date),
      ...data,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kundenavn</FormLabel>
              <FormControl>
                <Input placeholder="F.eks. Peter Petersen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input
                  placeholder="F.eks. Finlandsgade 22, 8200 Aarhus N"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bilmærke</FormLabel>
              <FormControl>
                <Input placeholder="F.eks. Ford" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bilmodel</FormLabel>
              <FormControl>
                <Input placeholder="F.eks. Kuga" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nummerplade</FormLabel>
              <FormControl>
                <Input placeholder="F.eks. AB12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Aftaledato</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: daLocale,
                        })
                      ) : (
                        <span>Vælg dato</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={daLocale}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taskDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opgavebeskrivelse</FormLabel>
              <FormControl>
                <Textarea placeholder="F.eks. ødelagt rude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submitTitle}</Button>
      </form>
    </Form>
  );
}
