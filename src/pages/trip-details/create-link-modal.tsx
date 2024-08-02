import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent } from "react";
import { Modal } from "../../components/modal";

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
      widthModal={540}
    >
      <form onSubmit={createLink} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="size-5 text-zinc-400" />
          <input
            type="text"
            name="title"
            placeholder="Título do link"
            className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
            required
          />
        </div>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Link2 className="size-5 text-zinc-400" />
          <input
            type="text"
            name="url"
            placeholder="URL"
            className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
            required
          />
        </div>

        <Button type="submit" size="full">
          Salvar Link
        </Button>
      </form>
    </Modal>
  );
}
