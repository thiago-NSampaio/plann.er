import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ComfirmTripModalProps {
  closeCreateLinkModal: () => void;
  createLink: (e: FormEvent<HTMLFormElement>) => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
  createLink,
}: ComfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeCreateLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links importantes.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-95- border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title_link"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none focus:outline-none"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-95- border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="text"
              name="link"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none focus:outline-none"
            />
          </div>

          <Button type="submit" size="full">
            Salvar Link
          </Button>
        </form>
      </div>
    </div>
  );
}
