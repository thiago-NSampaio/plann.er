import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { UpdateTripModal } from "./update-trip-modal";

interface Trip {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  status: boolean | null;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [updateTrip, setUpdateTrip] = useState(false);

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => {
      setTrip(response.data.trip);
    });
  }, [tripId]);

  const displayedDate =
    trip && trip.start_date && trip.end_date
      ? `${format(new Date(trip.start_date), "d' de 'LLL")} até ${format(
          new Date(trip.end_date),
          "d' de 'LLL"
        )}`
      : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />

        <Button onClick={() => setUpdateTrip(true)} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>

      {updateTrip && (
        <UpdateTripModal closeUpdateTripModal={() => setUpdateTrip(false)} />
      )}
    </div>
  );
}
