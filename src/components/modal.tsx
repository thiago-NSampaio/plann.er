import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  titleModal: string;
  closeModal: () => void;
  subtitleModal: string | ReactNode;
  children: ReactNode;
}

export function Modal({
  titleModal,
  closeModal,
  subtitleModal,
  children,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center overflow-auto">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 w-11/12 md:w-1/2 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{titleModal}</h2>
            <button type="button" onClick={closeModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          {typeof subtitleModal === "string" ? (
            <p className="text-sm text-zinc-400">{subtitleModal}</p>
          ) : (
            <div className="text-sm text-zinc-400">{subtitleModal}</div>
          )}
        </div>
        <div className="w-full h-px bg-zinc-800" />
        {children}
      </div>
    </div>
  );
}
