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
    <div className="md:h-16 md:bg-zinc-900 md:px-2 md:rounded-xl md:items-center md:flex md:flex-row md:shadow-shape ">
      <div className="border mb-4 border-zinc-700 py-3 px-4 flex rounded-md bg-zinc-900 gap-2 md:items-center  md:border-none md:flex-1 md:mb-0">
        <button
          className="flex gap-2 md:flex md:gap-2"
          onClick={openGuestsModal}
        >
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-400 flex-1 text-left">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 flex-1 text-left">
              Quem estará na viagem?
            </span>
          )}
        </button>
      </div>

      <div className="bg-zinc-900 md:w-px md:h-6 md:bg-zinc-800" />

      <div className="md:flex md:flex-row md:ml-2">
        <Button size="full" onClick={openConfirmTripModal}>
          Confirmar Viagem
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
