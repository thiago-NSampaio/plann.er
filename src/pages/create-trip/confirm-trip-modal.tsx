import { AtSign, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Modal } from "../../components/modal";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (e: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  destination: string;
  tripDate: DateRange;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  tripDate,
}: ConfirmTripModalProps) {
  const subtitle = (
    <p className="text-sm text-zinc-400">
      Para concluir a criação da viagem para{" "}
      <span className="font-semibold text-zinc-100">{destination}</span> nas
      datas de{" "}
      <span className="font-semibold text-zinc-100">
        {tripDate.from
          ? format(tripDate.from, "d' de 'LLL")
          : "Data de início não definida"}
        {tripDate.from && tripDate.to
          ? " a ".concat(format(tripDate.to, "d' de 'LLL"))
          : ""}
      </span>
      preencha seus dados abaixo:
    </p>
  );
  return (
    <Modal
      titleModal="Confirmar criação da viagem"
      widthModal={600}
      subtitleModal={subtitle}
      closeModal={closeConfirmTripModal}
    >
      <form onSubmit={createTrip} className="space-y-3">
        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="size-5 text-zinc-400" />
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome completo"
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none focus:outline-none"
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>

        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <AtSign className="size-5 text-zinc-400" />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail pessoal"
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none focus:outline-none"
            onChange={(e) => setOwnerEmail(e.target.value)}
          />
        </div>
        <Button type="submit" size="full">
          Confirmar criação de viagem
        </Button>
      </form>
    </Modal>
  );
}
