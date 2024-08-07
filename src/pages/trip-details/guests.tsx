import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { ManageGuestModal } from "./manage-guests-modal";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: number;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

  function openManageGuestsModal() {
    setIsManageGuestsModalOpen(true);
  }

  function closeManageGuestsModal() {
    setIsManageGuestsModalOpen(false);
  }

  async function deleteGuest(id: string) {
    await api.delete(`/trips/${tripId}/participants/${id}`);

    window.document.location.reload();
  }

  async function createGuest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const guestName = data.get("guest_name")?.toString();
    const guestEmail = data.get("guest_email")?.toString();

    const response = await api.post(`/trips/${tripId}/invites`, {
      name: guestName,
      email: guestEmail,
    });
    setParticipants([...participants, response.data.participant]);
    window.document.location.reload();
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants || []))
      .catch((error) => {
        console.error("Error fetching participants:", error);
        setParticipants([]);
      });
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant?.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant?.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant?.email}
              </span>
            </div>
            <div className="flex justify-end gap-4">
              {participant?.is_confirmed === 1 ? (
                <CheckCircle2 className="text-green-400 flex-1 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 flex-1 size-5 shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={openManageGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isManageGuestsModalOpen && (
        <ManageGuestModal
          closeManageGuestsModal={closeManageGuestsModal}
          createGuest={createGuest}
          guests={participants}
          deleteGuest={deleteGuest}
        />
      )}
    </div>
  );
}
