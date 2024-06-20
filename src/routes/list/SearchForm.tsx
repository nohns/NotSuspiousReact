import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { format, subDays } from "date-fns";
import { da as daLocale } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.object({
  appointmentDate: z.date({
    required_error: "Vælg aftale dato",
  }),
});

interface SearchFormProps {
  onSearch: (date: Date) => void;
}
function SearchForm({ onSearch }: SearchFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSearch(data.appointmentDate);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Aftaledato</FormLabel>
              <Popover>
                <div className="flex gap-2">
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
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
                  <Button
                    type="submit"
                    className="flex items-center"
                    disabled={!form.formState.isValid}
                  >
                    Søg
                    <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
                  </Button>
                </div>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={daLocale}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < subDays(new Date(), 1)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SearchForm;
