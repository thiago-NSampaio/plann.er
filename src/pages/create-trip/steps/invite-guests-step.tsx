import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep({
  emailsToInvite,
  openConfirmTripModal,
  openGuestsModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape ">
      <button
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-400 flex-1 text-left">
            {emailsToInvite.length} pessoas(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={openConfirmTripModal}>
        Confirmar Viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
