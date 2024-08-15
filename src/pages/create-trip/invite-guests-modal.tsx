import { ArrowRight, AtSign, PlusIcon, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  removeEmailFromInvites: (email: string) => void;
  addNewEmailToInvite: (e: FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <Modal
      closeModal={closeGuestsModal}
      titleModal="Selecionar convidados"
      subtitleModal="Os convidados irão receber emails para confirmar a participação na viagem."
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => (
          <div
            key={email}
            className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
          >
            <span className="text-zinc-300">{email}</span>
            <button type="button" onClick={() => removeEmailFromInvites(email)}>
              <X className="size-4 text-zinc-400" />
            </button>
          </div>
        ))}
      </div>

      <form
        onSubmit={addNewEmailToInvite}
        className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
      >
        <div className="px-2 mt-2 flex items-center gap-2 flex-1">
          <AtSign className="size-5 text-zinc-400" />
          <input
            type="email"
            name="email"
            placeholder="E-mail do convidado"
            className="bg-transparent text-md placeholder-zinc-400 flex-1 outline-none focus:outline-none md:text-lg"
          />
        </div>
        <Button type="submit" className="flex items-center gap-2">
          <PlusIcon className="md:hidden size-5" />
          <span className="hidden md:inline">Convidar</span>
          <ArrowRight className="hidden md:inline size-5" />
        </Button>
      </form>
    </Modal>
  );
}
