import { CheckCircle2, CircleDashed, TrashIcon, UserCog } from "lucide-react";
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
    await api.delete(`/trips/${id}/participants`);
  }

  async function createGuest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const guest_name = data.get("guest_name")?.toString();
    const guest_email = data.get("guest_email")?.toString();
    try {
      await api.post(`trips/${tripId}/invites`, {
        name: guest_name,
        email: guest_email,
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  console.log(participants);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            <div className="flex justify-end gap-4">
              {participant.is_confirmed == 1 ? (
                <CheckCircle2 className="text-green-400 flex-1 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 flex-1 size-5 shrink-0" />
              )}

              {
                <TrashIcon
                  onClick={() => deleteGuest(participant.id)}
                  className="text-red-400 flex-1 size-5 shrink-0 cursor-pointer"
                />
              }
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
        />
      )}
    </div>
  );
}
