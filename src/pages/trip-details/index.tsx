import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";

export function TripDetailsPage() {
  const [isOpenCreateActivityModal, SetIsOpenCreateActivityModal] =
    useState(false);

  const [isOpenCreateLinkModal, SetIsOpenCreateLinkModal] = useState(false);

  function openCreateActivityModal() {
    SetIsOpenCreateActivityModal(true);
  }

  function closeCreateActivityModal() {
    SetIsOpenCreateActivityModal(false);
  }

  function openCreateLinkModal() {
    SetIsOpenCreateLinkModal(true);
  }

  function closeCreateLinkModal() {
    SetIsOpenCreateLinkModal(false);
  }

  function createActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function createLink(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModal}>
              Cadastrar atividade
              <Plus className="size-5" />
            </Button>
          </div>
          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isOpenCreateActivityModal && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
          createActivity={createActivity}
        />
      )}

      {isOpenCreateLinkModal && (
        <CreateLinkModal
          closeCreateLinkModal={closeCreateLinkModal}
          createLink={createLink}
        />
      )}
    </div>
  );
}
