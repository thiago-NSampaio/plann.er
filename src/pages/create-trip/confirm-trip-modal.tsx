import { AtSign, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Modal } from "../../components/modal";
import { InputField } from "../../components/inputField";

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
    <div className="text-sm text-zinc-400">
      <p>
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
        </span>{" "}
        preencha seus dados abaixo:
      </p>
    </div>
  );

  return (
    <Modal
      titleModal="Confirmar criação da viagem"
      subtitleModal={subtitle}
      closeModal={closeConfirmTripModal}
    >
      <form onSubmit={createTrip} className="space-y-3">
        <InputField
          type="text"
          name="name"
          placeholder="Digite seu nome completo"
          onChange={(e) => setOwnerName(e.target.value)}
        >
          <User className="size-5 text-zinc-400" />
        </InputField>

        <InputField
          type="email"
          name="name"
          placeholder="Seu e-mail pessoal"
          onChange={(e) => setOwnerEmail(e.target.value)}
        >
          <AtSign className="size-5 text-zinc-400" />
        </InputField>

        <Button type="submit" size="full">
          Confirmar criação de viagem
        </Button>
      </form>
    </Modal>
  );
}
