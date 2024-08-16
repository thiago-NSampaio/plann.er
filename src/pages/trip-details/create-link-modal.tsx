import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent } from "react";
import { Modal } from "../../components/modal";
import { InputField } from "../../components/inputField";

interface ComfirmTripModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: ComfirmTripModalProps) {
  const { tripId } = useParams();

  async function createLink(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
    window.document.location.reload();
  }

  return (
    <Modal
      titleModal="Cadastrar link"
      subtitleModal="Todos os convidados podem visualizar os links importantes."
      closeModal={closeCreateLinkModal}
    >
      <form onSubmit={createLink} className="space-y-3">
        <InputField
          type="text"
          name="title"
          placeholder="Título do link"
          required
        >
          <Tag className="size-5 text-zinc-400" />
        </InputField>

        <InputField type="text" name="url" placeholder="URL" required>
          <Link2 className="size-5 text-zinc-400" />
        </InputField>

        <Button type="submit" size="full">
          Salvar Link
        </Button>
      </form>
    </Modal>
  );
}
