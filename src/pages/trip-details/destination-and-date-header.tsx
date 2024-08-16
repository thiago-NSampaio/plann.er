import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Calendar, Settings2, SquareMenu } from "lucide-react";
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
  const [collapsed, setCollapsed] = useState(true);

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
    <div className="md:px-4 md:h-16 md:rounded-xl md:bg-zinc-900 md:shadow-shape md:flex md:items-center md:justify-between">
      {collapsed && (
        <div className="flex items-center gap-2 md:hidden">
          <SquareMenu
            className="size-7 text-zinc-200 cursor-pointer"
            onClick={() => setCollapsed(false)}
          />
        </div>
      )}
      <SquareMenu
        className={`${
          collapsed ? "hidden md:flex" : "flex"
        } size-7 text-zinc-400 mb-2 cursor-pointer md:hidden`}
        onClick={() => setCollapsed(true)}
      />
      <div
        className={`${
          collapsed ? "hidden md:flex" : "flex"
        } grid space-y-2 md:flex-row md:items-center md:justify-between md:w-full md:space-y-0 md:flex md:border-none`}
      >
        <div className="flex items-center gap-2 flex-1 border border-zinc-900 hover:border-zinc-500 bg-zinc-800 rounded-lg p-2 md:p-0 md:bg-zinc-900 md:border-none">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{trip?.destination}</span>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:ml-auto">
          <div className="flex items-center gap-2 border border-zinc-900 hover:border-zinc-500 bg-zinc-800 rounded-lg p-2 md:p-0 md:bg-zinc-900 md:border-none">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{displayedDate}</span>
          </div>

          <div
            onClick={() => setUpdateTrip(true)}
            className="flex items-center gap-2 border border-zinc-900 hover:border-zinc-500 bg-zinc-800 rounded-lg p-2 cursor-pointer md:bg-zinc-900 hover:bg-zinc-700  md:border-none md:p-0 md:hidden"
          >
            <Settings2 className="size-5 text-zinc-400" />
            <span className="text-zinc-100">Alterar local/data</span>
          </div>
          <div className="md:w-px md:h-6 md:bg-zinc-800" />

          <div className="hidden md:flex md:items-center md:gap-5 md:ml-auto">
            <Button onClick={() => setUpdateTrip(true)} variant="secondary">
              Alterar local/data
              <Settings2 className="size-5 text-zinc-400" />
            </Button>
          </div>
        </div>
      </div>

      {updateTrip && (
        <UpdateTripModal closeUpdateTripModal={() => setUpdateTrip(false)} />
      )}
    </div>
  );
}
