import { Calendar, Tag } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Modal } from "../../components/modal";
import { InputField } from "../../components/inputField";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }
  return (
    <Modal
      closeModal={closeCreateActivityModal}
      titleModal="Cadastrar atividade"
      subtitleModal="Todos os convidados podem visualizar as atividades."
      widthModal={600}
    >
      <form onSubmit={createActivity} className="space-y-3">
        <InputField type="text" name="title" placeholder="Qual a atividade?">
          <Tag className="size-5 text-zinc-400" />
        </InputField>

        <InputField
          type="datetime-local"
          name="occurs_at"
          placeholder="Seu e-mail pessoal"
        >
          <Calendar className="size-5 text-zinc-400" />
        </InputField>

        <Button type="submit" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  );
}
