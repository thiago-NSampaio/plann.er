import { X, User, AtSign } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";

interface ManageGuestModalProps {
  closeManageGuestsModal: () => void;
  createGuest: (e: FormEvent<HTMLFormElement>) => void;
}

export function ManageGuestModal({
  closeManageGuestsModal,
  createGuest,
}: ManageGuestModalProps) {
  const [isBoxAddGuestOpen, setIsBoxAddGuestOpen] = useState(false);

  function toggleBoxAddGuest() {
    setIsBoxAddGuestOpen((prevState) => !prevState);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[360px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerencie seus convidados</h2>
            <button type="button" onClick={closeManageGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">Caso deseje</p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={createGuest} className="space-y-3">
          <Button type="button" onClick={toggleBoxAddGuest}>
            Adicionar convidado
          </Button>
          {isBoxAddGuestOpen && (
            <>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="guest_name"
                  placeholder="Nome do convidado"
                  className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
                />
              </div>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="guest_email"
                  placeholder="Email do convidado"
                  className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
                />
              </div>
              <Button type="submit" size="full">
                Salvar Convidado
              </Button>
            </>
          )}

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden" />
        </form>
      </div>
    </div>
  );
}
