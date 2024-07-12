import { AtSign, User, X } from "lucide-react";
import { FormEvent } from "react";

interface ComfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (e: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
}: ComfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">Manaus, Brasil</span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              13 a 23 de agosto de 2024
            </span>{" "}
            preencha seus dados abaixo
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-5 bg-zinc-95- border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none focus:outline-none"
            />
          </div>

          <div className="h-14 px-5 bg-zinc-95- border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-300 text-lime-950 rounded-lg justify-center w-full px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Confirmar criação da viagem
          </button>
        </form>
      </div>
    </div>
  );
}
