import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="space-y-3 md:shadow-shape md:items-center md:rounded-xl md:px-2 md:flex md:h- md:bg-zinc-900 md:flex-row">
      <div className="border border-zinc-700 py-3 px-4 flex rounded-md bg-zinc-900 gap-2 md:border-none md:basis-1/3">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-md placeholder-zinc-400 outline-none md:flex-1 md:text-lg"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      {/* <div className="border border-zinc-700 py-3 px-4 flex rounded-md bg-zinc-900 gap-2 md:flex md:flex-row md:justify-center md:flex-1 md:border-none"> */}
      <button
        disabled={isGuestsInputOpen}
        className="border border-zinc-700 flex rounded-md py-3 px-4 w-full bg-zinc-900 gap-2 md:flex md:flex-row md:justify-center md:flex-1 md:border-none"
        onClick={openDatePicker}
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="text-md md:text-lg text-zinc-400 relative">
          {displayedDate || "Quando?"}
        </span>
      </button>
      {/* </div> */}

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    className="size-5 text-zinc-400"
                    onClick={closeDatePicker}
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              footer={
                eventStartAndEndDates?.from && eventStartAndEndDates?.to
                  ? `Selecionado: ${eventStartAndEndDates.from.toLocaleDateString()} a ${eventStartAndEndDates.to.toLocaleDateString()}`
                  : "Escolha uma data"
              }
            />
          </div>
        </div>
      )}

      <div className="bg-zinc-900 md:w-px md:h-6 md:bg-zinc-800" />

      {isGuestsInputOpen ? (
        <div className="md:flex md:flex-row md:ml-2">
          <Button onClick={closeGuestsInput} size="full" variant="secondary">
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        </div>
      ) : (
        <div className="md:flex md:flex-row md:ml-2 px">
          <Button onClick={openGuestsInput} size="full">
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
