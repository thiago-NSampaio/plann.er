import { X, MapPin } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => {
      const tripData = response.data.trip;
      setTripDateAndDestination(tripData);
      setEventStartAndEndDatesUpdate({
        from: new Date(tripData.starts_at),
        to: new Date(tripData.ends_at),
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
      alert("Preencha os campo necessários para a alteração de local/data");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[360px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button type="button">
              <X
                className="size-5 text-zinc-400"
                onClick={closeUpdateTripModal}
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Altere o local e a data da sua viagem.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={updateTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              name="new_destination"
              placeholder="Novo local"
              className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
              defaultValue={tripDateAndDestination?.destination}
            />
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            {tripDateAndDestination && (
              <DayPicker
                mode="range"
                selected={eventStartAndEndDatesUpdate}
                onSelect={setEventStartAndEndDatesUpdate}
                className="w-full h-full"
                footer={
                  eventStartAndEndDatesUpdate?.from &&
                  eventStartAndEndDatesUpdate?.to
                    ? `Selecionado: ${eventStartAndEndDatesUpdate.from.toLocaleDateString()} a ${eventStartAndEndDatesUpdate.to.toLocaleDateString()}`
                    : "Escolha uma data"
                }
              />
            )}
          </div>

          <Button type="submit" size="full">
            Salvar alteração
          </Button>
        </form>
      </div>
    </div>
  );
}
