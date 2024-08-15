import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { InputField } from "../../components/inputField";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
}

interface GetTripDateAndDestination {
  destination: string;
  starts_at: string;
  ends_at: string;
}

export function UpdateTripModal({
  closeUpdateTripModal,
}: UpdateTripModalProps) {
  const [eventStartAndEndDatesUpdate, setEventStartAndEndDatesUpdate] =
    useState<DateRange | undefined>();
  const { tripId } = useParams();

  const [tripDateAndDestination, setTripDateAndDestination] =
    useState<GetTripDateAndDestination>();

  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

  function openDateRange(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDateRangeOpen((prev) => !prev); // Toggle open/close
  }

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => {
      const tripData = response.data.trip;
      setTripDateAndDestination(tripData);
      setEventStartAndEndDatesUpdate({
        from: new Date(tripData.start_date),
        to: new Date(tripData.end_date),
      });
    });
  }, [tripId]);

  async function updateTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const new_destination = data.get("new_destination")?.toString();

    if (
      new_destination &&
      eventStartAndEndDatesUpdate?.from &&
      eventStartAndEndDatesUpdate.to
    ) {
      await api.put(`/trips/${tripId}`, {
        destination: new_destination,
        start_date: eventStartAndEndDatesUpdate.from,
        end_date: eventStartAndEndDatesUpdate.to,
      });

      window.location.reload();
    } else {
      alert("Preencha os campos necessários para a alteração de local/data");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center overflow-auto">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 md:w-1/3 md:h-3/5 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button type="button" onClick={closeUpdateTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Altere o local e a data da sua viagem.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <form onSubmit={updateTrip} className="space-y-3">
          <InputField
            type="text"
            name="new_destination"
            placeholder="Novo local"
            defaultValue={tripDateAndDestination?.destination}
            required
          >
            <MapPin className="size-6 text-zinc-400" />
          </InputField>
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center text-white gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <button type="button" onClick={openDateRange}>
              {tripDateAndDestination &&
                (eventStartAndEndDatesUpdate?.from &&
                eventStartAndEndDatesUpdate?.to
                  ? `${eventStartAndEndDatesUpdate.from.toLocaleDateString()} a ${eventStartAndEndDatesUpdate.to.toLocaleDateString()}`
                  : "Escolha uma data")}
            </button>
          </div>
          <Button type="submit" size="full">
            Salvar alteração
          </Button>
        </form>
      </div>
      {tripDateAndDestination && isDateRangeOpen && (
        <div className="fixed shadow-shape bg-zinc-900 rounded-xl md:ml-[740px]">
          <div className="flex items-center justify-between flex-col">
            <button
              className="mr-2 py-1
                 ml-auto"
              type="button"
              onClick={openDateRange}
            >
              <X className="size-6 text-zinc-400" />
            </button>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDatesUpdate}
              onSelect={setEventStartAndEndDatesUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
