import { X, User, AtSign, TrashIcon, UserPlus2 } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: number;
}

interface ManageGuestModalProps {
  closeManageGuestsModal: () => void;
  createGuest: (e: FormEvent<HTMLFormElement>) => void;
  guests: Participant[];
  deleteGuest: (id: string) => void;
}

export function ManageGuestModal({
  closeManageGuestsModal,
  createGuest,
  guests,
  deleteGuest,
}: ManageGuestModalProps) {
  const [isBoxAddGuestOpen, setIsBoxAddGuestOpen] = useState(false);

  function toggleBoxAddGuest() {
    setIsBoxAddGuestOpen((prevState) => !prevState);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center overflow-auto">
      <div className="w-5/6 md:w-2/5 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerencie seus convidados</h2>
            <button type="button" onClick={closeManageGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Caso deseje adicionar ou remover convidados, utilize os campos
            abaixo.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={createGuest} className="space-y-3">
          <Button onClick={toggleBoxAddGuest} type="button">
            <UserPlus2 /> Novo convidado
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
                  type="email"
                  name="guest_email"
                  placeholder="Email do convidado"
                  className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
                />
              </div>
              <Button type="submit" size="full">
                Adicionar
              </Button>
            </>
          )}
        </form>

        <div className="grid md:grid-cols-3 gap-4">
          {guests.map((guest) => (
            <div
              key={guest?.id}
              className="flex items-center gap-4 rounded-md px-4 m-1 border border-zinc-600 bg-zinc-800"
            >
              <div className="py-2 flex-1">
                <span className="block font-medium text-zinc-100">
                  {guest?.name ?? "Convidado"}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {guest?.email}
                </span>
              </div>
              <TrashIcon
                onClick={() => deleteGuest(guest.id)}
                className="text-red-400 size-5 shrink-0 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
